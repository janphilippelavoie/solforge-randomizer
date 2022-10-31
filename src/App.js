import { Button, CssBaseline, List, ListItem, ListItemText } from '@mui/material';
import * as React from 'react';
import Search from './components/Search';
import DeckTable from './components/DeckTable'

export function App() {
  //state
  const [decks, setDecks] = React.useState([])
  const [fused, setFused] = React.useState([])

  function handleSearchClick(username) {
    fetch('https://ul51g2rg42.execute-api.us-east-1.amazonaws.com/main/deck/?pageSize=1000&inclCards=true&username=' + username)
      .then(response => response.json())
      .then(data => setDecks(data.Items))
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
              <ListItemText id={deck.id} primary={`${deck.name} (${deck.faction})`} secondary={`https://solforgefusion.com/decks/${deck.id}`} />
            </ListItem>
          )

        })}
      </List>
    )
  }

  return (
    <>
      <CssBaseline />
      <Search fieldLabel="Username" buttonLabel="Import" handleClick={handleSearchClick} />
      {decks.length > 0 && <DeckTable decks={decks} />}
      {fused.length > 0 && showFused()}
      {decks.length > 0 && <Button onClick={randomFused}>Random Fused</Button>}

    </>
  )
}
