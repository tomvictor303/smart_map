import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useState, useMemo } from 'react';
// mapbox
import Map, { Marker, Popup, NavigationControl, FullscreenControl, ScaleControl, GeolocateControl } from 'react-map-gl';
import MapboxClient from '@mapbox/mapbox-sdk/lib/classes/mapi-client';
import GeocodingService, { GeocodeFeature, GeocodeRequest } from '@mapbox/mapbox-sdk/services/geocoding';
import mapboxgl, { Coordinate } from 'mapbox-gl';
// (mapboxgl as any).workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

import ControlPanel from './control-panel';
import Pin from './Pin';
import CLUSTERS from './clusters.json';

const TOKEN = process.env.REACT_APP_MAPBOX_API_TOKEN; // Set your mapbox token here

function MapboxCard({ onClickPin }) {
  const [popupInfo, setPopupInfo] = useState(null);

  const pins = useMemo(
    () =>
      CLUSTERS.map((cluster, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={cluster.lon}
          latitude={cluster.lat}
          anchor="bottom"
          onClick={e => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            onClickPin(cluster);
            // setPopupInfo(cluster);
          }}
        >
          <Pin radius={cluster.yard_radius} deviceCount={cluster.devices}/>
        </Marker>
      )),
    []
  );

  return (
    <>
      <Map
        initialViewState={{
          latitude: 40,
          longitude: -100,
          zoom: 3.5,
          bearing: 0,
          pitch: 0
        }}
        // mapStyle="mapbox://styles/mapbox/dark-v9"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={TOKEN}
            style={{ height: "100vh", width: "100%" }}
      >
        <GeolocateControl position="top-right" />
        <FullscreenControl position="top-right" />
        <NavigationControl position="top-right" />
        <ScaleControl position="bottom-right" />

        {pins}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              {popupInfo.city}, {popupInfo.state} |{' '}
              <a
                target="_new"
                href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
              >
                Wikipedia
              </a>
            </div>
            <img width="100%" src={popupInfo.image} />
          </Popup>
        )}
      </Map>

      {/* <ControlPanel /> */}
    </>
  );
}

export default MapboxCard;
