import { Box, Container, Card } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';
import Logo from 'src/components/LogoSign';
import MapboxCard from './MapboxCard';


function Mapview() {
  return (
    <>
      <Helmet>
        <title>Smart Map</title>
      </Helmet>
      <MapboxCard />
    </>
  );
}

export default Mapview;
