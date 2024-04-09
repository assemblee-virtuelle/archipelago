import React from 'react';
import { Admin, Resource, memoryStore } from 'react-admin';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { LoginPage } from '@semapps/auth-provider';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient } from 'react-query';

import HomePage from './HomePage';
import i18nProvider from './config/i18nProvider';
import authProvider from './config/authProvider';
import dataProvider from './config/dataProvider';
import config from './config';

import Layout from './layout/Layout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    },
  },
});

const App = () => (
  <StyledEngineProvider injectFirst>
    <BrowserRouter>
      <ThemeProvider theme={config.theme}>
        <Admin
          disableTelemetry
          title={config.title}
          authProvider={authProvider}
          dataProvider={dataProvider}
          i18nProvider={i18nProvider}
          layout={config.Layout || Layout}
          theme={config.theme}
          loginPage={config.LoginPage || LoginPage}
          dashboard={config.HomePage || HomePage}
          store={memoryStore()}
          queryClient={queryClient}
        >
          {Object.entries(config.resources).map(([key, resource]) => (
            <Resource key={key} name={key} {...resource.config} />
          ))}
        </Admin>
      </ThemeProvider>
    </BrowserRouter>
  </StyledEngineProvider>
);

export default App;
