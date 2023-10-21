import { Box, Container, Card, Grid, Divider, Stack } from '@mui/material';
import { useState, useCallback } from 'react';

import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';

import MapboxCard from './MapboxCard';
import TodoCard from './TodoCard/TodoCard';
import DistCard from './DistCard';

const MapviewWrapper = styled(Box)(
  () => `
    overflow: hidden; 
`
);

function Mapview() {
  const [todos, setTodos] = useState([]);

  const onClickMapPin = useCallback((pinData) => {
    setTodos(prevTodos => {
      // BEGIN assign_id
      let maxId = 0;
      for (let i = 0; i< prevTodos.length; i++) {
        if(maxId < prevTodos[i].id) {
          maxId = prevTodos[i].id;
        }
      } // END assign_id

      return [ ...prevTodos, {
        id: maxId + 1,
        company: pinData.company,
        lat: pinData.lat,
        lon: pinData.lon,
      }]
    });
  }, []);

  const onClickDeleteTodo = useCallback((deleteId) => {
    setTodos(prevTodos => prevTodos.filter((value, index) => value.id !== deleteId));
  }, []);

  return (
    <MapviewWrapper>
      <Helmet>
        <title>Smart Map</title>
      </Helmet>

      <Grid container>
        <Grid item xs={3}>
          <Stack spacing={0}>
            <TodoCard items={todos} setItems={setTodos} onClickDeleteTodo={onClickDeleteTodo} />
            <DistCard />
          </Stack>
        </Grid>
        <Grid item xs={9}>
          <MapboxCard onClickPin={onClickMapPin} />
        </Grid>  
      </Grid>
    </MapviewWrapper>
  );
}

export default Mapview;
