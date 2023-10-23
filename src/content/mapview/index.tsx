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
  const [todos, setTodos] = useState<Array<Task>>([]);

  const onClickMapPin = useCallback((task: Task) => {
    setTodos(prevTodos => {
      let alreadyExist = false;
      for(let i = 0; i < prevTodos.length; i++) {
        if ( prevTodos[i].id === task.id ) {
          alreadyExist = true; break;
        }
      }
      return alreadyExist ? prevTodos : [ ...prevTodos, task]
    });
  }, []);

  const onClickDeleteTodo = useCallback((deleteId: string) => {
    setTodos(prevTodos => prevTodos.filter((value: Task, index: number) => value.id !== deleteId));
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
            {/* <DistCard items={todos} /> */}
          </Stack>
        </Grid>
        <Grid item xs={9}>
          <MapboxCard onClickPin={onClickMapPin} todos={todos}/>
        </Grid>  
      </Grid>
    </MapviewWrapper>
  );
}

export default Mapview;
