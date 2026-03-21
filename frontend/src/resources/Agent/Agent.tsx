import React from 'react';
import { ShowBase, ShowBaseProps } from 'react-admin';
import RedirectByType from "../../common/RedirectByType";

export type PairLocation = {
  type: 'pair:Place';
  'pair:label': string;
  'pair:hasPostalAddress'?: {
    type: 'pair:PostalAddress';
    'pair:addressCountry'?: string;
    'pair:addressLocality'?: string;
    'pair:addressStreet'?: string;
    'pair:addressZipCode'?: string;
  };
  'pair:latitude': number;
  'pair:longitude': number;
};

const AgentRedirect = (props: ShowBaseProps) => (
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
