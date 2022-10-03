import React from 'react';
import { useEditContext } from 'react-admin';
import { useCheckPermissions } from '@semapps/auth-provider';
import { Grid, makeStyles, Paper, Typography} from '@material-ui/core';
import { EditActions, EditToolbarWithPermissions } from "@semapps/auth-provider";

const useStyles = makeStyles(theme => ({
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    paddingTop: 20,
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.8rem'
    }
  }
}));

const EditView = ({ title, children }) => {
  const editContext = useEditContext();
  const classes = useStyles();
  const permissions = useCheckPermissions(editContext?.record?.id, 'edit');
  if( !permissions ) return null;
  return(
    <Grid container>
      <Grid item xs={6}>
        <Typography variant="h4" color="primary" component="h1" className={classes.title}>
          {React.cloneElement(title, { record: editContext.record })}
        </Typography>
      </Grid>
      <Grid xs={6}>
        <EditActions {...editContext} />
      </Grid>
      <Grid xs={12}>
        <Paper>
          {React.cloneElement(children, {
            toolbar: <EditToolbarWithPermissions />,
            ...editContext,
            ...children.props
          })}
        </Paper>
      </Grid>
    </Grid>
  )
};

export default EditView;
