import { Button, List, ListItem, ListItemText } from '@mui/material';
import * as React from 'react';
import Search from './componenents/Search';

export function App() {
  //state
  const [decks, setDecks] = React.useState([])
  const [fused, setFused] = React.useState([])

  function handleSearchClick(username) {
    fetch('https://ul51g2rg42.execute-api.us-east-1.amazonaws.com/main/deck/?pageSize=1000&inclCards=true&username=' + username)
      .then(response => response.json())
      .then(data => setDecks(data.Items))
  }

  function listDecks() {
    return (
      <>
        <Button onClick={randomFused}>Random Fused</Button>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {decks.map((deck) => {
            const labelId = `checkbox-list-label-${deck.id}`;

            return (
              <ListItem
                key={deck.id}
              // secondaryAction={
              //   <IconButton edge="end" aria-label="comments">
              //     <CommentIcon />
              //   </IconButton>
              // }
              // disablePadding
              >
                <ListItemText id={labelId} primary={deck.name} />
              {/* <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
              //   <ListItemIcon>
              //     <Checkbox
              //       edge="start"
              //       checked={checked.indexOf(value) !== -1}
              //       tabIndex={-1}
              //       disableRipple
              //       inputProps={{ 'aria-labelledby': labelId }}
              //     />
              //   </ListItemIcon>
              //   <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
              // </ListItemButton> */}
              </ListItem>
            )
          })}
        </List>
      </>
    )
  }

  function randomFused() {
    while (true) {
      let first_deck = decks[Math.floor((Math.random() * decks.length))]
      let second_deck = decks[Math.floor((Math.random() * decks.length))]
      if (first_deck.faction !== second_deck.faction) {
        setFused([first_deck, second_deck])
        return
      }
    }
  }

  function showFused() {
    return (
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {fused.map(deck => {
          return (
            <ListItem key={deck.id}>
              <ListItemText id={deck.id} primary={deck.name} secondary={`https://solforgefusion.com/decks/${deck.id}`} />
            </ListItem>
          )

        })}
      </List>
    )
  }

  return (
    <>
      <Search fieldLabel="Username" buttonLabel="Import" handleClick={handleSearchClick} />
      {fused.length > 0 && showFused()}
      {decks.length > 0 && listDecks()}

    </>
  )
}
