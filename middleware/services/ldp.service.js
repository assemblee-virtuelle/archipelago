const { LdpService, DocumentTaggerMixin } = require('@semapps/ldp');
const urlJoin = require('url-join');
const ontologies = require('../config/ontologies.json');
const CONFIG = require('../config/config');
const containers = require('../config/containers');
const {LDPNavigator,FetchAdapter} = require('fix-esm').require('ldp-navigator');
const context = require('../config/context.json');

module.exports = {
  mixins: [LdpService, DocumentTaggerMixin],
  settings: {
    baseUrl: CONFIG.HOME_URL,
    ontologies,
    containers,
    preferredViewForResource: async (resourceUri, containerPreferredView) => {
      if (!containerPreferredView) return resourceUri;
      return urlJoin(CONFIG.FRONT_URL, containerPreferredView, encodeURIComponent(resourceUri), 'show')
    },
    defaultContainerOptions: {
      jsonContext: urlJoin(CONFIG.HOME_URL, 'context.json')
    }
  },
  hooksResource: {
        after: {
            "get":async (ctx, res)=>{
              for ( let container of containers){
                if (ctx.params.resourceUri.includes(container.path) && container.ldpDereferencePlan){
                  console.log('container.ldpDereferencePlan',container.ldpDereferencePlan);
                  let ldpNavigator=new LDPNavigator();
                  ldpNavigator.setAdapters([
                    new FetchAdapter({
                      headers:{
                        'accept': 'application/ld+json'
                      }
                    })
                  ])
                  const oldContext= JSON.parse(JSON.stringify(res['@context']));
                  //context have to be replce because jsonld librairy don't support url with localhost
                  res['@context']=context['@context'];
                  await ldpNavigator.init(res);
                  res= await ldpNavigator.dereference(res,container.ldpDereferencePlan);
                  res['@context']=oldContext;
                }
              }
              return res;
            }

        }
      }
};
