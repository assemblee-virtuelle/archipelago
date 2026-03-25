import { useContainers, useDataModel, useDataServers } from '@semapps/semantic-data-provider';
import { useResourceContext } from 'react-admin';

const toArray = <T>(v: T | T[]) => (Array.isArray(v) ? v : [v]);

const useShortId = () => {
  const containers = useContainers();
  const resource = useResourceContext();
  const dataModel = useDataModel(resource as string);
  const dataServers = useDataServers();

  const resourceTypes = toArray<string>(dataModel?.types || []);
  const defaultServer = Object.keys(dataServers || {}).find((server) => (dataServers || {})[server].default);
  const container = containers.find((container) => resourceTypes.some((type) => container.types?.includes(type)));

  // can be fullId or shortId
  return (recordId: string) => {
    if (!dataServers || containers.length === 0) {
      return { loading: true, shortId: null, fullId: null };
    }

    if (!defaultServer || !container) {
      return { loading: false, shortId: null, fullId: null };
    }

    const baseUrl = dataServers[defaultServer].baseUrl;
    const fullBaseUrl = new URL(container.path, baseUrl).toString();

    if (recordId?.match(/^(https?):\/\//i)) {
      if (recordId.indexOf(fullBaseUrl) !== 0) {
        return { loading: false, shortId: recordId, fullId: recordId };
      }

      return {
        loading: false,
        shortId: recordId.replace(fullBaseUrl, '').replace(/^\/+|\/+$/g, ''),
        fullId: recordId,
      };
    } else {
      return {
        loading: false,
        shortId: recordId,
        fullId: new URL(container.path + '/' + recordId, baseUrl).toString(),
      };
    }
  };
};

export default useShortId;
