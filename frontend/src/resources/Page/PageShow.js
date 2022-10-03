import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { ShowWithPermissions } from '@semapps/auth-provider';
import PageTitle from './PageTitle';
import { MarkdownField } from '../../common/field';
import { MainList } from '../../common/list';

const useStyles = makeStyles(() => ({
  card: {
    paddingTop: 9
  }
}));

const PageShow = props => {
  const classes = useStyles();
  return (
    <ShowWithPermissions title={<PageTitle />} classes={{ card: classes.card }} {...props}>
      <MainList>
        <Typography variant="h3" color="primary" component="h1" id="react-admin-title" />
        <MarkdownField source="semapps:content" addLabel={false} />
      </MainList>
    </ShowWithPermissions>
  );
};

export default PageShow;
