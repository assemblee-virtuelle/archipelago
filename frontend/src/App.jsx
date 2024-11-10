import React from 'react';
import { Admin, Resource, memoryStore } from 'react-admin';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LoginPage } from '@semapps/auth-provider';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient } from 'react-query';

import HomePage from './HomePage';
import config from './config/config';
import i18nProvider from './config/i18nProvider';
import authProvider from './config/authProvider';
import dataProvider from './config/dataProvider';
import theme from './config/theme';
import resources from './resources';

import { Layout } from './common/layout';
import { LayoutProvider } from './layouts/LayoutProvider';

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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LayoutProvider layoutOptions={config.layout}>
          <Admin
            disableTelemetry
            title={config.title}
            authProvider={authProvider}
            dataProvider={dataProvider}
            i18nProvider={i18nProvider}
            layout={Layout}
            theme={theme}
            loginPage={LoginPage}
            dashboard={HomePage}
            store={memoryStore()}
            queryClient={queryClient}
          >
            {Object.entries(resources).map(([key, resource]) => (
              <Resource key={key} name={key} {...resource.config} />
            ))}
          </Admin>
        </LayoutProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StyledEngineProvider>
);

export default App;
