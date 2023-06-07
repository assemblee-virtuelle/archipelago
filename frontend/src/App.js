import React from 'react';
import { Admin, Resource, memoryStore } from 'react-admin';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { LoginPage } from '@semapps/auth-provider';
import { BrowserRouter } from 'react-router-dom';

import HomePage from './HomePage';
import i18nProvider from './config/i18nProvider';
import authProvider from './config/authProvider';
import dataProvider from './config/dataProvider';
import theme from './config/theme';
import * as resources from './resources';

import Layout from './layout/Layout';

const App = () => (
  <StyledEngineProvider injectFirst>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Admin
          disableTelemetry
          title="Archipel"
          authProvider={authProvider}
          dataProvider={dataProvider}
          i18nProvider={i18nProvider}
          layout={Layout}
          theme={theme}
          loginPage={LoginPage}
          dashboard={HomePage}
          store={memoryStore()}
        >
          {Object.entries(resources).map(([key, resource]) => (
            <Resource key={key} name={key} {...resource.config} />
          ))}
        </Admin>
      </ThemeProvider> 
    </BrowserRouter>
  </StyledEngineProvider>
);

export default App;
