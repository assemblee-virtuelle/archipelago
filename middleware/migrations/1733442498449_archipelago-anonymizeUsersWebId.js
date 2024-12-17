const crypto = require('crypto');

module.exports = {
  up: async ({ query, insert, update, call }) => {

    const usersWithoutUUID = await query({
      query: `
        PREFIX core: <http://semapps.org/ns/core#>

        SELECT ?s ?o
        WHERE {
          ?s core:webId ?o .
          FILTER NOT EXISTS {
            FILTER regex(str(?o), "[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$")
          }
        }
      `,
      dataset: 'settings',
    });

    for (let user of usersWithoutUUID) {
      const uuid = crypto.randomUUID();
      const oldWebId = user.o.value;
      let newWebId = `${oldWebId.split('/').slice(0, -1).join('/')}/${uuid}`;
      const suffixes = ['', '/inbox', '/outbox', '/followers', '/following', '/liked'];

      console.log(`Found webId: ${oldWebId}, replacing by ${newWebId}`);

      // Update settings => webId
      await update({
        query: `
          DELETE {
            ?s ?p "${oldWebId}" .
          }
          INSERT {
            ?s ?p "${newWebId}" .
          }
          WHERE {
            ?s ?p "${oldWebId}" .
          }
        `,
        dataset: 'settings',
      });

      for (let suffix of suffixes) {
        console.log(`Updating for ${oldWebId}${suffix}...`);

        // Update localData => all rows
        await update({
          query: `
            DELETE {
              <${oldWebId}${suffix}> ?p ?o .
              ?s ?p2 <${oldWebId}${suffix}> .
            }
            INSERT {
              <${newWebId}${suffix}> ?p ?o .
              ?s ?p2 <${newWebId}${suffix}> .
            }
            WHERE {
              {
                <${oldWebId}${suffix}> ?p ?o .
              }
              UNION
              {
                ?s ?p2 <${oldWebId}${suffix}> .
              }
            }
          `,
          webId: 'system',
        });

        // Update specific activityPub preferredUsername
        await update({
          query: `
            DELETE {
              <${newWebId}> <https://www.w3.org/ns/activitystreams#preferredUsername> ?o .
            }
            INSERT {
              <${newWebId}> <https://www.w3.org/ns/activitystreams#preferredUsername> "${uuid}" .
            }
            WHERE {
              <${newWebId}> <https://www.w3.org/ns/activitystreams#preferredUsername> ?o .
            }
          `,
          webId: 'system',
        });

        // Update WebACL
        await update({
          query: `
            DELETE {
              GRAPH <http://semapps.org/webacl> {
                <${oldWebId}${suffix}> ?p ?o .
                ?s ?p2 <${oldWebId}${suffix}> .
              }
            }
            INSERT {
              GRAPH <http://semapps.org/webacl> {
                <${newWebId}${suffix}> ?p ?o .
                ?s ?p2 <${newWebId}${suffix}> .
              }
            }
            WHERE {
              GRAPH <http://semapps.org/webacl> {
                {
                  <${oldWebId}${suffix}> ?p ?o .
                }
                UNION
                {
                  ?s ?p2 <${oldWebId}${suffix}> .
                }
              }
            }
          `,
          webId: 'system',
        });

        const oldAclWebId = oldWebId.replace('/users/', '/_acl/users/');
        const newAclWebId = newWebId.replace('/users/', '/_acl/users/');
        const aclSuffixes = ['#Read', '#Write', '#Control', '#Append'];

        for (let aclSuffix of aclSuffixes) {
          console.log(`Updating ACL for ${oldWebId}${suffix}${aclSuffix}...`);
          await update({
            query: `
              DELETE {
                GRAPH <http://semapps.org/webacl> {
                  <${oldAclWebId}${suffix}${aclSuffix}> ?p ?o .
                }
              }
              INSERT {
                GRAPH <http://semapps.org/webacl> {
                  <${newAclWebId}${suffix}${aclSuffix}> ?p ?o .
                }
              }
              WHERE {
                GRAPH <http://semapps.org/webacl> {
                  <${oldAclWebId}${suffix}${aclSuffix}> ?p ?o .
                }
              }
            `,
            webId: 'system',
          });
        }
      }

    }
  },
  down: async ({ query, insert, update, call }) => {
    // No down migration
  },
};
