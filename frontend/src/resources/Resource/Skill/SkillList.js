import React from 'react';
import { ListWithPermissions } from '@semapps/auth-provider';
import PanToolIcon from '@material-ui/icons/PanTool';
import SimpleList from "../../../common/list/SimpleList";

const SkillList = props => (
  <ListWithPermissions {...props}>
    <SimpleList primaryText={record => record['pair:label']} leftAvatar={() => <PanToolIcon />} linkType="show" />
  </ListWithPermissions>
);

export default SkillList;
