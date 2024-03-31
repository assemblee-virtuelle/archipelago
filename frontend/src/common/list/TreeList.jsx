import React from 'react';
import { useRedirect, useListContext, useCreatePath } from "react-admin";
import { TreeView } from '@mui/x-tree-view';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { buildTreeData, generateTreeItem } from '../input/TreeComponent/TreeItemUtils';


const TreeList =({source, label, defaultExpanded = true}) => {
  const redirect = useRedirect()
  const createPath = useCreatePath();
  const { data, isLoading } = useListContext();
  if (isLoading) return null;

  const handleSelect = (event, node) => {
    redirect(createPath({resource: 'Theme',type: 'show',id: node.id}));
  }

  const treeListData = buildTreeData(data, source, defaultExpanded)
  return (
    <TreeView
      defaultCollapseIcon={<SubdirectoryArrowRightIcon />}
      defaultExpandIcon={<ArrowForwardIcon />}
      defaultExpanded={treeListData.expendedNodes}
    >
        {generateTreeItem(source, label, treeListData.allItems, treeListData.roots, false, [], handleSelect)}
    </TreeView>
  )
}

export default TreeList;
