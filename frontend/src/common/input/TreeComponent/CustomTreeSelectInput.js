import React, { useEffect, useState } from "react";
import TreeSelect, {  DefaultOption, getDefaultOptionProps } from "mui-tree-select";
import { getTreeData, Node } from "./TreeItemUtils";
import { useGetList, useInput } from "react-admin";
import { TextField } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const findNode = (id, roots) => {
  for (let root of roots) {
    if (root.id === id) {
      return root;
    } else if (root.children?.length > 0) {
      const finded = findNode(id, root.children);
      if (finded) return finded;
    }
  }
  return undefined;
}

const CustomTreeSelect = (props) => {
  const {
    field,
    fieldState: { isTouched, invalid, error },
    formState: { isSubmitted }
  } = useInput(props);

  const [selected, setSelected] = useState(null);
  const { data, isLoading } = useGetList(props.reference, { pagination: { page: 1, perPage: Infinity } });

  let nodes = [];
  if (!isLoading) {
    nodes = getTreeData(data, props.broader, null, []).map((item) => new Node(item));
  }

  useEffect(() => {
    const finded = findNode(field.value, nodes);
    setSelected(finded);
  }, [field.value, isLoading]);

  const handleIconClick = (node, e) => {
    setSelected(node);
    const selectedId = node ? node.id : null;
    field.onChange(selectedId);
  };

  const handleChange = (event, value) => {
    setSelected(value);
    const selectedId = value ? value.id : null;
    field.onChange(selectedId);
  };

  return (
    <TreeSelect
      fullWidth={props.fullWidth}
      getChildren={(node) => (node ? node.getChildren() : nodes)}
      getParent={(node) => {
        if (node.getParent) {
          return node.getParent();
        } else {
          return null;
        }
      }}
      isBranch={(node) => (node ? node.isBranch() : true)}
      value={selected}
      onChange={handleChange}
      renderInput={(props) =>
        <TextField
          {...props}
          {...field}
          label={props.label}
          fullWidth
        />
      }
      renderOption={(...args) => (
        <DefaultOption
          
          {...((props, node) => {
            var _a, _b;
            return {
              ...props,
              ListItemTextProps: {
                ...props.ListItemTextProps,
                primary: (
                  <div style={{ display: 'flex', alignItems: 'center', gap: "20px"}}>
                    <span >{node.name}</span>
                    <AddCircleOutlineIcon onClick={(e) => handleIconClick(node, e)} />
                  </div>
                ),
              },
            };
          })(getDefaultOptionProps(...args), args[1])}
        />
      )}
    />
  );
};

export default CustomTreeSelect;
