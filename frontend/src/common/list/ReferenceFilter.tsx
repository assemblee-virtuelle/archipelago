import React, { createElement } from 'react';
import {
  FilterList,
  FilterListItem,
  useGetList,
  useResourceContext,
  useResourceDefinition,
  RaRecord,
  ResourceOptions,
} from 'react-admin';
import { useContainers } from '@semapps/semantic-data-provider';

// Converts an element to array or returns it if it's already an array
const toArray = <T,>(e: T | T[]) => ([] as T[]).concat(e);

type Props = {
  reference: string;
  source: string;
  inverseSource?: string;
  limit?: number;
  sort?: {
    field: string;
    order: 'ASC' | 'DESC';
  };
  filter?: Record<string, string>;
  label?: string;
  icon?: JSX.Element;
  showCounters?: boolean;
};

const ReferenceFilter = <ReferenceType extends RaRecord>({
  reference,
  source,
  inverseSource,
  limit = 25,
  sort,
  filter,
  label,
  icon,
  showCounters = true,
}: Props) => {
  const { data } = useGetList<ReferenceType>(reference, {
    pagination: { page: 1, perPage: limit },
    sort,
    filter,
  });
  const currentResource = useResourceDefinition<ReferenceType>({ resource: reference });
  const resourceContext = useResourceContext();
  const resourceContextContainers = useContainers(resourceContext);

  const resourceContextContainersUri = resourceContextContainers.map((container) => container.uri);

  const addCounterAttribute = (itemData: ReferenceType) => {
    return {
      ...itemData,
      counter: inverseSource
        ? toArray<string>((itemData?.[inverseSource] as string[]) || []).filter((inverseSourceData) => {
            return resourceContextContainersUri.some(
              (containerUri) => containerUri && inverseSourceData?.startsWith(containerUri),
            );
          }).length
        : 0,
    };
  };

  return (
    <FilterList
      label={label || (currentResource?.options as ResourceOptions)?.label || ''}
      icon={icon || currentResource?.icon ? createElement(currentResource.icon) : undefined}
    >
      {data
        ?.map(addCounterAttribute)
        .filter((itemData) => itemData.counter > 0)
        .map((itemData) => (
          <FilterListItem
            key={itemData.id}
            label={
              <span className="filter-label">
                {itemData['pair:label']}
                {showCounters && inverseSource && (
                  <>
                    &nbsp;
                    <span className="filter-count">({itemData.counter})</span>
                  </>
                )}
              </span>
            }
            value={{ [source]: itemData.id }}
          />
        ))}
    </FilterList>
  );
};

export default ReferenceFilter;
