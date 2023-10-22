import { Box, Container, Card, Divider, Stack } from '@mui/material';
import { useState, useCallback } from 'react';

import { styled } from '@mui/material/styles';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InboxIcon from '@mui/icons-material/Inbox';

import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';

// index prop is not passed to ListItem
// It 's stopped to pass in SortableElement
// So I give listIndex
interface SortableItemProps {
  value: Task;
  onClickDeleteTodo: (deleteId: string) => void;
}

const SortableItem = SortableElement(({value, onClickDeleteTodo}: SortableItemProps) => 
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
        primary={value?.title} 
        secondary={value?.lat + '  ' + value?.lon}
      />
    </ListItemButton>
  </ListItem>
);

const SortableList = SortableContainer(({items, onClickDeleteTodo}) => {
  return (
    <List>
      {items.map((value, index) => (<>
        <SortableItem key={index} index={index} value={value} onClickDeleteTodo={onClickDeleteTodo}/>
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