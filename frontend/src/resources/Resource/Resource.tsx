import React from 'react';
import { Show, ShowBaseProps } from 'react-admin';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import RedirectByType from "../../common/RedirectByType";

const ResourceRedirect = (props: ShowBaseProps) => (
  <Show {...props}>
    <RedirectByType typesMap={{ Skill: 'pair:Skill' }} />
  </Show>
);

const resource = {
  config: {
    show: ResourceRedirect,
    icon: NaturePeopleIcon,
    options: {
      label: 'Ressources'
    }
  },
  dataModel: {
    types: ['pair:Skill'],
    list: {
      servers: '@default',
      fetchContainer: true,
    }
  },
  translations: {
    fr: {
      name: 'Ressource |||| Ressources'
    }
  }
};

export default resource;
