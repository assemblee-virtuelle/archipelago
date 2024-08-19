import React from 'react';
import { DateField } from 'react-admin';
import { Avatar } from '@mui/material';
import TaskIcon from '@mui/icons-material/PlaylistAddCheck';
import { List } from '../../../../layout';
import TaskFilterSidebar from './TaskFilterSidebar';
import SimpleList from "../../../../common/list/SimpleList";

const TaskList = props => (
  <List aside={<TaskFilterSidebar />} {...props}>
    <SimpleList
      primaryText={record => record['pair:label']}
      secondaryText={record => (
        <>
          Date limite : <DateField record={record} source="pair:dueDate" showTime />
        </>
      )}
      leftAvatar={() => (
        <Avatar width="100%">
          <TaskIcon />
        </Avatar>
      )}
      linkType="show"
    />
  </List>
);

export default TaskList;
