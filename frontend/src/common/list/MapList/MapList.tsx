import React, { useState } from 'react';
import { useListContext, RecordContextProvider, RaRecord } from 'react-admin';
import { useSearchParams } from 'react-router-dom';
import { useMediaQuery, Box, useTheme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import CircularProgress from '@mui/material/CircularProgress';
import 'leaflet-defaulticon-compatibility';
import { LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import MarkerClusterGroup from './MarkerClusterGroup';
import DefaultPopupContent from './DefaultPopupContent';
import QueryStringUpdater from './QueryStringUpdater';
import MobileDrawer from './MobileDrawer';

const useStyles = makeStyles(() => ({
  isLoading: {
    zIndex: 1000,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

type Props = {
  latitude: (record: RaRecord) => number;
  longitude: (record: RaRecord) => number;
  label: (record: RaRecord) => string;
  description: (record: RaRecord) => string;
  popupContent?: () => JSX.Element | null;
  height?: number;
  center?: LatLngExpression;
  zoom?: number;
  groupClusters?: boolean;
  boundToMarkers?: boolean;
  connectMarkers?: boolean;
  scrollWheelZoom?: boolean;
};

const MapList = ({
  latitude,
  longitude,
  label,
  description,
  popupContent = DefaultPopupContent,
  height = 700,
  center = [47, 2.213749],
  zoom = 6,
  groupClusters = true,
  boundToMarkers = false,
  connectMarkers = false,
  scrollWheelZoom = false,
  ...otherProps
}: Props) => {
  const { data, isPending, isLoading } = useListContext<RaRecord>();

  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });

  const [drawerRecord, setDrawerRecord] = useState<RaRecord>();

  const classes = useStyles();

  // Get the zoom and center from query string, if available
  const [searchParams] = useSearchParams();
  const queryLat = parseFloat(searchParams.get('lat') || '');
  const queryLng = parseFloat(searchParams.get('lng') || '');
  const queryZoom = parseInt(searchParams.get('zoom') || '', 10);

  center = !isNaN(queryLat) && !isNaN(queryLng) ? [queryLat, queryLng] : center;
  zoom = !isNaN(queryZoom) ? queryZoom : zoom;

  let previousRecord: RaRecord;

  const records =
    isPending || isLoading || !data
      ? []
      : data
          .map((record) => ({
            ...record,
            latitude: latitude(record),
            longitude: longitude(record),
            label: label(record),
            description: description(record),
          }))
          .filter((record) => record.latitude && record.longitude);

  const bounds: LatLngBoundsExpression | undefined =
    boundToMarkers && records.length > 0 ? records.map((record) => [record.latitude, record.longitude]) : undefined;

  // Do not display anything if the bounds are not ready, otherwise the MapContainer will not be initialized correctly
  if (boundToMarkers && !bounds) return null;

  const markers = records.map((record, i) => {
    const marker = (
      <React.Fragment key={i}>
        <Marker
          position={[record.latitude, record.longitude]}
          eventHandlers={
            xs
              ? {
                  click: () => setDrawerRecord(record),
                }
              : undefined
          }
        >
          {!xs && (
            <Popup>
              <RecordContextProvider value={record}>{React.createElement(popupContent)}</RecordContextProvider>
            </Popup>
          )}
        </Marker>
        {connectMarkers && previousRecord && (
          <Polyline
            positions={[
              [previousRecord.latitude, previousRecord.longitude],
              [record.latitude, record.longitude],
            ]}
          />
        )}
      </React.Fragment>
    );

    // Save record so that we can trace lines
    previousRecord = record;

    return marker;
  });

  return (
    <MapContainer
      style={{ height }}
      center={!boundToMarkers ? center : undefined}
      zoom={!boundToMarkers ? zoom : undefined}
      maxBounds={bounds}
      scrollWheelZoom={scrollWheelZoom}
      {...otherProps}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {isLoading && (
        <Box alignItems="center" className={classes.isLoading}>
          <CircularProgress size={60} thickness={6} />
        </Box>
      )}
      {groupClusters ? <MarkerClusterGroup showCoverageOnHover={false}>{markers}</MarkerClusterGroup> : markers}
      {/* {markers} */}
      <QueryStringUpdater />

      <RecordContextProvider
        value={drawerRecord}
      >
        <MobileDrawer popupContent={popupContent} onClose={() => setDrawerRecord(undefined)} />
      </RecordContextProvider>
    </MapContainer>
  );
};

export default MapList;
