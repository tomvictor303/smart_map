import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useState, useMemo, useEffect, useCallback } from 'react';
// mapbox
import Map, { Marker, Popup, NavigationControl, FullscreenControl, ScaleControl, GeolocateControl } from 'react-map-gl';
import MapboxClient from '@mapbox/mapbox-sdk/lib/classes/mapi-client';
import GeocodingService, { GeocodeFeature, GeocodeRequest } from '@mapbox/mapbox-sdk/services/geocoding';
import mapboxgl, { Coordinate } from 'mapbox-gl';
(mapboxgl as any).workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

import ControlPanel from './control-panel';
import Pin from './Pin';
import CLUSTERS from './clusters.json';
import DEVICES from './devices.json';

const TOKEN = process.env.REACT_APP_MAPBOX_API_TOKEN; // Set your mapbox token here

export interface MapboxCardProps {
  todos: Array<Task>;
  onClickPin: (task: Task) => void;
}

function MapboxCard({ todos, onClickPin }: MapboxCardProps) {
  const [popupInfo, setPopupInfo] = useState(null);
  const [tasks, setTasks] = useState<Array<Task>>([]);

  useEffect(() => {
    let list: Array<Task> = [];

    let params: any = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop as string),
    });

    if (!params.dataset || params.dataset === 'clusters') {
      // BEGIN clusters_dataset_load
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
          category: cluster.geo_fence,
          lat,
          lon,
          point_size,
          point_color,
          tooltip_info,
        });
      } // END clusters_dataset_load
    } 
    else if (params.dataset === 'devices') {
      // BEGIN devices_dataset_load
      for (let i = 0; i < DEVICES.length; i++) {
        let device = DEVICES[i];

        let dll = device["Last Location"] ?? "";
        dll = dll.replace("http://www.google.com/maps/place/", "");
        let lat = Number (dll);
        let lon = Number(device['Location']);
        if (isNaN(lat) || isNaN(lon)) continue;
        
        let device_type = device['Device Type'];

        let point_size = 10;
        let point_color = 
          device_type === "smart_tractor" ? "red":
          device_type === "shaker" ? "blue":
          device_type === "weed_sprayer" ? "orange": "#6838ad"
        let tooltip_info = `${device['DEVICE_NAME']} (${device['Alias']}) : ${device_type} `

        list.push({
          id: 'devices_' + i,
          title: `${device['DEVICE_NAME']} (${device['Alias']})`,
          category: device_type,
          lat,
          lon,
          point_size,
          point_color,
          tooltip_info,
        });
      } // END devices_dataset_load
    }
    
    setTasks(list);
  }, []);

  const onClickMarker = useCallback((task) => {
    // setTasks(prevTasks => {
    //   let nextTasks = [...prevTasks];
    //   for (let i = 0; i < nextTasks.length; i++) {
    //     if (nextTasks[i].id === task.id)
    //       nextTasks[i].selected = true;
    //   }
    //   return nextTasks;
    // });
    onClickPin(task);
  }, []);

  const checkIfSelected = useCallback((task: Task): boolean => {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === task.id)
        return true;
    }
    return false;
  }, [todos]);

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
            onClickMarker(task);
            // setPopupInfo(cluster);
          }}
        >
          <Pin 
            size={task.point_size} color={task.point_color}
            tooltipText={task.tooltip_info}
            selected={checkIfSelected(task)}
          />
        </Marker>
      )),
    [tasks, todos, onClickMarker, checkIfSelected]
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
        // mapStyle="mapbox://styles/mapbox/streets-v9"
        // mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
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
