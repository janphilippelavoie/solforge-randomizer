import {Box, List, ListItem, ListItemText, Typography} from "@mui/material";
import * as React from "react";

export default function RandomHandBox(props) {

  const {hand} = props;

  return (
    <Box
      sx={{margin: 2, border: 2, width: "16%", borderColor: 'grey.500', bgcolor: 'background.paper', borderRadius: 6}}
      justifyContent="center">
      <List>
        <ListItem key='title'>
          <ListItemText>
            <Typography variant="h6">Your random hand:</Typography>
          </ListItemText>
        </ListItem>
        {hand.map(card => {
          return (
            <ListItem key={card}>
              <ListItemText primary={card}/>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}