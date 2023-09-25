import React from "react";
import { TreeItem } from '@mui/x-tree-view';

const generateTreeItem = (parentProperty, optionText, allItems, routeTree, parentId, dejavueItem, onLabelClick) => {
    const isParentLevel = !parentId;
    const listToUse = isParentLevel ? routeTree : allItems.filter(({ [parentProperty]: itemParentProperty }) => itemParentProperty === parentId);

    return (
        listToUse.map((route) => {
            const test = dejavueItem.filter(item => item === route.id)
            if (test.length < 1) {
                dejavueItem.push(route.id)
                return (
                    <TreeItem 
                        nodeId={route["id"]} 
                        label={<div onClick={e => onLabelClick(e, route )}>{route[optionText]}</div>} 
                        // key={route["id"]} style={route["selected"] ? {color: "#026a63" } : null }
                    >
                        {generateTreeItem(parentProperty, optionText, allItems, [], route["id"], [...dejavueItem], onLabelClick)}
                    </TreeItem>
                )
            }
        })
    )
}

const buildTreeData = (data, source, defaultExpanded) => {
    let routeTree = [], allItems = [], expendedNodes = [];
    for (const item in data) {
        if (defaultExpanded) {
            expendedNodes.push(data[item].id);
        }
        if (data[item][source] === undefined ) {
            routeTree.push(data[item]);
        }
        allItems = allItems.concat(data[item]);
    }
    return {routeTree, allItems, expendedNodes};
}

export { generateTreeItem, buildTreeData } 
