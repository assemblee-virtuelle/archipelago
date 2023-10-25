import React, { useEffect, useState } from "react";
import TreeSelect, {  DefaultOption, getDefaultOptionProps } from "mui-tree-select";
import { getTreeData,Node } from "./TreeItemUtils";
import { useGetList, useInput } from "react-admin";
import { TextField } from "@mui/material";

const findNodes = (ids, roots) => {
    let arrayOut = [];
    for (let root of roots) {
        if (ids.includes(root.id)) {
            arrayOut.push(root);
        } 
        if (root.children?.length > 0) {
          const finded = findNodes(ids, root.children);
          arrayOut = arrayOut.concat(finded);
        }
    }
    return arrayOut;
}

const CustomTreeSelectArrayInput = (props) => {
  const {
      field,
      fieldState: { isTouched, invalid, error },
      formState: { isSubmitted }
  } = useInput(props);

  const [selected, setSelected] = useState([]);
  const { data, isLoading } = useGetList(props.reference, { pagination: { page: 1, perPage: Infinity } });

  let nodes = [];
  if (!isLoading) {
      nodes = getTreeData(data, props.broader, null, []).map((item) => new Node(item));
  }

  useEffect(() => {
      const arrayValue = Array.isArray(field.value)?field.value:[field.value];
      const finded = findNodes(arrayValue, nodes);
      setSelected(finded);
  }, [field.value, isLoading]);

  const handleIconClick = (event, node) => {
    let values = selected.concat(node)
    const selectedIds = values.map(item => item.id);
    field.onChange(selectedIds);
    event.stopPropagation();
  };

  const handleChange = (event, value) => {
    const selectedIds = value.map(item => item.id);
    field.onChange(selectedIds);
  };

  return (
    <TreeSelect
        multiple
        getChildren={(node) => (node ? node.getChildren() : nodes)}
        getParent={(node) => {
            if (node.getParent) {
                return node.getParent();
            } else { return null; }
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
        renderOption={(...args) => {
      
          return (
              <DefaultOption
                  {...((props, node) => ({
                      ...props,
                      ListItemTextProps: {
                          ...props.ListItemTextProps,
                          primary: node.children ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: "20px"}}>
                              <div onClick={(e) => handleIconClick(e, node)} style={{width:"100%"}}>
                                <span >{node.name}</span>
                              </div>
                              {/* <AddCircleOutlineIcon onClick={(e) => handleIconClick(e, node)} /> */}
                            </div>
                        ) : <span >{node.name}</span>
                        ,
                      },
                  }))(getDefaultOptionProps(...args), args[1])}
              />
          );
      }}
        {...props}
    />
  );
};

export default CustomTreeSelectArrayInput;