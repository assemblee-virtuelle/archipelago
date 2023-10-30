import React, { useEffect, useState } from "react";
import TreeSelect, {  DefaultOption, getDefaultOptionProps } from "mui-tree-select";
import { getTreeData, Node } from "./TreeItemUtils";
import { useGetList, useInput } from "react-admin";
import { TextField } from "@mui/material";

const findNode = (id, roots) => {
  for (let root of roots) {
    if (root.id === id) {
      return root;
    } else if (root.children?.length > 0) {
      const finded = findNode(id, root.children);
      if (finded) {
        return new Node(finded);
      }
    }
  }
  return undefined;
}

const CustomTreeSelect = (props) => {
  const {
    field,
  } = useInput(props);

  const [selected, setSelected] = useState(null);
  const { data, isLoading } = useGetList(props.reference, { pagination: { page: 1, perPage: Infinity } });

  let nodes = [];
  if (!isLoading) {
      nodes = getTreeData(data, props.broader).map((item) => {
        return new Node(item);
      })
  }

  useEffect(() => {
    const finded = findNode(field.value, nodes);
    setSelected(finded);
  }, [field.value, isLoading, nodes]);

  const handleIconClick = (event, node) => {
    const selectedId = node ? node.id : null;
    field.onChange(selectedId);
    event.stopPropagation();
  };

  const handleChange = (event, node) => {
    const selectedId = node ? node.id : null;
    field.onChange(selectedId);
  };

  return (
    <TreeSelect
      disableCloseOnSelect
      getChildren={(node) => (node ? node.getChildren(nodes) : nodes.filter(node => node.parent === undefined))}
      getParent={(node) => {
          if (node.getParent) {
              return node.getParent(nodes);
          } else { return null; }
      }}
      isBranch={(node) => (node ? node.isBranch() : true)}
      value={selected}
      onChange={handleChange}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            {...field}
            label={props.label}
            helperText="Choisissez un thème qui sera le parent de celui-ci dans l'arborescence."
          />
        )
      }}
      renderOption={(...args) => (
        <DefaultOption
          {...((props, node) => {
            return {
              ...props,
              ListItemTextProps: {
                ...props.ListItemTextProps,
                primary: node.children ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: "20px"}}>
                    <div onClick={(e) => handleIconClick(e, node)} style={{width:"100%"}}>
                      <span >{node.name}</span>
                    </div>
                  </div>
                ) : <span >{node.name}</span>,
              },
            };
          })(getDefaultOptionProps(...args), args[1])}
        />
      )}
      {...props}
    />
  );
};

export default CustomTreeSelect;
