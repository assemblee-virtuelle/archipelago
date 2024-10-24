import React from 'react';
import PanToolIcon from '@mui/icons-material/PanTool';
import SimpleList from "../../../common/list/SimpleList";
import { List } from '../../../common/layout';

const SkillList = props => (
  <List {...props}>
    <SimpleList primaryText={record => record['pair:label']} leftAvatar={() => <PanToolIcon />} linkType="show" />
  </List>
);

export default SkillList;
