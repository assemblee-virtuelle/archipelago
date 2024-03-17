import React from 'react';
import {
    TextInput,
    ArrayInput,
    SimpleFormIterator,
  } from 'react-admin';
import makeStyles from '@mui/styles/makeStyles';

const useHideInputStyles = makeStyles({
    root: {
      display: 'none'
    }
  });
  
const ReificationArrayInput = props => {
    const { reificationClass, children, ...otherProps } = props;
    const hideInputStyles = useHideInputStyles();

    return (
        <ArrayInput {...otherProps}>
        <SimpleFormIterator inline>
            {props.children}
            <TextInput className={hideInputStyles.root} source="type" defaultValue={reificationClass} />
        </SimpleFormIterator>
        </ArrayInput>
    );
};
  
export default ReificationArrayInput;