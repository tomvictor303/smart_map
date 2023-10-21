import { Box, Container, Card, Divider } from '@mui/material';
import { useState } from 'react';

import { styled } from '@mui/material/styles';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { DropResult } from 'react-beautiful-dnd';
import DraggableList from './DraggableList';
import { getSampleItems, reorder } from './helpers';

const TodoCard = () => {
  const [items, setItems] = useState(getSampleItems());

  const onDragEnd = ({ destination, source }: DropResult) => {
    // dropped outside the list
    if (!destination) return;

    const newItems = reorder(items, source.index, destination.index);

    setItems(newItems);
  };
  
  return (
    <Card sx={{ width: "100%", height: '50vh', borderRadius: 0, borderColor: "red" }}>
      <CardContent>        
        <DraggableList items={items} onDragEnd={onDragEnd} />
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default TodoCard;