import React from 'react';
import { CreateButton, ExportButton, useResourceDefinition, TopToolbar, usePermissionsOptimized } from 'react-admin';
import { useMediaQuery } from '@material-ui/core';
import { useCreateContainer } from "@semapps/semantic-data-provider";
import { ViewsButtons } from "@semapps/list-components";
import { PermissionsButton } from "@semapps/auth-provider";

// Custom ListActions which include the PermissionButton and ViewsButtons
const ListActionsWithViewsAndPermissions = ({
  bulkActions,
  basePath,
  currentSort,
  displayedFilters,
  exporter,
  filters,
  filterValues,
  onUnselectItems,
  resource,
  selectedIds,
  showFilter,
  total,
  ...rest
}) => {
  const xs = useMediaQuery(theme => theme.breakpoints.down('xs'));
  const resourceDefinition = useResourceDefinition(rest);
  const createContainerUri = useCreateContainer(resource);
  const { permissions } = usePermissionsOptimized(createContainerUri);
  return (
    <TopToolbar>
      <ViewsButtons />
      {filters &&
        React.cloneElement(filters, {
          resource,
          showFilter,
          displayedFilters,
          filterValues,
          context: 'button'
        })}
      {resourceDefinition.hasCreate && permissions && permissions.some(p => ['acl:Append', 'acl:Write', 'acl:Control'].includes(p['acl:mode'])) && <CreateButton basePath={basePath} />}
      {permissions && permissions.some(p => ['acl:Control'].includes(p['acl:mode'])) && (
        <PermissionsButton basePath={basePath} record={createContainerUri} />
      )}
      {!xs && exporter !== false && (
        <ExportButton
          disabled={total === 0}
          resource={resource}
          sort={currentSort}
          filter={filterValues}
          exporter={exporter}
        />
      )}
      {bulkActions &&
        React.cloneElement(bulkActions, {
          basePath,
          filterValues,
          resource,
          selectedIds,
          onUnselectItems
        })}
    </TopToolbar>
  );
};

export default ListActionsWithViewsAndPermissions;
