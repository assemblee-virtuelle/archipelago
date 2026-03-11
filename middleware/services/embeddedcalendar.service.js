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
        async getEvents(context) {
            const orgSlug = context.params.organization;
            const themeSlug = context.params.theme;

            const baseUrl = CONFIG.HOME_URL.replace(/\/$/, '');


            const orgUri = orgSlug ? `${baseUrl}/organizations/${orgSlug}` : null;
            const themeUri = themeSlug ? `${baseUrl}/themes/${themeSlug}` : null;
            const eventsContainerUri = `${baseUrl}/events`;

            let organization = null;

            if (orgUri) {
                organization = await context.call('ldp.resource.get', {
                    resourceUri: orgUri,
                    accept: 'application/ld+json'
                });
            }

            const eventsContainer = await context.call('ldp.resource.get', {
                resourceUri: eventsContainerUri,
                accept: 'application/ld+json'
            });

            const containedRaw = eventsContainer['ldp:contains'] || [];
            const containedArray = Array.isArray(containedRaw) ? containedRaw : [containedRaw];

            const eventUris = containedArray
                .map(value => (typeof value === 'string' ? value : value?.id || value?.['@id']))
                .filter(Boolean);

            const settled = await Promise.allSettled(
                eventUris.map(resourceUri =>
                    context.call('ldp.resource.get', {
                        resourceUri,
                        accept: 'application/ld+json'
                    })
                )
            );

            const allEvents = settled
                .filter(result => result.status === 'fulfilled')
                .map(result => result.value);

            let events = allEvents;


            // Filtre Organization
            if (orgUri) {
                events = events.filter(event => {

                    const involvesRaw = event['pair:involves'] || [];
                    const involvesArray = Array.isArray(involvesRaw) ? involvesRaw : [involvesRaw];

                    const involvesUris = involvesArray
                        .map(value => (typeof value === 'string' ? value : value?.id || value?.['@id']))
                        .filter(Boolean);

                    return involvesUris.includes(orgUri);
                });
            }

            // Filtre Themes
            if (themeUri) {
                events = events.filter(event => {
                    const topicsRaw = event['pair:hasTopic'] || [];
                    const topicsArray = Array.isArray(topicsRaw) ? topicsRaw : [topicsRaw];
                    const topicUris = topicsArray
                        .map(value => (typeof value === 'string' ? value : value?.id || value?.['@id']))
                        .filter(Boolean);

                    return topicUris.includes(themeUri);
                });
            }

            return {
                organization: orgSlug,
                organizationUri: organization?.id || organization?.['@id'] || orgUri,
                theme: themeSlug,
                themeUri,
                eventUris,
                events
            };
        }
    }
};
