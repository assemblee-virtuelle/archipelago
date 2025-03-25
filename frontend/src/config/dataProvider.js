import { fetchVoidEndpoints, dataProvider as semanticDataProvider } from '@semapps/semantic-data-provider';
import dataServers from './dataServers';
import baseResources from '../resources';
import { withLifecycleCallbacks } from 'react-admin';
import config from '../config';

const resources = config.resources?.(baseResources) || baseResources;

const baseDataProvider = semanticDataProvider({
  dataServers,
  resources: Object.fromEntries(Object.entries(resources).map(([k, v]) => [k, v.dataModel])),
  jsonContext: ['https://www.w3.org/ns/activitystreams', config.middlewareUrl + '.well-known/context.jsonld'],
  plugins: [fetchVoidEndpoints()],
});

export default withLifecycleCallbacks(baseDataProvider, []);
