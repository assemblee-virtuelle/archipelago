import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { Show } from 'react-admin';
import RedirectByType from "../../../common/RedirectByType";

const ActorRedirect = props => (
  <Show {...props}>
    <RedirectByType typesMap={{ Person: 'pair:Person', Organization: 'pair:Organization' }} />
  </Show>
);

const resource = {
  config: {
    show: ActorRedirect,
    icon: PersonIcon,
    options: {
      label: 'Acteurs'
    }
  },
  dataModel: {
    types: ['pair:Organization', 'pair:Person', 'pair:Group'],
    list: {
      servers: '@default',
      fetchContainer: true,
    }
  },
  translations: {
    fr: {
      name: 'Acteur |||| Acteurs'
    }
  }
};

export default resource;
