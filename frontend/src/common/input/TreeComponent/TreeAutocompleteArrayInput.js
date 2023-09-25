import React, { useState  } from 'react';
import { AutocompleteArrayInput, useGetList, useInput } from "react-admin";
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import { TreeView } from '@mui/x-tree-view';
import { generateTreeItem, buildTreeData } from './TreeItemUtils';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

/*
* Exemple :
*   <ReferenceArrayInput label="Sujet de" reference="Theme" source="pair:hasTopic" fullWidth >
*   <TreeAutocompleteArrayInput 
*       optionText="pair:label" // define the text render for each item render
*       parentProperty="pair:broader"  // define the parent of a node in tree
*       treeReference="Theme" // same as reference from ReferenceArrayInput, but react admin transform the reference to choices aray and don't call TreeAutocompleteArrayInput whit reference props. treeReference specify resource used to build tree.
*       shouldRenderSuggestions={value => false} // shouldRenderSuggestions RA . can be set to common shouldRenderSuggestions function if you want user use sugestion
*       defaultExpanded={true} // boolean to default expand or not the treeItem selector when modal opening
*   />
*   </ReferenceArrayInput>
*/

const useStyles = makeStyles(theme => ({
    editIcon: { 
        backgroundColor:"#026a63", 
        borderRadius: "25%", 
        color: "white",
        height: "25px"
    },
    TreeStyle: {
        paddingLeft: "15px"
    }
}));

const TreeAutocompleteArrayInput = (props) => {
    const style = useStyles();
    const {field} = useInput({source:props.source});

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const  {data, isLoading}  = useGetList(props.treeReference, {pagination:{ page: 1, perPage: Infinity }});
    if (isLoading) return null;

    const isFullWidth = props.fullWidth === true;
    
    const handleSelect = (event, nodes) => {
        if (field.value === undefined) {
            field.onChange([nodes.id]);
        } else if (!field.value.includes(nodes.id)){
            const newVal = [...(field.value), nodes.id]
            field.onChange(newVal)
        }
        handleClose();
    };

    const treeData = buildTreeData( data, props.parentProperty, props.defaultExpanded);
    return (
        <div style={{display: "flex", alignItems: "top", width: isFullWidth ? "100%" : ""}}>
            <div style={{flexGrow: isFullWidth ? 1 : 0}}>
                <AutocompleteArrayInput fullWidth {...props} />
            </div>
            <div style={{paddingTop: "16px", paddingLeft: "10px"}}>
                <EditIcon className={style.editIcon} onClick={handleOpen} />
            </div>           
            <Dialog fullWidth open={open} onClose={handleClose}>
                <DialogTitle >Choix du {props.treeReference}</DialogTitle>
                <TreeView 
                    defaultExpanded={treeData.expendedNodes}
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    className={style.TreeStyle}
                >
                    {generateTreeItem(props.parentProperty, props.optionText, treeData.allItems, treeData.routeTree.reverse(), false, [], handleSelect)}
                </TreeView >
                <DialogActions >
                    <Button label="ra.action.close" variant="text" onClick={handleClose} />
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default TreeAutocompleteArrayInput;
