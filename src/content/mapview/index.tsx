import { Box, Container, Card, Grid, Divider, Stack } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';

import MapboxCard from './MapboxCard';
import TodoCard from './TodoCard';
import DistCard from './DistCard';


function Mapview() {
  return (
    <>
      <Helmet>
        <title>Smart Map</title>
      </Helmet>

      <Grid container>
        <Grid item xs={3}>
          <Stack spacing={0}>
            <TodoCard />
            <DistCard />
          </Stack>
        </Grid>
        <Grid item xs={9}>
          <MapboxCard />
        </Grid>  
      </Grid>
    </>
  );
}

export default Mapview;
