'use strict';

// const jsonld = require('jsonld');
// const fetch = require('node-fetch');
// const urljoin = require('url-join');
// const JsonLdParser = require('jsonld-streaming-parser').JsonLdParser;
// const streamifyString = require('streamify-string');



import jsonld from 'jsonld';
import fetch from 'node-fetch';
import jsonldStreamingParser from 'jsonld-streaming-parser';
import {JsonLdParser} from "jsonld-streaming-parser";
// console.log(jsonldStreamingParser);
// const JsonLdParser = jsonldStreamingParser.JsonLdParser;
import streamifyString from 'streamify-string';

class SparqlAdapter {
  constructor(config) {
    this.config = config;
  }

  async resolveById(id,forceResolveById,depth) {
    // console.log('resolveById',id);
    // console.log('sparql depth',depth);
    if (forceResolveById==true || this.config.skipResolveById != true) {
      // console.log(' '.repeat(depth),'SPARQL resolveById', id);
      const query =  `
      ${this.config.query.prefix?this.config.query.prefix:''}
      CONSTRUCT  {
        ?s1 ?p1 ?o1 .
      }
      WHERE {
        {
          BIND(<${id}> AS ?s1) .
                    ?s1 ?p1 ?o1 .
        }
        UNION
        {
          GRAPH ?g {
            BIND(<${id}> AS ?s1) .
            ?s1 ?p1 ?o1 .
          }
        }
      }
      `
      // console.log(query);
      const response = await fetch(this.config.query.endpoint, {
        method: 'POST',
        body: query,
        headers: this.config.query.headers
      });

      const raw = await response.text();
      // console.log('raw',raw);
      let parsed= JSON.parse(raw);
      // console.log('parsed',parsed);
      return parsed;

      // const result = await response.json();
      // await this.persist(result);
      // console.log('SpasrqlAdapter resolveById',result);
      return result;
    } else {
      return undefined
    }

  }

  jsonToQuads(input) {
    return new Promise((resolve, reject) => {
      try {
        const myParser = new JsonLdParser();
        const jsonString = typeof input === 'object' ? JSON.stringify(input) : input;
        const textStream = streamifyString(jsonString);
        let res = [];
        // console.log(myParser);
        myParser
          .import(textStream)
          .on('data', quad => res.push(quad))
          .on('error', error => reject(error))
          .on('end', () => resolve(res));
      } catch (e) {
        reject(e)
      }

    });
  }



  nodeToString(node) {
    switch (node.termType) {
      case 'Variable':
        return `?${node.value}`;
      case 'NamedNode':
        return `<${node.value}>`;
      case 'Literal':
        if (node.datatype.value === 'http://www.w3.org/2001/XMLSchema#string') {
          // Use triple quotes SPARQL notation to allow new lines and double quotes
          // See https://www.w3.org/TR/sparql11-query/#QSynLiterals
          return `'''${node.value}'''`;
        } else {
          return `"${node.value}"^^<${node.datatype.value}>`;
        }
      default:
        throw new Error('Unknown node type: ' + node.termType);
    }
  }

  triplesToString(triples) {
    return triples
      .map(
        triple => {
          //TODO considering blanck nodes
          if (triple.object.termType != 'BlankNode' && triple.subject.termType != 'BlankNode') {
            return `${this.nodeToString(triple.subject)} <${triple.predicate.value}> ${this.nodeToString(triple.object)} .`
          } else {
            return ''
          }

        }

      )
      .join('\n');
  }

  getTriplesDifference(triples1, triples2) {
    return triples1.filter(t1 => !triples2.some(t2 => t1.equals(t2)));
  }

  getTripleswhitSamePredicate(triples1, triples2) {
    const result = triples1.filter(t1 => triples2.some(t2 => t1.predicate.equals(t2.predicate)));
    // console.log('result',result);
    return result
  }

  async persist(resource) {
    // console.log('persist resource',resource['@id']?resource['@id']:Array.isArray(resource)?'Array':'?');
    // console.trace("log ressource",resource)
    if (this.config.skipPersist != true) {
      if (Array.isArray(resource)) {
        // console.log('ARRAY',resource);
        let result=[];
        for (var r of resource) {
          // console.log('persist Array',r['@id']);
          const persistResult=await this.persist(r);
          if(persistResult){
              result.push(persistResult);
          }

        }
        return result
      } else if (resource['@graph']) {
        // console.log('GRAPH',resource);
        let result=[]
        for (var r of resource['@graph']) {
          if(resource['@context']){
            r['@context']=resource['@context'];
          }
          const persistResult = await this.persist({...r})
          if(persistResult){
            const {
              '@context': context,
              ...noContext
            } = persistResult;
            result.push(noContext);
          }
        }
        return {
          '@context':resource['@context'],
          '@graph':result
        }

      } else if (resource['@id'] && !resource['@id'].includes('_:')) {
        // console.log('persist update raw',resource);
        let oldData = await this.resolveById(resource['@id'],true);
        // console.log('oldData',oldData);

        if (oldData && oldData['@id']) {
          // console.log('SPARQL UPDATE',resource['@id']);
          let oldTriples = await this.jsonToQuads(oldData);
          let newTriples = await this.jsonToQuads(resource);

          // const triplesToAdd = this.getTriplesDifference(newTriples, oldTriples).reverse();
          const triplesToAdd = newTriples;
          const triplesToRemove = this.getTripleswhitSamePredicate(oldTriples, newTriples);

          let query = '';
          if (triplesToRemove.length > 0) query += `DELETE { ${this.triplesToString(triplesToRemove)} } `;
          if (triplesToAdd.length > 0) query += `INSERT { ${this.triplesToString(triplesToAdd)} } `;
          query += `WHERE { `;
          // if (existingBlankNodes.length > 0) query += this.triplesToString(existingBlankNodes);
          // if (newBlankNodes.length > 0) query += this.bindNewBlankNodes(newBlankNodes);
          query += ` }`;


          // console.log('query',query);

          const response = await fetch(this.config.update.endpoint, {
            body: query,
            method: 'POST',
            headers: this.config.update.headers
          });
          resource = this.resolveById(resource['@id'],true)
        } else {
          // console.log('SPARQL CREATE', resource['@id']);
          const rdf = await jsonld.toRDF(resource, {
            format: 'application/n-quads'
          });

          const response = await fetch(this.config.update.endpoint, {
            body: `INSERT DATA { ${rdf} }`,
            method: 'POST',
            headers: this.config.update.headers
          });
          // console.log('resolveById post insert');
          resource = this.resolveById(resource['@id'],true)
          // console.log('resolveById2 post insert');
        }
      }
      return resource
    } else {
      return undefined;
    }

  }
}

export default SparqlAdapter;
