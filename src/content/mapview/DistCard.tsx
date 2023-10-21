import { Box, Container, Card, Divider } from '@mui/material';

import { styled } from '@mui/material/styles';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import getPreciseDistance from 'geolib/es/getPreciseDistance';

const DistCard = ({ items }) => {
  const list = [];
  for (let i = 0; i < items.length - 1; i++) {  
    list.push(getPreciseDistance(
      { latitude: items[i].lat, longitude: items[i].lon },
      { latitude: items[i + 1].lat, longitude: items[i + 1].lon }
    ));
  }

  return (<>
    <Card sx={{ width: "100%", height: '50vh', borderRadius: 0, borderColor: "red", overflowY: "auto" }}>
      <Divider />
      <CardContent> 
        {list.map((value, index) => (<>            
          <Box textAlign={'right'} marginBottom={1}>
            <Typography >
              {Number(value/1000).toFixed(1) + ' km'}
            </Typography>
          </Box>
        </>))} 
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  </>);
};

export default DistCard;