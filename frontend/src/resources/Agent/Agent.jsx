import React from 'react';
import { ShowBase } from 'react-admin';
import RedirectByType from "../../common/RedirectByType";

const AgentRedirect = props => (
  <ShowBase {...props}>
    <RedirectByType
      typesMap={{
        Person: 'pair:Person',
        Organization: 'pair:Organization',
        Event: 'pair:Event',
        Project: 'pair:Project'
      }}
    />
  </ShowBase>
);

const resource = {
  config: {
    show: AgentRedirect
  },
  dataModel: {
    types: ['pair:Project', 'pair:Organization', 'pair:Person', 'pair:Group', 'pair:Event'],
    list: {
      servers: '@default',
      fetchContainer: true,
    }
  }
};

export default resource;
