const CONFIG = require('../config/config');
const { ControlledContainerMixin, DisassemblyMixin } = require('@semapps/ldp');
const {LDPNavigator,FetchAdapter} = require('fix-esm').require('ldp-navigator');
const { defaultContext } = require('@semapps/core');
const jsonld = require('jsonld');

module.exports = {
  name: 'users',
  mixins: [ControlledContainerMixin, DisassemblyMixin],
  settings: {
        path: '/organizations',
        acceptedTypes: ['pair:Organization'],
        preferredView: '/Organization',
        dereference: ['sec:publicKey', 'pair:hasLocation/pair:hasPostalAddress'],
        disassembly: [{ path: 'pair:organizationOfMembership', container: CONFIG.HOME_URL + 'membership-associations' }]
    },
  actions: {},
  hooks: {
    after: {
        "get": async (ctx, res) => {
            console.log(ctx.params)
            let ldpNavigator=new LDPNavigator();
            let headers = {
              'accept': 'application/ld+json',
            }
            if (ctx.meta.headers && ctx.meta.headers.authorization){
              headers.authorization = ctx.meta.headers.authorization
            }
            ldpNavigator.setAdapters([
              new FetchAdapter({
                headers : headers
              })
            ])
            const oldContext= JSON.parse(JSON.stringify(res['@context']));
            //context have to be replce because jsonld librairy don't support url with localhost
            res['@context']=defaultContext['@context'];
            await ldpNavigator.init(res);
            res= await ldpNavigator.dereference(res,container.ldpDereferencePlan);
            //frame have to be because ldp-navigator return '@id' instead 'id' in dereferenced data
            res = await jsonld.frame(res,{'@context':res['@context'],'id':ctx.params.resourceUri});
            res['@context']=oldContext;

          return res;
        }

    }
  }

}