import React from 'react';
import { makeStyles } from "@material-ui/core";
import { linkToRecord, ReferenceField, Datagrid, TextField, EditButton, ShowButton, ImageField } from "react-admin";
import { AvatarWithLabelField } from '@semapps/field-components';
import { MultiViewsList, GridList } from '@semapps/list-components';
import { MapList } from '@semapps/geo-components';
import MapIcon from '@material-ui/icons/Map';
import ListIcon from '@material-ui/icons/List';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonFilterSidebar from './PersonFilterSidebar';
import List from "../../../../layout/list/List";

const useStyles = makeStyles(() => ({
  avatar: {
    width: 50,
    height: 50
  },
  smallColumn: {
    width: 50
  }
}));

const PersonList = props => {
  const classes = useStyles();
  return (
    <MultiViewsList
      ListComponent={List}
      aside={<PersonFilterSidebar />}
      views={{
        avatar: {
          label: 'Trombinoscope',
          icon: AccountCircleIcon,
          sort: { field: 'pair:lastName', order: 'DESC' },
          perPage: 500,
          pagination: false,
          list: (
            <GridList xs={2} linkType="show" externalLinks>
              <ReferenceField reference="Profile" source="url" link={(record, resource) => linkToRecord('/' + resource, record.url, 'show')}>
                <AvatarWithLabelField
                  label="vcard:given-name"
                  image="vcard:photo"
                  // defaultLabel={translate('app.user.unknown')}
                  labelColor="grey.300"
                />
              </ReferenceField>
            </GridList>
          )
        },
        list: {
          label: 'Liste',
          icon: ListIcon,
          sort: { field: 'pair:lastName', order: 'DESC' },
          perPage: 25,
          list: (
            <Datagrid>
              <ReferenceField reference="Profile" source="url" label="Photo"  headerClassName={classes.smallColumn} cellClassName={classes.smallColumn}>
                <ImageField source="vcard:photo" classes={{ image: classes.avatar }}/>
              </ReferenceField>
              <ReferenceField reference="Profile" source="url" label="Nom">
                <TextField source="vcard:given-name" />
              </ReferenceField>
              <ReferenceField reference="Profile" source="url" label="En deux mots">
                <TextField source="vcard:note" />
              </ReferenceField>
              <ShowButton />
              <EditButton />
            </Datagrid>
          )
        },
        map: {
          label: 'Carte',
          icon: MapIcon,
          perPage: 500,
          pagination: false,
          list: (
            <MapList
              latitude={record => record?.['pair:hasLocation']?.['pair:latitude']}
              longitude={record => record?.['pair:hasLocation']?.['pair:longitude']}
              label={record => record['pair:label']}
              description={record => record['pair:comment']}
              scrollWheelZoom
            />
          )
        }
      }}
      {...props}
    />
  );
}

export default PersonList;
