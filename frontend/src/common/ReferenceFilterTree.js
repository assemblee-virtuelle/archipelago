import React, { useState } from 'react';
import { useGetList } from 'react-admin';
import { TreeView, TreeItem, useTreeItem } from '@mui/x-tree-view';
import { useListFilterContext } from 'ra-core';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';

/**
 *
 * @example
 * const FilterAside = () => (
 *   <Card>
 *     <CardContent>
 *       <FilterLiveSearch source="pair:label" />
 *       <ReferenceFilterTree
 *         reference="Theme"
 *         source="pair:broader"
 *         label="pair:label"
 *         icon={icon}
 *         predicate={"http://virtual-assembly.org/ontologies/pair#hasTopic"}
 *       />
 *     </CardContent>
 *   </Card>
 * );
 */

function generateFilterTree(broader, label, allItems, routeTree, parentId) {
  // If !parentId it's a trunkItem
  const isParentLevel = !parentId;
  const listToUse = isParentLevel ? routeTree : allItems.filter(({ [broader]: itemSource }) => itemSource === parentId);
  return (
    listToUse.map((route) =>
      <CustomTreeItem
        route={route}
        label={<div
          style={{
            fontSize: "0.875rem",
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            fontWeight: 400,
            lineHeight: 1.43,
            letterSpacing: "0.01071em",
            maxWidth: "140px"
          }}>{route["pair:label"]}
        </div>}
        nodeId={route["id"]} 
        key={route["id"]} 
        selected={true} >
          {generateFilterTree(broader, label, allItems, [], route["id"])}
      </CustomTreeItem>
    )
  )
}

const CustomContent = React.forwardRef(function CustomContent(props, ref) {
  const { filterValues } = useListFilterContext();
  
  const {
    classes,
    className,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (event) => {
    preventSelection(event);
  };

  const handleExpansionClick = (event) => {
    handleExpansion(event);
  };

  const handleSelectionClick = (event, b) => {
    handleSelection(event);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onMouseDown={handleMouseDown}
      ref={ref}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div onClick={handleExpansionClick} className={classes.iconContainer}>
        {icon}
      </div>
      <Typography
        onClick={handleSelectionClick}
        component="div"
        className={classes.label}
      >
        {label}

        {selected && filterValues["pair:hasTopic"] && <CancelOutlinedIcon
          style={{
            top: "50%",
            right: "1px",
            position: "absolute",
            transform: "translateY(-50%)",
            color: "rgba(0, 0, 0, 0.54)",
          }}
        />}
      </Typography>
    </div>
  );
});

CustomContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  displayIcon: PropTypes.node,
  expansionIcon: PropTypes.node,
  icon: PropTypes.node,
  label: PropTypes.node,
};

function CustomTreeItem(props) {
  return <TreeItem ContentComponent={CustomContent} {...props} />;
}

const ReferenceFilterTree = ({ reference, source, broader, label, limit, sort, filter, icon, predicate, title }) => {
  const { data } = useGetList(reference, { pagination:{page: 1, perPage: Infinity} , sort, filter});
  const { filterValues, setFilters } = useListFilterContext();
  const [ selected, setSelected ] = useState();

  let routeTree = [], allItems = [];
  for (const item in data) {
    if (data[item][broader] === undefined ) {
      routeTree.push(data[item]);
    }
    allItems = allItems.concat(data[item]);
  }

  /*
  * We use the `onNodeSelect` function to mimic a click on a single node.
  * If the node is already selected, we render an empty array (`[]`), and we retain only the last selected node using `[0]`.
  */
  const handleSelect = (event, nodes) => {
    let effectiveSelection;
    if (nodes[0] === selected) {
      effectiveSelection = [];
    } else {
      effectiveSelection = nodes;
    }
    setSelected(effectiveSelection[0])

    if (filterValues[source] === effectiveSelection[0]) {
      delete filterValues[source];
      setFilters({...filterValues })
    } else {
      setFilters({...filterValues, [source]: effectiveSelection[0] })
    }
  }

  const treeViewSelection = selected?[selected] : []

  return (
    <div style= {{marginTop: "16px"}}>
      <div style={{display: "flex", alignItems: "center"}}>
        <LocalOfferIcon style={{ color: 'black', marginRight: "8px" }} />
        <div style={{fontFamily: "Roboto, Helvetica, Arial, sans-serif", fontSize: "0.75rem", letterSpacing: "0.08333em"}}>
          {title !== undefined ? title.toUpperCase(): reference.toUpperCase()}
        </div>
      </div>
      <TreeView
       /* Warning: We use the multiSelect TreeView props to work around the system's limitations.
        It's used to simulate deselection because it's not possible in single selection.
        Like this we can trigger the handler */
        multiSelect
        selected={treeViewSelection}
        onNodeSelect={handleSelect}
        aria-label="icon expansion"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        style={{paddingLeft:"10px"}}
      >
        {generateFilterTree(broader, label, allItems, routeTree.reverse(), undefined)}
      </TreeView>
    </div>
  )
};

export default ReferenceFilterTree;