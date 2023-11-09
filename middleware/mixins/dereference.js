// organizations.mixin.js
const { LDPNavigator, FetchAdapter } = require('fix-esm').require('ldp-navigator');
const jsonld = require('jsonld');
const { defaultContext } = require('@semapps/core');


module.exports = {
    methods: {
        async handleAfterGet(ctx, res) {  
            const ldpNavigator = new LDPNavigator(); // To resolve without using data in memory, it's necessary to create a new instance of LDPNavigator. Dereferencing the relation won't fetch the URL unless LDPNavigator is a new instance.

            const dereferencePlan = this.settings.dereferencePlan || [];
            const headers = {
                'accept': 'application/ld+json',
            };
          
            // Check authorization for get request
            if (ctx.meta.headers && ctx.meta.headers.authorization) {
            headers.authorization = ctx.meta.headers.authorization;
            }
          
            ldpNavigator.setAdapters([
                new FetchAdapter({
                    headers: headers
                })
            ]);

            const oldContext = JSON.parse(JSON.stringify(res['@context']));
            // The context needs to be replaced because the jsonld library does not support URLs with localhost
            res['@context'] = defaultContext['@context'];
            await ldpNavigator.init(res);
            res = await ldpNavigator.dereference(res, dereferencePlan);
            // Framing is necessary because ldp-navigator returns '@id' instead of 'id' in dereferenced data
            res = await jsonld.frame(res, { '@context': res['@context'], 'id': ctx.params.resourceUri });
            res['@context'] = oldContext;

            return res;
        }
    },
    hooks: {
        after: {
            "get": 'handleAfterGet'
        }
    }
};
