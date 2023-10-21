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
      return [ ...prevTodos, { 
        company: pinData.company,
        lat: pinData.lat,
        lon: pinData.lon,
      }]
    });
  }, []);

  const onClickDeleteTodo = useCallback((deleteIndex) => {
    setTodos(prevTodos => prevTodos.filter((value, index) => index !== deleteIndex));
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
            <DistCard items={todos} />
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
