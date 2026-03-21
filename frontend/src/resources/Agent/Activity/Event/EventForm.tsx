import React from 'react';
import { TextInput, required, ImageField, minValue, useTranslate, CommonInputProps } from 'react-admin';
import { ImageInput } from '@semapps/input-components';
import { Stack } from '@mui/material';
import { useWatch } from 'react-hook-form';
import { ActorsInput, DateTimeInput, LocationInput } from '../../../../common/input';
import DropDownTreeSelect from '../../../../common/input/DropdownTreeSelect/DropdownTreeSelect';
import MarkdownInput from '../../../../common/input/MarkdownInput';
import LargeLabel from '../../../../common/list/MainList/LargeLabel';
import { PairEventRecord } from './index';

const EndDateInput = ({ source, helperText }: Pick<CommonInputProps, 'source' | 'helperText'>) => {
  const startDate = useWatch<PairEventRecord, 'pair:startDate'>({ name: 'pair:startDate' });
  const translate = useTranslate();

  return (
    <DateTimeInput
      source={source}
      disablePast
      helperText={helperText}
      minDateTime={new Date(startDate)}
      validate={[minValue(startDate, translate('resources.Event.fields.validators.pair:endDate.minValue'))]}
    />
  );
};

const EventForm = () => {
  const translate = useTranslate();

  const translateHelper = (field: string) => translate(`resources.Event.fields.helpers.${field}`, { _: '' });

  return (
    <>
      <LargeLabel>{translate('resources.Event.form.basicInformation')}</LargeLabel>
      <TextInput source="pair:label" fullWidth validate={[required()]} helperText={translateHelper('pair:label')} />
      <Stack direction="row" useFlexGap spacing={2}>
        <DateTimeInput
          source="pair:startDate"
          validate={[required()]}
          disablePast
          helperText={translateHelper('pair:startDate')}
        />
        <EndDateInput source="pair:endDate" helperText={translateHelper('pair:endDate')} />
      </Stack>
      <LocationInput source="pair:hasLocation" fullWidth helperText={translateHelper('pair:hasLocation')} />

      <LargeLabel>{translate('resources.Event.form.description')}</LargeLabel>
      <TextInput source="pair:comment" fullWidth helperText={translateHelper('pair:comment')} />
      <MarkdownInput source="pair:description" helperText={translateHelper('pair:description')} />

      <LargeLabel>{translate('resources.Event.form.other')}</LargeLabel>
      <ActorsInput
        source="pair:involves"
        helperText={translateHelper('pair:involves')}
      />
      <DropDownTreeSelect
        source="pair:hasTopic"
        reference="Theme"
        labelKey="pair:label"
        parentKey="pair:broader"
        multiple
        helperText={translateHelper('pair:hasTopic')}
      />
      <TextInput
        source="pair:aboutPage"
        fullWidth
        helperText={translateHelper('pair:aboutPage')}
      />
      <ImageInput source="image" accept={{ 'image/*': ['.png', '.jpg'] }}>
        <ImageField source="src" />
      </ImageInput>
    </>
  );
};

export default EventForm;
