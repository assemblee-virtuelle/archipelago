/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { extractContext, LocationInput as SemAppsLocationInput } from '@semapps/geo-components';
import config from '../../config';
import PhotonLocationInput, { Location } from './location/PhotonLocationInput';
import { CommonInputProps } from 'react-admin';

type PairLocation = {
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

type MapBoxValue = {
  place_name: string;
  center: [number, number];
  place_type: string;
  text: string;
  address: string;
  context: { id: string; text: string };
};

const LocationInput = (props: CommonInputProps) => {
  if (config.geocoder.type === 'photon') {
    return (
      <PhotonLocationInput
        {...props}
        apiUrl={config.geocoder.url}
        apiParams={config.geocoder.params}
        format={(value: PairLocation | null): Location | null => {
          return value
            ? {
                id: `${value['pair:latitude']}-${value['pair:longitude']}`,
                coordinates: [value['pair:longitude'], value['pair:latitude']],
                name: value['pair:label'],
                street: value['pair:hasPostalAddress']?.['pair:addressStreet'],
                city: value['pair:hasPostalAddress']?.['pair:addressLocality'],
                postcode: value['pair:hasPostalAddress']?.['pair:addressZipCode'],
                country: value['pair:hasPostalAddress']?.['pair:addressCountry'],
              }
            : null;
        }}
        parse={(value: Location | null): PairLocation | null => (value ? {
          type: 'pair:Place',
          'pair:label': value.name,
          'pair:longitude': value.coordinates[0],
          'pair:latitude': value.coordinates[1],
          'pair:hasPostalAddress': {
            type: 'pair:PostalAddress',
            'pair:addressLocality': value.city,
            'pair:addressStreet': [value.housenumber, value.street].join(' '),
            'pair:addressZipCode': value.postcode,
            'pair:addressCountry': value.country,
          },
        } : null)}
      />
    );
  }

  return (
    <SemAppsLocationInput
      mapboxConfig={{
        access_token: config.geocoder.accessToken,
        types: ['place', 'address'],
        country: ['fr', 'be', 'ch'],
      }}
      parse={(value: MapBoxValue) => ({
        type: 'pair:Place',
        'pair:label': value.place_name,
        'pair:longitude': value.center[0],
        'pair:latitude': value.center[1],
        'pair:hasPostalAddress': {
          type: 'pair:PostalAddress',
          'pair:addressLocality': value.place_type[0] === 'place' ? value.text : extractContext(value.context, 'place'),
          'pair:addressStreet': value.place_type[0] === 'address' ? [value.address, value.text].join(' ') : undefined,
          'pair:addressZipCode': extractContext(value.context, 'postcode'),
          'pair:addressCountry': extractContext(value.context, 'country'),
        },
      })}
      optionText={(resource: PairLocation) => resource['pair:label']}
      {...props}
    />
  );
};

export default LocationInput;
