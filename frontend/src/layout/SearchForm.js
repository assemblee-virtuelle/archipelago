import React, { useEffect, useMemo } from 'react';
import { useResourceDefinitions } from 'react-admin';
import { Grid, Select, MenuItem, TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import SearchIcon from '@mui/icons-material/Search';

const useStyles = makeStyles(theme => ({
  button: {
    color: 'black',
    borderColor: 'black',
  },
}));

const TypeSelect = (props) => {
  const resourceDefinitions = useResourceDefinitions();
  const resources = useMemo(() => Object.values(resourceDefinitions), [resourceDefinitions]);
  if (resources.length === 0) return null;
  return (
    <Select {...props}>
      {resources
        .filter(resource => resource.hasList || resource.name === props.value)
        .map(resource => (
          <MenuItem value={resource.name} key={resource.name}>
            {resource.options?.label}
          </MenuItem>
        ))}
    </Select>
  );
};

const SearchForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const location = useLocation();
  const matches = location.pathname.match(/^\/([^/]+)/);
  const type = matches ? matches[1] : 'Organization';

  let search = new URLSearchParams(location.search);
  const filter = (search && JSON.parse(search.get('filter'))) || {};

  const { register, setValue, control, handleSubmit } = useForm({
    defaultValues: {
      type,
      filter: filter.q
    }
  });

  // Reinitialize the form on page change
  useEffect(() => {
    setValue('type', type);
    setValue('filter', filter.q);
  }, [location.pathname, type, filter.q, setValue]);

  const onSubmit = ({ filter, type }) => {
    if (filter) {
      navigate(`/${type}?filter=${encodeURIComponent(`{"q": "${filter}"}`)}`);
    } else {
      navigate(`/${type}?filter=${encodeURIComponent(`{}`)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <TextField
            {...register("filter")}
            variant="standard"
            placeholder="Rechercher..."
            fullWidth
            className={classes.field}
          />
        </Grid>
        <Grid item xs={5}>
          <Controller
            name="type"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TypeSelect
                value={value}
                onChange={onChange}
                variant="standard"
                fullWidth
                className={classes.field}
              />
          )} 
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="outlined"
            type="submit"
            startIcon={<SearchIcon />}
            className={classes.button}
          >
            Rechercher
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SearchForm;
