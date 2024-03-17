import React from 'react';
import { CreateButton, ExportButton, useResourceDefinition, TopToolbar, usePermissions, useResourceContext } from 'react-admin';
import { useMediaQuery } from '@mui/material';
import { useCreateContainer } from "@semapps/semantic-data-provider";
import { ViewsButtons } from "@semapps/list-components";
import { PermissionsButton } from "@semapps/auth-provider";

// Custom ListActions which include the PermissionButton and ViewsButtons
const ListActionsWithViewsAndPermissions = ({
  bulkActions,
  sort,
  displayedFilters,
  exporter,
  filters,
  filterValues,
  onUnselectItems,
  selectedIds,
  showFilter,
  total,
  ...rest
}) => {
  const resource = useResourceContext();
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const resourceDefinition = useResourceDefinition(rest);
  const createContainerUri = useCreateContainer(resource);
  const { permissions } = usePermissions(createContainerUri);
  return (
    <TopToolbar>
      <ViewsButtons />
      {filters &&
        React.cloneElement(filters, {
          showFilter,
          displayedFilters,
          filterValues,
          context: 'button'
        })}
      {resourceDefinition.hasCreate && permissions && permissions.some(p => ['acl:Append', 'acl:Write', 'acl:Control'].includes(p['acl:mode'])) && 
        <CreateButton 
      />}
      {permissions && permissions.some(p => ['acl:Control'].includes(p['acl:mode'])) && (
        <PermissionsButton isContainer />
      )}
      {!xs && exporter !== false && (
        <ExportButton
          disabled={total === 0}
          sort={sort}
          filter={filterValues}
          exporter={exporter}
        />
      )}
      {bulkActions &&
        React.cloneElement(bulkActions, {
          filterValues,
          selectedIds,
          onUnselectItems
        })}
    </TopToolbar>
  );
};

export default ListActionsWithViewsAndPermissions;
