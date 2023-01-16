import React, { useCallback, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useShowController, ShowContextProvider, useDataProvider, useNotify } from 'react-admin';
import { useHistory } from 'react-router-dom';
import PageShow from './resources/Page/PageShow';

const HomePage = () => {
  const dataProvider = useDataProvider();
  const history = useHistory();
  const notify = useNotify();

  const addUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const { webId } = jwtDecode(token);
      await dataProvider.create('Person', { id: webId });
      notify('Utilisateur ajouté à la base de donnée', 'info');
      history.push('/');
    }
  }, [dataProvider, history, notify])

  useEffect(() => {
    const searchParams = new URLSearchParams(history.location.search);
    if (searchParams.has('addUser')) {
      addUser();
    }
  }, [history, addUser])

  const config = {
    basePath: '/Page',
    id: process.env.REACT_APP_MIDDLEWARE_URL + 'pages/accueil',
    resource: 'Page'
  };

  return (
    <ShowContextProvider value={useShowController(config)}>
      <PageShow {...config} />
    </ShowContextProvider>
  );
};

export default HomePage;
