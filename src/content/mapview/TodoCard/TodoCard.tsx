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


const SortableItem = SortableElement(({value}) => 
  <ListItem disablePadding 
    secondaryAction={
      <IconButton edge="end" aria-label="delete">
        <DeleteIcon />
      </IconButton>
    }
  >
    <ListItemButton>
      <ListItemText 
        primary={value?.company} 
        secondary={value?.lat + '  ' + value?.lon}
      />
    </ListItemButton>
    <ListItemButton> 
    </ListItemButton>
  </ListItem>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <List>
      {items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value} />
      ))}
    </List>
  );
});

const TodoCard = ({items, setItems}) => {

  const onSortEnd = useCallback( ({oldIndex, newIndex}) => {
    const list = arrayMoveImmutable(items, oldIndex, newIndex);
    setItems(list);
  }, [items]);

  return <>
    <Card sx={{ width: "100%", height: '50vh', borderRadius: 0, borderColor: "red", overflowY: "auto" }}>
      <CardContent>        
        <SortableList items={items} onSortEnd={onSortEnd} />
      </CardContent>
      <CardActions> 
      </CardActions>
    </Card>
  </>;
}

export default TodoCard;