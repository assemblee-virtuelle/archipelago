import React from 'react';
import { useRedirect, useListContext, useCreatePath, RaRecord } from 'react-admin';
import { TreeItem, TreeView } from '@mui/x-tree-view';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { Box } from '@mui/material';

type Props = {
  reference: string;
  parentKey: string;
  labelKey: string;
};

const TreeList = ({ reference, parentKey, labelKey }: Props) => {
  interface TreeRecord extends RaRecord<string> {
    [labelKey]: string;
    [parentKey]: string;
  }

  const redirect = useRedirect();
  const createPath = useCreatePath();
  const { data, isLoading, isPending } = useListContext<TreeRecord>();

  if (isPending || isLoading) return null;

  const renderTree = (list: TreeRecord[], parent?: string) => {
    return list
      .filter((node) => node[parentKey] === parent && node[labelKey])
      .map((node) => (
        <TreeItem
          key={node.id}
          nodeId={node.id}
          label={
            <Box onClick={() => redirect(createPath({ resource: reference, type: 'show', id: node.id }))}>
              {node[labelKey]}
            </Box>
          }
        >
          {renderTree(list, node.id)}
        </TreeItem>
      ));
  };

  return (
    <TreeView defaultCollapseIcon={<SubdirectoryArrowRightIcon />} defaultExpandIcon={<ArrowForwardIcon />}>
      {renderTree(data || [])}
    </TreeView>
  );
};

export default TreeList;
