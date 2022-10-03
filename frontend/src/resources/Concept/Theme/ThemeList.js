import React from 'react';
import { ListWithPermissions } from '@semapps/auth-provider';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import SimpleList from "../../../common/list/SimpleList";

const ThemeList = props => (
  <ListWithPermissions {...props}>
    <SimpleList primaryText={record => record['pair:label']} leftAvatar={() => <LocalOfferIcon />} linkType="show" />
  </ListWithPermissions>
);

export default ThemeList;
