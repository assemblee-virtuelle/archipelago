# Archipelago configuration

Your Archipelago deployment can be customized by overriding the `/frontend/src/config/config.ts` file.

The table below lists all configurable options:

| Property              | Type               | Default      | Description                                                                                                                                         |
|-----------------------|--------------------|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| `title`               | `string`           | **required** | Your app title displayed in the top bar
| `middlewareUrl`       | `string`           | **required** | Middleware API url (ex: https://<host>:<port>/). It should contain a trailing slash
| `mapboxAccessToken`   | `string`           | **required** | Mapbox Access Token used for addresses completion
| `importableResources` | array of `string`  | **required** | Lists resources which should display import tab in its creation form
| `layout`              | `LayoutOptions`    | **required** | UI layout configuration. See [layout configuration](./layouts.md)

To customize fully your deployment, you will need to override also the `/frontend/public/` folder to insert your own public assets, and the file `/frontend/index.html` for your HTML headers or if you need to insert further scripts.
