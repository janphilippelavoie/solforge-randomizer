import {Box, List, ListItem, ListItemText, Typography} from "@mui/material";
import DeckLink from "./DeckLink";
import * as React from "react";

export default function FusedDeckBox(props) {

  const {fused} = props
  return (
    <Box
      sx={{margin: 2, border: 2, width: "16%", borderColor: 'grey.500', bgcolor: 'background.paper', borderRadius: 6}}
      justifyContent="center">
      <List>
        <ListItem>
          <ListItemText>
            <Typography variant="h6">Your random fused deck:</Typography>
          </ListItemText>
        </ListItem>
        {fused.map(deck => {
          return (
            <ListItem key={deck.id}>
              <ListItemText
                id={deck.id}
                primary={<DeckLink deckId={deck.id} deckName={deck.name}/>}
                secondary={deck.faction}/>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}