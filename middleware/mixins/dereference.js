// organizations.mixin.js
const { LDPNavigator, FetchAdapter } = require('fix-esm').require('ldp-navigator');
const jsonld = require('jsonld');
const { defaultContext } = require('@semapps/core');

let ldpNavigator;

module.exports = {
    created() {
        ldpNavigator = new LDPNavigator();
      },
    methods: {
        async handleAfterGet(ctx, res) {    
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
            res = await ldpNavigator.dereference(res, [{ p: 'pair:organizationOfMembership' }]);
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
