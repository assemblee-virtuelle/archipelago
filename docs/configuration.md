# Archipelago configuration

Your Archipelago deployment can be customized by overriding the `/frontend/src/config.ts` file.

The table below lists all configurable options:

| Property              | Type               | Default           | Description                                                                                                                                         |
|-----------------------|--------------------|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| `title`               | `string`           | **required**      | Your app title displayed in the top bar
| `middlewareUrl`       | `string`           | **required**      | Middleware API url (ex: https://<host>:<port>/). It should contain a trailing slash
| `mapboxAccessToken`   | `string`           | **required**      | Mapbox Access Token used for addresses completion
| `importableResources` | array of `string`  | **required**      | Lists resources which should display import tab in its creation form
| `layout`              | `LayoutOptions`    | **required**      | UI layout configuration. See [layout configuration](./layouts.md)
| `theme`               | `function`         | default theme     | Customizes app theme. Function is of type (baseTheme: MuiTheme) => MuiTheme
| `HomePage`            | `React component`  | default homePage  | React component to override default home page
| `LoginPage`           | `React component`  | default loginPage | React component to override default login page
| `resources`           | `function`         | default resources | Customizes app resources. Function is of type (baseResources) => customizedResources

To customize fully your deployment, you will need to override also the `/frontend/public/` folder to insert your own public assets, and the file `/frontend/index.html` for your HTML headers or if you need to insert further scripts.

## Theme customization

To customize default app theme, you can use the `theme` attribute as mentionned above. In your configuration, you will need to add the following:

```typescript
import { createTheme, Theme } from '@mui/material';

const config: ConfigInterface = {
  ...

  theme: (baseTheme: Theme) => createTheme(baseTheme, {
    // You can override any of the MUI theme attributes below
    palette: {
      primary: { main: '#F00' },
    },
  }),

  ...
}
```

## Resources customization

To customize default app resources, you can use the `resources` attribute as mentionned above. In your configuration, you will need to add the following:

```typescript
import MyCustomOrganizationEditPage from './custom/MyCustomOrganizationEditPage.tsx';

const config: ConfigInterface = {
  ...

  resources: (baseResources) => {
    const customizedResources = { ...baseResources };

    // Example 1: Change "Organization" to "Structure" wording
    customizedResources['Organization'].translations.fr.name = 'Structure |||| Structures';

    // Exemple 2: Customize resource edition page
    customizedResources['Organization'].config.edit = MyCustomOrganizationEditPage;

    return customizedResources;
  },

  ...
}
```
