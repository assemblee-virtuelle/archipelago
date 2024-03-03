import React from 'react';
import { Show } from 'react-admin';
import PanToolIcon from '@mui/icons-material/PanTool';
import RedirectByType from "../../../common/RedirectByType";

const ActivityRedirect = props => (
  <Show {...props}>
    <RedirectByType
      typesMap={{
        Project: 'pair:Project',
        Event: 'pair:Event',
        Task: 'pair:Task'
      }}
    />
  </Show>
);

const resource = {
  config: {
    show: ActivityRedirect,
    icon: PanToolIcon,
    options: {
      label: 'Activités'
    }
  },
  dataModel: {
    types: ['pair:Project', 'pair:Event', 'pair:Task'],
    list: {
      servers: '@default',
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Activité |||| Activités'
    }
  }
};

export default resource;
