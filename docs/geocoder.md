# Geocoding configuration

Two geocoders are supported by Archipelago. They can be selected by the mandatory `geocoder.type` option in the configuration file.

## Mapbox

[Mapbox](https://www.mapbox.com/geocoding) requires an access token to work. Only addresses can be fetched with this geocoder.

The following configuration uses the environment variable `VITE_MAPBOX_ACCESS_TOKEN` to store the token:

```js
geocoder: {
  type: 'mapbox',
  accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
},
```

## Photon

[Photon](https://photon.komoot.io/) is an open-source and free geocoder. Many options can be added to customize results.

The minimal configuration for Photon is the following, requiring only the Photon server url. Environnement variable `VITE_PHOTON_URL` is used to store the url:

```js
geocoder: {
  type: 'photon',
  url: import.meta.env.VITE_PHOTON_URL,
}
```

Options can be provided into the `params` key. See [Photon docs](https://github.com/komoot/photon/blob/master/docs/api-v1.md) for all the options.

```js
geocoder: {
  type: 'photon',
  url: import.meta.env.VITE_PHOTON_URL,
  params: [
    { key: 'lang', value: 'fr' },
    { key: 'bbox', value: '-2.688904,46.781255,-0.672913,47.870302' },
    { key: 'lon', value: '-1.5541362' },
    { key: 'lat', value: '47.2186371' },
    { key: 'zoom', value: '10' },
    { key: 'location_bias_scale', value: '0' },
    { key: 'osm_tag', value: 'place' },
    { key: 'osm_tag', value: 'amenity' },
    { key: 'osm_tag', value: 'office' },
  ],
}
```

### Custom Photon serveer

Default demo Photon server can be accessed at `https://photon.komoot.io/api`. It should be used for fair usage only, with no garantees.

If you want to use your own Photon server, you can use the following Docker-compose file (from [photon-docker](https://github.com/rtuszik/photon-docker)):

```yaml
services:
  photon:
    image: rtuszik/photon-docker:2.1.1
    environment:
      - FORCE_UPDATE=FALSE
      - LOG_LEVEL=INFO
      - UPDATE_STRATEGY=SEQUENTIAL
      - UPDATE_INTERVAL=30d # Check for updates every 30 days
      - REGION=fr # Optional: specific region (continent, country, or planet)
      - PHOTON_PARAMS=-cors-any
    volumes:
        - photon_data:/photon/data
    restart: unless-stopped
    ports:
        - "2322:2322"
volumes:
   photon_data:
```

Approximatively 7Gb are required for storing France addresses.
