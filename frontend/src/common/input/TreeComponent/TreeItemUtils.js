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
                        key={route["id"]}
                    >
                        {generateTreeItem(parentProperty, optionText, allItems, [], route["id"], [...dejavueItem], onLabelClick)}
                    </TreeItem>
                )
            }
        })
    )
}

const buildTreeData = (data, source) => {
    let routeTree = [], allItems = [];
    for (const item in data) {
  
        if (data[item][source] === undefined ) {
            routeTree.push(data[item]);
        }
        allItems = allItems.concat(data[item]);
    }
    return {routeTree, allItems};
}

const getTreeData = (data, parentProperty, parentId, dejavueItem) => {
    const { routeTree, allItems } = buildTreeData (data, parentProperty)
    
    const isParentLevel = !parentId;
    const listToUse = isParentLevel
        ? routeTree
        : allItems.filter(({ [parentProperty]: itemParentProperty }) => itemParentProperty === parentId);

    const result = listToUse.map((item) => {
        const test = dejavueItem.includes(item.id);
        if (!test) {
            dejavueItem.push(item.id);

            const children = getTreeData(data, parentProperty, item.id, dejavueItem);

            const newItem = {
                id: item.id,
                name: item["pair:label"],
            };

            if (children.length > 0) {
                newItem.children = children;
            }

            return newItem;
        }

        return null; // Skip already processed items
    });

    return result.filter((item) => item !== null);
};

class Node {
    constructor(data, parent) {
      this.name = data.name;
      this.id = data.id;
      this.parent = parent;
      this.children = data.children?.map((child) => new Node(child, this));
    }

    getParent() {
      if (this.parent) {
        return this.parent;
      } else {
        return null;
      }
    }
  
    getChildren() {
      return this.children;
    }
  
    isBranch() {
      return this.children && this.children.length > 0;
    }
  
    isEqual(to) {
      return to && this.id === to.id;
    }
  
    toString() {
      return this.name;
    }
  }


export { generateTreeItem, buildTreeData, getTreeData, Node } 
