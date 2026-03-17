import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Chip, MenuItem, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { CommonInputProps, FieldTitle, InputHelperText, RaRecord, useGetList, useInput } from 'react-admin';
import { TreeItem, TreeView } from '@mui/x-tree-view';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

type RecursiveValue = {
  id: string;
  label: string;
  children: RecursiveValue[];
  allChildrenLabels: string[];
};

// Remove accents and uppercase
const normalize = (str: string) =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');

type DropDownTreeSelectProps = CommonInputProps & {
  labelKey: string;
  parentKey: string;
  disabled?: boolean;
  reference: string;
  multiple?: boolean;
};

const DropDownTreeSelect = ({
  labelKey,
  parentKey,
  label,
  disabled,
  reference,
  source,
  helperText,
  multiple = false,
  validate,
}: DropDownTreeSelectProps) => {
  interface TreeRecord extends RaRecord<string> {
    [labelKey]: string;
    [parentKey]: string;
  }

  const { data } = useGetList<TreeRecord>(reference, {
    pagination: { page: 1, perPage: Infinity },
  });

  const {
    field,
    fieldState: { invalid, error },
    isRequired,
  } = useInput<number>({ source, validate });

  const options = data?.map((item) => item.id) || [];

  const [inputText, setInputText] = useState<string>('');
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const getExpandedNodes = useCallback(
    (rootTree: RecursiveValue[], searchText: string) => {
      const expanded: string[] = [];

      rootTree.map((node) => {
        const childrenMatched =
          inputText !== '' && node.allChildrenLabels.some((v) => normalize(v).indexOf(normalize(searchText)) !== -1);

        if (childrenMatched) {
          expanded.push(node.id);
        }

        expanded.push(...getExpandedNodes(node.children, searchText));
      });

      return expanded;
    },
    [inputText],
  );

  const buildTree = useCallback(
    (list: TreeRecord[], parent?: string): RecursiveValue[] => {
      return list
        .filter((item) => item[parentKey] === parent && item[labelKey])
        .map((item) => {
          const children = buildTree(list, item.id);
          return {
            id: item.id,
            label: item[labelKey],
            children,
            allChildrenLabels: [...children.map((c) => c.allChildrenLabels), ...children.map((c) => c.label)].flat(),
          };
        });
    },
    [parentKey, labelKey],
  );

  const tree = useMemo(() => buildTree(data || []), [data, buildTree]);

  useEffect(() => {
    setExpandedNodes(getExpandedNodes(tree, inputText));
  }, [getExpandedNodes, inputText, tree]);

  const renderChips = (values: string[]) => {
    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {values.map((value) => {
          return (
            <Chip
              key={value}
              sx={{ pt: 1.8, pb: 1.8 }}
              onMouseDown={(event) => event.stopPropagation()}
              onDelete={
                disabled
                  ? undefined
                  : () => {
                      field.onChange((field.value as string[]).filter((v) => v !== value));
                    }
              }
              label={data?.find((v) => v.id === value)?.[labelKey] ?? ''}
            />
          );
        })}
      </Box>
    );
  };

  const renderTreeItems = (
    rootTree: RecursiveValue[],
    values: string[],
    searchText: string,
    isRoot: boolean,
    parentMatched: boolean = false,
  ) => {
    const result = rootTree
      .map((node) => {
        const matched = searchText === '' || normalize(node.label).indexOf(normalize(searchText)) !== -1;
        const childrenMatched =
          searchText === '' || node.allChildrenLabels.some((v) => normalize(v).indexOf(normalize(searchText)) !== -1);

        if (!matched && !childrenMatched && !parentMatched) {
          return null;
        }

        return (
          <TreeItem
            key={node.id}
            nodeId={node.id}
            label={
              <MenuItem key={node.id} value={node.id} dense disabled={values.includes(node.id)}>
                {node.label}
              </MenuItem>
            }
          >
            {node.children &&
              node.children.length > 0 &&
              renderTreeItems(node.children, values, searchText, false, matched)}
          </TreeItem>
        );
      })
      .filter((n) => n);

    if (isRoot && result.length === 0) {
      return <TreeItem nodeId="empty" label="Aucune option disponible" disabled />;
    }

    return result;
  };

  return (
    <Autocomplete
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      multiple={multiple}
      fullWidth
      clearOnEscape={false}
      options={options}
      disabled={disabled}
      value={multiple ? (field.value as string[]) || [] : (field.value as string) || ''}
      filterOptions={(v) => v}
      onBlur={(event) => {
        field.onBlur(event);
        setInputText('');
      }}
      onChange={(_event, values) => {
        field.onChange(values);
        setInputText('');
      }}
      renderTags={multiple ? renderChips : undefined}
      getOptionLabel={(option) => data?.find((i) => i.id === option)?.[labelKey] || ''}
      disableCloseOnSelect
      inputValue={multiple ? inputText : undefined}
      renderInput={(params) => (
        <TextField
          {...params}
          onChange={(v) => setInputText(v.target.value)}
          label={
            label !== '' && label !== false ? (
              <FieldTitle label={label} source={source} isRequired={isRequired} />
            ) : null
          }
          helperText={
            helperText !== false || invalid ? <InputHelperText error={error?.message} helperText={helperText} /> : ''
          }
          required={isRequired}
          error={invalid}
        />
      )}
      ListboxComponent={(props) => {
        return (
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            expanded={expandedNodes}
            onNodeToggle={(event: React.SyntheticEvent, nodeIds: string[]) => {
              if ((event.target as HTMLElement).tagName !== 'LI') {
                setExpandedNodes(nodeIds);
              }
            }}
            onNodeSelect={(event: React.SyntheticEvent, id: string) => {
              if ((event.target as HTMLElement).tagName === 'LI') {
                if (multiple) {
                  field.onChange([...(field.value as string[]), id]);
                } else {
                  field.onChange(id);
                }
                setInputText('');
                !multiple && setOpen(false);
              }
            }}
            {...props}
          >
            {renderTreeItems(tree, field.value as string[], inputText, true)}
          </TreeView>
        );
      }}
    />
  );
};

export default DropDownTreeSelect;
