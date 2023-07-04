import React from 'react';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SimpleList from "../../../common/list/SimpleList";
import List from "../../../layout/list/List";

const ThemeList = props => (
  <List {...props}>
    <SimpleList primaryText={record => record['pair:label']} leftAvatar={() => <LocalOfferIcon />} linkType="show" />
  </List>
);

export default ThemeList;
