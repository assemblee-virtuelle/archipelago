import React, { useEffect, useMemo } from 'react';
import { useResourceDefinitions } from 'react-admin';
import { Select, MenuItem, TextField, Button, Box, Stack, IconButton, SelectProps } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { ResourceOptions } from './TreeMenu/TreeMenu';

type Fields = {
  filter: string;
  type: string;
};

const TypeSelect = (props: SelectProps) => {
  const resourceDefinitions = useResourceDefinitions<ResourceOptions>();
  const resources = useMemo(() => Object.values(resourceDefinitions), [resourceDefinitions]);

  if (resources.length === 0) return null;

  return (
    <Select {...props}>
      {resources
        .filter((resource) => resource.hasList || resource.name === props.value)
        .map((resource) => (
          <MenuItem value={resource.name} key={resource.name}>
            {resource.options?.label}
          </MenuItem>
        ))}
    </Select>
  );
};

const SearchForm = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const matches = location.pathname.match(/^\/([^/]+)/);
  const type = matches ? matches[1] : 'Organization';

  const search = new URLSearchParams(location.search);
  const filter = (search && (JSON.parse(search.get('filter') || '{}') as { q?: string })) || {};

  const { register, setValue, control, handleSubmit } = useForm<Fields>({
    defaultValues: {
      type,
      filter: filter.q,
    },
  });

  // Reinitialize the form on page change
  useEffect(() => {
    setValue('type', type);
    setValue('filter', filter.q || '');
  }, [location.pathname, type, filter.q, setValue]);

  const onSubmit: SubmitHandler<Fields> = ({ filter, type }) => {
    if (filter) {
      navigate(`/${type}?filter=${encodeURIComponent(`{"q": "${filter}"}`)}`);
    } else {
      navigate(`/${type}?filter=${encodeURIComponent(`{}`)}`);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" spacing={2}>
        <TextField
          {...register('filter')}
          variant="standard"
          placeholder="Rechercher..."
          sx={{
            flex: 1,
            '.MuiInput-input': {
              color: 'primary.contrastText',
            },
          }}
        />
        <Controller
          name="type"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TypeSelect
              value={value}
              onChange={onChange}
              variant="standard"
              sx={{
                flex: 1,
                '.MuiInput-input': {
                  color: 'primary.contrastText',
                },
              }}
            />
          )}
        />
        <Button
          variant="outlined"
          type="submit"
          startIcon={<SearchIcon />}
          sx={{
            display: { xs: 'none', md: 'inline-flex' },
            color: 'primary.contrastText',
            borderColor: alpha('#000', 0.42),
            '&:hover': {
              borderColor: alpha('#000', 0.8),
            },
          }}
        >
          Rechercher
        </Button>
        <IconButton sx={{ display: { xs: 'inline-flex', md: 'none' }, color: 'primary.contrastText' }}>
          <SearchIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default SearchForm;
