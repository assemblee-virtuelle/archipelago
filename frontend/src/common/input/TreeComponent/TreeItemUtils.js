import React from "react";
import { TreeItem } from '@mui/x-tree-view';

const generateTreeItem = (parentProperty, optionText, allItems, root, parentId, dejavueItem, onLabelClick) => {
    const isParentLevel = !parentId;
    const listToUse = isParentLevel ? root : allItems.filter(({ [parentProperty]: itemParentProperty }) => itemParentProperty === parentId);

    return (
        listToUse.map((root) => {
            const test = dejavueItem.filter(item => item === root.id)
            if (test.length < 1) {
                dejavueItem.push(root.id)
                return (
                    <TreeItem 
                        nodeId={root["id"]} 
                        label={<div onClick={e => onLabelClick(e, root )}>{root[optionText]}</div>} 
                        key={root["id"]}
                    >
                        {generateTreeItem(parentProperty, optionText, allItems, [], root["id"], [...dejavueItem], onLabelClick)}
                    </TreeItem>
                )
            }
            return null;
        })
    )
}

const buildTreeData = (data, source) => {
  let roots = [], allItems = [];
  for (const item in data) {

      if (data[item][source] === undefined ) {
        roots.push(data[item]);
      }
      allItems = allItems.concat(data[item]);
  }
  return {roots, allItems};
}

const getTreeData = (data, parentProperty) => {
    let dejavueItem = [];
    const out = [];

    for (let item of data) {
      let children = data.filter(candidate => candidate[parentProperty] === item.id);
      children = children.filter(child => !dejavueItem.includes(child.id))
      const parent = item[parentProperty];
      dejavueItem = dejavueItem.concat(children.map(child => child.id));
      out.push({...item, children, parent});
    }
    return out;
};

class Node {
    constructor(data) {
      this.name = data["pair:label"];
      this.id = data.id;
      this.parent = data.parent;
      this.children = data.children;
    }

    getParent(nodes) {
      if (this.parent) {
        return nodes.findLast(n => n.id === this.parent);
      } else {
        return null;
      }
    }
  
    getChildren(nodes) {
      return nodes.filter(n => n.parent === this.id);
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
