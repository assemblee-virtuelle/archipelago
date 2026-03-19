import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Autocomplete, Box, debounce, Grid, TextField, Typography } from '@mui/material';
import { CommonInputProps, FieldTitle, InputHelperText, useInput, useTranslate } from 'react-admin';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export type Location = {
  id: string;
  coordinates: [number, number];
  name: string;
  housenumber?: string;
  street?: string;
  city?: string;
  postcode?: string;
  country?: string;
};

type PhotonResult = {
  type: 'Feature';
  properties: {
    osm_type: 'W' | 'R' | 'N';
    osm_id: number;
    osm_key: string;
    osm_value: string;
    type: string;
    postcode: string;
    countrycode: string;
    housenumber: string;
    street: string;
    name?: string;
    city: string;
    county: string;
    state: string;
    country: string;
    extent?: [number, number, number, number];
  };
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
};

const getFullAddress = (l: Location) => [l.housenumber, l.street, l.postcode, l.city].filter((p) => p).join(' ');
const getInputName = (l: Location) => (l ? l.name : '');

type Props = CommonInputProps & {
  apiUrl?: string;
  apiParams?: { key: string; value: string }[];
};

const PhotonLocationInput = ({ source, label, helperText, format, parse, validate, apiUrl, apiParams }: Props) => {
  const {
    field,
    fieldState: { invalid, error },
    isRequired,
  } = useInput({ source, validate, format, parse });

  const translate = useTranslate();
  const [inputValue, setInputValue] = useState<string>(getInputName(field.value as Location));
  const [options, setOptions] = useState<Location[]>([]);
  const [serverError, setServerError] = useState(false);
  const previousValue = useRef<string>();

  useEffect(() => {
    if ((field.value as Location)?.id !== previousValue.current) {
      setInputValue(getInputName(field.value as Location));
    }
    previousValue.current = (field.value as Location)?.id;
  }, [field.value]);

  const fetchApi = useMemo(
    () =>
      debounce(async (text: string, callback: (results: PhotonResult[], error: boolean) => void) => {
        if (!apiUrl) {
          return callback([], true);
        }

        try {
          const params = new URLSearchParams();
          params.append('q', text);
          apiParams?.forEach((p) => params.append(p.key, p.value));
          const response = await fetch(`${apiUrl}?${params.toString()}`);

          if (!response.ok) {
            callback([], true);
            return;
          }

          const payload = (await response.json()) as { features: PhotonResult[] };

          callback(payload.features, false);
        } catch (err) {
          callback([], true);
        }
      }, 500),
    [apiUrl, apiParams],
  );

  useEffect(() => {
    if (inputValue === '') {
      setOptions([]);
      return undefined;
    }

    void fetchApi(inputValue, (results, error) => {
      setServerError(error);

      const fetchedIds: string[] = [];
      const opt: (Location | null)[] = results
        .map((result) => {
          const { osm_type, osm_id, name, housenumber, street, postcode, city, country } = result.properties;
          const locName = name ? name : [housenumber, street, postcode, city].filter((p) => p).join(' ');
          const locId = `${osm_type}${osm_id}`;

          // Results can contain duplicates, so we clean that here
          if (fetchedIds.includes(locId)) return null;
          fetchedIds.push(locId);

          return {
            id: locId,
            coordinates: result.geometry.coordinates,
            name: locName,
            housenumber,
            street,
            postcode,
            city,
            country,
          };
        })
        .filter((o) => o);

      setOptions(opt as Location[]);
    });
  }, [inputValue, fetchApi]);

  const photonErrorBox = <Box component="span" sx={{ color: 'warning.main' }}>Serveur d&apos;adresses injoignable</Box>;

  return (
    <Autocomplete
      options={options}
      fullWidth
      filterOptions={(option) => option}
      value={(field.value as Location) || null}
      inputValue={inputValue}
      renderInput={(params) => (
        <TextField
          {...params}
          onChange={(v) => setInputValue(v.target.value)}
          label={
            label !== '' && label !== false ? (
              <FieldTitle label={label} source={source} isRequired={isRequired} />
            ) : null
          }
          helperText={
            helperText !== false || invalid ? (
              <InputHelperText error={error?.message} helperText={serverError ? photonErrorBox : helperText} />
            ) : (
              ''
            )
          }
          error={invalid}
        />
      )}
      getOptionLabel={(option: Location) => getInputName(option)}
      renderOption={(props, option: Location) => {
        return (
          <li {...props} key={option.id}>
            <Grid container alignItems="center">
              <Grid item sx={{ marginRight: (theme) => theme.spacing(2) }}>
                <LocationOnIcon />
              </Grid>
              <Grid item xs>
                {option.name}
                <Typography variant="body2" color="textSecondary">
                  {getFullAddress(option)}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
      noOptionsText={serverError ? photonErrorBox : translate('ra.navigation.no_results')}
      onBlur={(event) => {
        if (inputValue !== '' && (field.value as Location)?.name !== inputValue) {
          setInputValue(getInputName(field.value as Location));
        }
        field.onBlur(event);
      }}
      isOptionEqualToValue={(opt, val) => opt.id === val?.id}
      onChange={(event: React.SyntheticEvent, newValue: Location | null) => {
        field.onChange(newValue);
      }}
      onInputChange={(e, v) => {
        // Reset field only if we clear the whole input
        if (v === '') {
          field.onChange(null);
        }
      }}
    />
  );
};

export default PhotonLocationInput;
