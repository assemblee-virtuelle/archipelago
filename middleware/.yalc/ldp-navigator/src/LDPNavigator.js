'use strict';

// const jsonld = require('jsonld');
// const sift = require('sift').default;
// const fetch = require('node-fetch');

import jsonld from 'jsonld';
import sift from 'sift';
import fetch from 'node-fetch';

class LDPNavigator {
  constructor(config) {
    this.config = config || {}
    this.context= this.config.context||{};
    this.adapters= this.config.adapters||[];
  }

  setAdapters(adapters) {
    this.adapters = adapters;
  }

  async init(contextData) {
    let resolvedContextData;
    if (contextData.includes && contextData.includes('http')){
      resolvedContextData = await this.resolveById(contextData);
    }else{
      resolvedContextData = contextData;
      this.context = {...this.context,...resolvedContextData['@context']}
      this.flatten = await jsonld.flatten(resolvedContextData, this.context);
      this.graph = this.flatten['@graph'];
      this.expand = await jsonld.expand(this.flatten);
    }
  }



  //
  async filterInMemory(filter) {

    // console.log('filterInMemory',this.graph);
    const result = this.graph.filter(sift(filter));
    return result;
  }
  //
  async findInMemory(filter) {
    // console.log('ALLLOOO');
    const filtered = await this.filterInMemory(filter);
    // console.log('filtered',filtered.length,filtered);
    if (filtered.length == 1) {
      return filtered[0];
    } else if (filtered.length > 1) {
      throw new Error(`to many results applying filter`)
    } else {
      throw new Error(`no results applying filter`)
    }
  }

  async addToMemory(resource){
    this.context = {...this.context, ...resource['@context']};
    const {
      '@context': context,
      ...noContext
    } = resource
    if (this.flatten){
      this.flatten['@graph'].push(noContext);
      this.flatten['@context']=this.context;
    }else{
      this.flatten = await jsonld.flatten(resource, this.context);
    }

    this.graph = this.flatten['@graph'];
    this.expand = await jsonld.expand(this.flatten);
  }

  async resolveById(id, options,depth) {
    // console.log('resolveById',id);
    depth=depth||0;
    let result = undefined
    if (result == undefined) {
      // let resultInMemory = await this.findInMemory({'@id':id})
      const unprefixedId= this.unPrefix(id);
      if(this.expand){
        let resultInMemory = this.expand.find(f => f["@id"] == id);
        // console.log('resultInMemory',resultInMemory);
        // console.log(this.graph);
        if (resultInMemory) {
          const compactInMemory= await jsonld.compact(resultInMemory,this.context);
          // console.log('compactInMemory',compactInMemory);
          if (options && options.expand==true){
            result = resultInMemory;
          }else if (options && options.noContext==true){
            const {
              '@context': context,
              ...noContext
            } = compactInMemory;
            result=noContext;
          } else {
            result=compactInMemory
          }
        }
        // console.log('resolveById result',result);
      }
    }
    // console.log(result == undefined);
    if (result == undefined) {
      // console.log('id not found ',id);
      for (let i = 0; i < this.adapters.length; i++) {
        const adapter= this.adapters[i];
        // console.log('adapter',adapter);
        // console.log('navigator depth',depth);
        let resultAdapter = await adapter.resolveById(id,undefined,depth);
        // console.log('resultAdapter',resultAdapter);
        if (resultAdapter && (resultAdapter['@id'] || resultAdapter['@graph'])) {

          // console.log('BEFORE COMPACT',resultAdapter,this.context);

          resultAdapter = await jsonld.compact(resultAdapter, this.context);
          // console.log('AFTER COMPACT',resultAdapter);
          // console.log('resultAdapter',resultAdapter);

          // if (resultAdapter['@graph']){
          //   resultAdapter=resultAdapter['@graph'].filter(r=>r['@id']==)
          // }

          for (let j = i-1; j >= 0; j--) {
            const persistAdapter = this.adapters[j];
            // console.log('persistAdapter',persistAdapter);
            if (persistAdapter.persist){
              const adapterPersistResult =  await persistAdapter.persist(resultAdapter);
              resultAdapter = await jsonld.compact(adapterPersistResult, this.context);
            }
          }



          if(resultAdapter['@graph']){
            for (let subject of resultAdapter['@graph']){
              await this.addToMemory({
                '@context':resultAdapter['@context'],
                ...subject
              })
            }
          }else{
            await this.addToMemory(resultAdapter)
          }

          result=this.resolveById(id, options)
          break;
        }
      }

    }
    return result;
  }

  async persist() {
    // console.log('expand',this.expand);
    for (var adapter of this.adapters) {
      if (adapter.persist){
        // console.log('persist',this.expand);
        // console.log('LDP Navigator BEFORE persist');
        await adapter.persist(this.expand);
        // console.log('LDP Navigator AFTER persist');
      }
    }
  }


  unPrefix(property) {
    let out;
    let url;
    // console.log('this.context',this.context);
    for (const [key, value] of Object.entries(this.context)) {
      // console.log('unPrefix',key, value);
      const regex = new RegExp(`${key}:(.*)`, 'gm');
      // const regex = /`${key}:(.*)`/gm;
      const result = regex.exec(property);
      // console.log('regex',property,result);
      if (result != null) {
        // out = result[1];
        // url = value;
        out = value + result[1]
        break;
      }
    }

    return out;
  }

  async get(mainData, property, noContext,depth) {
    depth=depth||0;
    // console.log('GET',mainData,property);
    const unPrefixedProperty = this.unPrefix(property);
    // console.log('mainData',mainData);
    // console.log('expand',JSON.stringify(this.expand));
    const mainDataInNavigator = await this.expand.find(e => e['@id'] == (mainData['@id'] || mainData['id']));
    console.log('mainDataInNavigator',mainDataInNavigator);
    console.log('unPrefixedProperty',property,unPrefixedProperty);
    const rawProperty = mainDataInNavigator[unPrefixedProperty];
    // let rawProperty = mainDataInNavigator[property];
    // console.log(mainDataInNavigator,property,unPrefixedProperty,rawProperty);
    // console.log('rawProperty',rawProperty);
    if (rawProperty) {
      if (!Array.isArray(rawProperty)) {
        rawProperty = [rawProperty];
      }

      let out = [];
      for (var prop of rawProperty) {
        if (prop['@id']) {
          // const dereference = this.graph.find(f=>f["@id"]==prop['@id']);
          const dereference = await this.resolveById(prop['@id'], {noContext:true},depth);
          out.push(dereference);
        } else if (prop['@value']) {
          // return prop['@value'];
          out.push(prop['@value'])
        }
      }

      if (!(Array.isArray(mainData[property])) && out.length == 1 && !(this.config.forceArray && this.config.forceArray.includes(property))) {
        out = out[0];
      }
      return out
    } else {
      if(this.config.forceArray && this.config.forceArray.includes(property)){
          return [];
      } else{
          return undefined;
      }

    }
  }

  async dereference(mainData, propertiesSchema, depth) {
    console.log('dereference 2',mainData,propertiesSchema);
    depth=depth||1;

    // console.log('LDP DEREFERENCE');
    if (Array.isArray(mainData)) {
      let result = [];
      for (var mainDataIteration of mainData) {
        result.push(await this.dereference(mainDataIteration, propertiesSchema,depth))
      }
      return result;
    } else if(mainData && (mainData['@id'] || mainData['id'])) {
      // console.log('dereference CALL',mainData,propertiesSchema);
      let resultData = {
        ...mainData
      };

      let propertiesSchemaArray = [];
      if (!Array.isArray(propertiesSchema)) {
        propertiesSchemaArray = [propertiesSchema];
      } else {
        propertiesSchemaArray = [...propertiesSchema]
      }

      for (var propertySchema of propertiesSchemaArray) {
        console.log(' '.repeat(depth),'dereference', propertySchema.p, 'of',(mainData['@id'] || mainData['id']));
        const property = propertySchema.p;
        const reference = await this.get(mainData, property, true,depth);
        // console.log('reference',reference);

        if (propertySchema.n && reference != undefined) {
          // console.log('dereference NEXT',reference);
          const dereference = await this.dereference(reference, propertySchema.n,depth+1);
          // console.log('dereference NEXT END');
          resultData[property] = dereference;
        } else {
          // console.log('dereference LAST',reference);
          resultData[property] = reference;
        }
      }
      return resultData;
    } else {
      return mainData;
    }
  }
}


// module.exports = {
//     default:LDPNavigator,
//     LDPNavigator
// };

export default LDPNavigator
