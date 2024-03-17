import React from 'react';
import { useShowController, ShowContextProvider } from 'react-admin';
import PageShow from './resources/Page/PageShow';
import config from './config/config';

const HomePage = () => {
  const showConfig = {
    id: config.middlewareUrl + 'pages/accueil',
    resource: 'Page'
  };

  return (
    <ShowContextProvider value={useShowController(showConfig)}>
      <PageShow {...showConfig} />
    </ShowContextProvider>
  );
};

export default HomePage;
