/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PageShow from './resources/Page/PageShow';
import config from './config';
import { Button, Container, Link, Stack, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const DefaultHomePage = () => {
  return (
    <Container>
      <Typography variant="h3" textAlign="center" mt={4} mb={4}>
        Bienvenue sur Archipelago !
      </Typography>
      <Typography component="p" textAlign="center">
        Pour personnaliser cette page d'accueil, vous pouvez créer une page nommée "accueil" en vous inscrivant{' '}
        <Link href="/login?signup=true">ici</Link>, puis en cliquant <Link href="/Page/create">ici</Link>.
      </Typography>

      <Typography component="p" textAlign="center">
        Vous pouvez aussi personnaliser cette page d'accueil via la configuration d'Archipelago en modifiant le fichier{' '}
        <code>/frontend/src/config.ts</code>.
      </Typography>

      <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', mt: 4 }}>
        <Button
          component={Link}
          variant="contained"
          startIcon={<GitHubIcon />}
          href="https://github.com/assemblee-virtuelle/archipelago"
          target="_blank"
        >
          Dépôt Github
        </Button>
        <Button
          component={Link}
          variant="contained"
          startIcon={<MenuBookIcon />}
          href="https://github.com/assemblee-virtuelle/archipelago/tree/master/docs"
          target="_blank"
        >
          Documentation
        </Button>
      </Stack>
    </Container>
  );
};

const HomePage = () => {
  return (
    <PageShow
      id={config.middlewareUrl + 'pages/accueil'}
      resource="Page"
      redirectOnError={false}
      render={({ isPending, error }: { isPending: boolean; error: boolean}) => {
        if (!isPending && error) {
          return <DefaultHomePage />;
        }

        return <PageShow id={config.middlewareUrl + 'pages/accueil'} resource="Page" />;
      }}
    />
  );
};

export default HomePage;
