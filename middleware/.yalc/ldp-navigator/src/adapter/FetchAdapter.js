'use strict';
import jsonld from 'jsonld';
var isUri = require('isuri');

class FetchAdapter {
  constructor(config) {
    this.config=config;
  }

  async resolveById(id,depth){

    try {
      if(isUri.isValid(id)){
        const response = await fetch(id,{headers:this.config?this.config.headers:{}});
        // console.log(response.headers.get('content-type'));
        console.log(' '.repeat(depth),'FETCH resolveById', id);
        let raw='';
        if (response.status==200 && response.headers.get('content-type').includes('json')){
          raw = await response.text();
          const result = JSON.parse(raw);
          const framed = await jsonld.frame(result,{"@id":id});
          // console.log('fetch result',result);
          // console.log('framed',framed);


          return framed;
        }else{
          console.error(`fetch ${id} return ${response.status} status and content-type ${response.headers.get('content-type')}`);
          console.log(`status have to be 200 et content-type 'application/json' or 'application/ld+json'`);
          console.log(raw);
          return undefined;
        }
      } else {
        console.error(`${id} is not a valid uri`);
        return undefined;
      }
    } catch (e) {
      console.error(e);
      return undefined;
    }



  }
}

export default FetchAdapter;
