const CONFIG = require('../config/config');

module.exports = {
    name: 'embeddedcalendar',
    dependencies: ['api'],

    async started() {
        await this.broker.call('api.addRoute', {
            route: {
                bodyParsers: { json: true },
                aliases: {
                    'GET /api/embeddedcalendar/events': 'embeddedcalendar.getEvents'
                }
            },
        });
    },

    actions: {
        async getEvents(context) {
            const themeSlug = context.params.theme;
            const organizationSlug = context.params.organization;

            const baseUrl = CONFIG.HOME_URL.replace(/\/$/, '');

            const themeUri = themeSlug ? `${baseUrl}/themes/${themeSlug}` : null;
            const organizationUri = organizationSlug ? `${baseUrl}/organizations/${organizationSlug}` : null;
            const eventsContainerUri = `${baseUrl}/events`;

            const filters = {};
            if (themeUri) {
                filters['http://virtual-assembly.org/ontologies/pair#hasTopic'] = themeUri;

            }
            if (organizationUri) {
                filters['http://virtual-assembly.org/ontologies/pair#involves'] = organizationUri;
            }

            const eventsContainer = await context.call('ldp.container.get', {
                containerUri: eventsContainerUri,
                accept: 'application/ld+json',
                filters: filters,
            });
            console.log(eventsContainer);

            let events = eventsContainer['ldp:contains'] || [];

            return {
                events
            };
        }
    }
};
