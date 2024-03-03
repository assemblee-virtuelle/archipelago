import { dataProvider as semanticDataProvider } from '@semapps/semantic-data-provider';
import ontologies from './ontologies.json';
import dataServers from './dataServers';
import resources from '../resources';
import { withLifecycleCallbacks } from 'react-admin';

const baseDataProvider = semanticDataProvider({
  dataServers,
  resources: Object.fromEntries(Object.entries(resources).map(([k, v]) => [k, v.dataModel])),
  ontologies,
  jsonContext: process.env.REACT_APP_MIDDLEWARE_URL + 'context.json'
});

/** Adds a meta param 'filesToDelete' to indicate which files should be deleted with the resource */
const enrichWithFilesToDelete = (params, attributes) => {
  const result = {...params};
  result.meta = result.meta || {};
  result.meta.filesToDelete = [];

  attributes.forEach((attribute) => {
    if (result.previousData[attribute]) {
      result.meta.filesToDelete.push(result.previousData[attribute]);
    }
  });

  return result;
};

export default withLifecycleCallbacks(baseDataProvider, [
  {
    resource: 'Organization',
    beforeDelete: async (params) => enrichWithFilesToDelete(params, ['image']),
  },
  {
    resource: 'Event',
    beforeDelete: async (params) => enrichWithFilesToDelete(params, ['image']),
  },
  {
    resource: 'Project',
    beforeDelete: async (params) => enrichWithFilesToDelete(params, ['image']),
  },
  {
    resource: 'Group',
    beforeDelete: async (params) => enrichWithFilesToDelete(params, ['image']),
  },
  {
    resource: 'Person',
    beforeDelete: async (params) => enrichWithFilesToDelete(params, ['image']),
  },
]);
