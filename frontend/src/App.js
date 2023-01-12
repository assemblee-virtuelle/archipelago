import React from 'react';
import { Admin, Resource } from 'react-admin';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import StylesProvider from '@mui/styles/StylesProvider';
import { LoginPage } from '@semapps/auth-provider';
import { createBrowserHistory as createHistory } from 'history';

import HomePage from './HomePage';
import i18nProvider from './config/i18nProvider';
import authProvider from './config/authProvider';
import dataProvider from './config/dataProvider';
import theme from './config/theme';
import * as resources from './resources';

import Layout from './layout/Layout';

const history = createHistory();

const App = () => (
  <StylesProvider injectFirst>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Admin
          disableTelemetry
          history={history}
          title="Archipel"
          authProvider={authProvider}
          dataProvider={dataProvider}
          i18nProvider={i18nProvider}
          layout={Layout}
          theme={theme}
          loginPage={LoginPage}
          dashboard={HomePage}
        >
          {Object.entries(resources).map(([key, resource]) => (
            <Resource key={key} name={key} {...resource.config} />
          ))}
        </Admin>
      </ThemeProvider>
    </StyledEngineProvider>
  </StylesProvider>
);

export default App;
