import React from 'react';
import { Admin, Resource, memoryStore } from 'react-admin';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LoginPage } from '@semapps/auth-provider';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';

import HomePage from './HomePage';
import config from './config';
import i18nProvider from './config/i18nProvider';
import authProvider from './config/authProvider';
import dataProvider from './config/dataProvider';
import baseTheme from './config/theme';
import baseResources from './resources';

import { Layout } from './common/layout';
import { LayoutProvider } from './layouts/LayoutProvider';
import { Avatar, Button } from '@mui/material';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    },
  },
});

const theme = config.theme?.(baseTheme) || baseTheme;
const resources = config.resources?.(baseResources) || baseResources;

const Login = () => <LoginPage buttons={[<Button key="lescommuns" startIcon={<Avatar src="/lescommuns.jpg" />}>Les Communs</Button>]} />

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
            loginPage={config.LoginPage || LoginPage} // FIXME:
            dashboard={config.HomePage || HomePage}
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
