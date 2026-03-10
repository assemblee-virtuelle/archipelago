const CONFIG = require('../config/config');

module.exports = {
    name: 'embeddedcalendar',
    dependencies: ['api'],

    async started() {
        await this.broker.call('api.addRoute', {
            route: {
                path: '/api/embeddedcalendar',
                name: 'embeddedcalendar-endpoint',
                bodyParsers: { json: true },
                aliases: {
                    'GET /events': 'embeddedcalendar.getEvents'
                }
            }
        });
    },

    actions: {
        async getEvents(ctx) {
            const orgSlug = ctx.params.organization;
            const themeSlug = ctx.params.theme;

            if (!orgSlug) {
                ctx.meta.$statusCode = 400;
                return { error: 'Missing required query param: organization' };
            }

            const baseUrl = CONFIG.HOME_URL.replace(/\/$/, '');
            const orgUri = `${baseUrl}/organizations/${orgSlug}`;
            const themeUri = themeSlug ? `${baseUrl}/themes/${themeSlug}` : null;

            let org;
            try {
                org = await ctx.call('ldp.resource.get', {
                    resourceUri: orgUri,
                    accept: 'application/ld+json'
                });
            } catch (e) {
                ctx.meta.$statusCode = e.code === 404 ? 404 : 500;
                return {
                    error: e.code === 404 ? 'Organization not found' : 'Failed to load organization',
                    organization: orgSlug,
                    organizationUri: orgUri
                };
            }

            const involvedRaw = org['pair:involvedIn'] || [];
            const involvedArr = Array.isArray(involvedRaw) ? involvedRaw : [involvedRaw];

            const involvedUris = involvedArr
                .map(v => (typeof v === 'string' ? v : v?.['@id']))
                .filter(Boolean);

            const eventUris = involvedUris.filter(uri => uri.startsWith(`${baseUrl}/events/`));

            const settled = await Promise.allSettled(
                eventUris.map(resourceUri =>
                    ctx.call('ldp.resource.get', { resourceUri, accept: 'application/ld+json' })
                )
            );

            const allEvents = settled
                .filter(r => r.status === 'fulfilled')
                .map(r => r.value);

            const events = themeUri
                ? allEvents.filter(event => {
                    const topicsRaw = event['pair:hasTopic'] || [];
                    const topicsArr = Array.isArray(topicsRaw) ? topicsRaw : [topicsRaw];

                    const topicUris = topicsArr
                        .map(v => (typeof v === 'string' ? v : v?.id || v?.['@id']))
                        .filter(Boolean);

                    return topicUris.includes(themeUri);
                })
                : allEvents;

            return {
                organization: orgSlug,
                organizationUri: org.id || org['@id'] || orgUri,
                theme: themeSlug,
                themeUri,
                eventUris,
                events
            };
        }
    }
};
