import { Box, Container, Card, Divider, Stack, Chip } from '@mui/material';
import { useState, useCallback } from 'react';

import { styled } from '@mui/material/styles';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InboxIcon from '@mui/icons-material/Inbox';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';

import getPreciseDistance from 'geolib/es/getPreciseDistance';

// index prop is not passed to ListItem
// It 's stopped to pass in SortableElement
// So I give listIndex
interface SortableItemProps {
  value: Task;
  meterToNext: number;
  isLastItem: boolean;
  onClickDeleteTodo: (deleteId: string) => void;
}

const SortableItem = SortableElement(({value, meterToNext, isLastItem, onClickDeleteTodo}: SortableItemProps) => 
  <>    
    <ListItem disablePadding 
      secondaryAction={
        <Button variant="outlined"
          size="small"
          style={{minWidth: "32px", padding: 5}}
          onClick={e => {
            onClickDeleteTodo?.(value?.id);
          }}
        >
          <DeleteIcon />
        </Button>
      }
    >
      <ListItemButton>
        <ListItemText 
          primary={value?.category} 
          secondary={<>
            <Box>
              <Typography color="primary">{value?.info}</Typography>
            </Box>
            <Stack direction={'row'} spacing={1}>
              {/* <Box>
                {value?.lat + '  ' + value?.lon} 
              </Box> */}
              
              {
                !isLastItem ? (                
                  <Box>
                    <Stack direction={'row'} >
                      <ArrowDownwardIcon fontSize="small"/> 
                      <Typography>{Number(meterToNext/1000).toFixed(1) + ' km'}</Typography>
                    </Stack>
                  </Box>
                ) : ""
              }
            </Stack>
          </>}
        />
      </ListItemButton>
    </ListItem>
  </>
);

const SortableList = SortableContainer(({items, onClickDeleteTodo}) => {
  return (
    <List>
      {items.map((value, index) => (<>
        <SortableItem 
          key={index} index={index} 
          value={value} 
          onClickDeleteTodo={onClickDeleteTodo}
          meterToNext={index < items.length - 1 ? 
            getPreciseDistance(
              { latitude: items[index].lat, longitude: items[index].lon },
              { latitude: items[index + 1].lat, longitude: items[index + 1].lon }
            ): 0
          }
          isLastItem={ index === items.length - 1}
        />
      </>))}
    </List>
  );
});

const TodoCard = ({items, setItems, onClickDeleteTodo}) => {

  const onSortEnd = useCallback( ({oldIndex, newIndex}) => {
    const list = arrayMoveImmutable(items, oldIndex, newIndex);
    setItems(list);
  }, [items]);

  return <>
    <Card sx={{ width: "100%", height: '100vh', borderRadius: 0, borderColor: "red", overflowY: "auto" }}>
      <CardContent>        
        <SortableList items={items} onSortEnd={onSortEnd} onClickDeleteTodo={onClickDeleteTodo}/>
      </CardContent>
      <CardActions> 
      </CardActions>
    </Card>
  </>;
}

export default TodoCard;