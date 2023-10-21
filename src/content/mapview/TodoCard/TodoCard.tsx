import { Box, Container, Card, Divider, Stack } from '@mui/material';
import { useState, useCallback } from 'react';

import { styled } from '@mui/material/styles';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { DropResult } from 'react-beautiful-dnd';
import DraggableList from './DraggableList';
import { getSampleItems, reorder } from './helpers';

import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InboxIcon from '@mui/icons-material/Inbox';

import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';


const SortableItem = SortableElement(({value, index, onClickDeleteTodo}) => 
  <ListItem disablePadding 
    secondaryAction={
      <IconButton edge="end" aria-label="delete"
        style={{zIndex: 9999999}}
        onClick={e => {
          console.log( value?.id )
          if ( value?.id ) {
            onClickDeleteTodo?.(value.id);
          }
        }}
      >
        <DeleteIcon />
      </IconButton>
    }
  >
    <ListItemButton>
      <ListItemText 
        primary={'#'+value?.id +' ' +value?.company} 
        secondary={value?.lat + '  ' + value?.lon}
      />
    </ListItemButton>
  </ListItem>
);

const SortableList = SortableContainer(({items, onClickDeleteTodo}) => {
  return (
    <List>
      {items.map((value, index) => (
        <SortableItem key={`item-${value?.id}`} index={index} value={value} onClickDeleteTodo={onClickDeleteTodo}/>
      ))}
    </List>
  );
});

const TodoCard = ({items, setItems, onClickDeleteTodo}) => {

  const onSortEnd = useCallback( ({oldIndex, newIndex}) => {
    const list = arrayMoveImmutable(items, oldIndex, newIndex);
    setItems(list);
  }, [items]);

  return <>
    <Card sx={{ width: "100%", height: '50vh', borderRadius: 0, borderColor: "red", overflowY: "auto" }}>
      <CardContent>        
        <SortableList items={items} onSortEnd={onSortEnd} onClickDeleteTodo={onClickDeleteTodo}/>
      </CardContent>
      <CardActions> 
      </CardActions>
    </Card>
  </>;
}

export default TodoCard;