import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { ListItem, ListItemButton, ListItemIcon, ListItemText, Box } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';

export type DraggableListItemProps = {
  item: any;
  index: number;
};

const DraggableListItem = ({ item, index }: DraggableListItemProps) => { 
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => ( 
        // <ListItem disablePadding>
        //   <ListItemButton>
        //     <ListItemIcon>
        //       <InboxIcon />
        //     </ListItemIcon>
        //     <ListItemText primary={item.primary} />
        //   </ListItemButton>
        // </ListItem>
        <Box display={'block'} padding={2} style={{background: (snapshot.isDragging ? 'rgb(235,235,235)' : '')}}>
          {item.primary}
        </Box>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
