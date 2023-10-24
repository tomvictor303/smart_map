import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useState, useMemo, useEffect, useCallback } from 'react';
// mapbox
import Map, { Marker, Popup, NavigationControl, FullscreenControl, ScaleControl, GeolocateControl, Source, Layer } from 'react-map-gl';
import MapboxClient from '@mapbox/mapbox-sdk/lib/classes/mapi-client';
import GeocodingService, { GeocodeFeature, GeocodeRequest } from '@mapbox/mapbox-sdk/services/geocoding';
import mapboxgl, { CircleLayer, Coordinate, LineLayer } from 'mapbox-gl';
import type {FeatureCollection} from 'geojson';
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

  const initialViewState = {
    latitude: 40,
    longitude: -100,
    zoom: 3.5,
    bearing: 0,
    pitch: 0
  };
  const [viewState, setViewState] = useState(initialViewState);
  const [markerLabelVisible, setMarkerLabelVisible] = useState<boolean>(false);

  useEffect(() => {
    let list: Array<Task> = [];

    let params: any = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop as string),
    });

    if (!params.dataset || params.dataset === 'clusters') {
      // BEGIN clusters_dataset_load
      for (let i = 0; i < CLUSTERS.length; i++) {
        let task = { 
          ...CLUSTERS[i],
          id: 'clusters_' + i,
        }; 

        task.marker_size = task.marker_size * 2;
        list.push(task);
      } // END clusters_dataset_load
    } 
    else if (params.dataset === 'devices') {
      // BEGIN devices_dataset_load
      for (let i = 0; i < DEVICES.length; i++) {
        let task = { 
          ...DEVICES[i],
          id: 'devices_' + i,
        }; 

        task.marker_size = task.marker_size * 2;
        list.push(task);
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
      tasks.map((task: Task, index: number) => (
        <Marker
          key={`marker-${index}`}
          longitude={task.lon}
          latitude={task.lat}
          anchor="center"
          onClick={e => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            onClickMarker(task);
            // setPopupInfo(cluster);
          }}
        >
          <Pin 
            size={task.marker_size} color={task.marker_color}
            tooltipText={task.tool_tip}
            labelText={task.label}
            labelVisible={markerLabelVisible}
            selected={checkIfSelected(task)}
          />
        </Marker>
      )),
    [tasks, todos, markerLabelVisible, onClickMarker, checkIfSelected]
  );

  useEffect(() => {
    setMarkerLabelVisible( viewState.zoom >= 10 ); // For performance, we do not pass ViewState directly into pin memo dependency.
  }, [ viewState.zoom ]);

  const lineData: FeatureCollection = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: todos.map((todo, index) => [todo.lon, todo.lat])
        },
        properties: {}
      }
    ]
  };
  
  const layerStyle: LineLayer = {
    id: 'line-line-data',
    type: 'line',
    paint: {
    'line-width': 2,
    'line-color': '#ffffff'
    }
  };

  return (
    <>
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
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
        
        
        <Source id="my-data" type="geojson" data={lineData}>
          <Layer {...layerStyle} />
        </Source>
        
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
