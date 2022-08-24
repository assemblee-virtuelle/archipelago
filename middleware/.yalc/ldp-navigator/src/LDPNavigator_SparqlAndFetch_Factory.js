'use strict';
import LDPNavigator from './LDPNavigator' ;
import FetchAdapter from './adapter/FetchAdapter';
import SparqlAdapter from './adapter/SparqlAdapter';

class LDPNavigator_SparqlAndFetch_Factory {
  constructor(config) {
    this.ldpNavigator=new LDPNavigator(config);
    this.config=config;

  }

  make(adapterClasses){
    const config =this.config;
    let adapters=[
      new SparqlAdapter(config?config.sparql:undefined),
      new FetchAdapter(config?config.fetch:undefined)
    ];
    this.ldpNavigator.setAdapters(adapters)
    return this.ldpNavigator;
  }
}

export default LDPNavigator_SparqlAndFetch_Factory;
