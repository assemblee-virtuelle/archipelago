import React from 'react';
import { useRedirect, useListContext } from "react-admin";
import { TreeView } from '@mui/x-tree-view';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { buildTreeData, generateTreeItem } from '../input/TreeComponent/TreeItemUtils';


const TreeList =({source, label, defaultExpanded = true}) => {
  const redirect = useRedirect()
  const { data, isLoading } = useListContext();
  if (isLoading) return null;
  
  const handleSelect = (event, nodes) => {
    redirect('/Theme/'+encodeURIComponent(nodes.id));
  }

  const treeListData = buildTreeData(data, source, defaultExpanded)

  return (
    <TreeView
      defaultCollapseIcon={<SubdirectoryArrowRightIcon />}
      defaultExpandIcon={<ArrowForwardIcon />}
      defaultExpanded={treeListData.expendedNodes}
    >
        {generateTreeItem(source, label, treeListData.allItems, treeListData.routeTree, false, [], handleSelect)}
    </TreeView>
  )
}

export default TreeList;