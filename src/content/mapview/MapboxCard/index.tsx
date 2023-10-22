import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useState, useMemo, useEffect } from 'react';
// mapbox
import Map, { Marker, Popup, NavigationControl, FullscreenControl, ScaleControl, GeolocateControl } from 'react-map-gl';
import MapboxClient from '@mapbox/mapbox-sdk/lib/classes/mapi-client';
import GeocodingService, { GeocodeFeature, GeocodeRequest } from '@mapbox/mapbox-sdk/services/geocoding';
import mapboxgl, { Coordinate } from 'mapbox-gl';
(mapboxgl as any).workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

import ControlPanel from './control-panel';
import Pin from './Pin';
import CLUSTERS from './clusters.json';

const TOKEN = process.env.REACT_APP_MAPBOX_API_TOKEN; // Set your mapbox token here

function MapboxCard({ onClickPin }) {
  const [popupInfo, setPopupInfo] = useState(null);
  const [tasks, setTasks] = useState<Array<Task>>([]);

  useEffect(() => {
    let list: Array<Task> = [];

    // BEGIN clusters_load
    for (let i = 0; i < CLUSTERS.length; i++) {
      let cluster = CLUSTERS[i];

      let { lat, lon } = cluster;
      let point_size = cluster.yard_radius * 200;
      let point_color = 
        cluster.devices < 5 ? "#6838ad":
        cluster.devices < 10 ? "blue":
        cluster.devices < 15 ? "orange": "red"
      let tooltip_info = `${cluster.company} : ${cluster.devices} devices`

      list.push({
        id: 'clusters_' + i,
        title: cluster.company,
        category: cluster.company,
        lat,
        lon,
        point_size,
        point_color,
        tooltip_info,
      });
    } // END clusters_load
    setTasks(list);
  }, []);

  const pins = useMemo(
    () =>
      tasks.map((task, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={task.lon}
          latitude={task.lat}
          anchor="bottom"
          onClick={e => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            onClickPin(task);
            // setPopupInfo(cluster);
          }}
        >
          <Pin 
            size={task.point_size} color={task.point_color}
            tooltipText={task.tooltip_info}
          />
        </Marker>
      )),
    [tasks]
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
