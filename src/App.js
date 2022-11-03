import { Box, Button, CssBaseline, List, ListItem, ListItemText, Typography } from '@mui/material';
import * as React from 'react';
import Search from './components/Search';
import DeckTable from './components/DeckTable'
import DeckLink from './components/DeckLink';
import ButtonWrapper from './components/ButtonWrapper';
import BoxStyles from './components/BoxWrapper';

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
      <Box sx={{margin: 2, border: 2, width: "16%", borderColor: 'grey.500', bgcolor: 'background.paper', borderRadius: 6}} justifyContent="center">
        <List>
          <ListItem>
            <ListItemText>
              <Typography variant="h6">Your random fused deck:</Typography>
            </ListItemText>
          </ListItem>
          {fused.map(deck => {
            return (
              <ListItem key={deck.id}>
                <ListItemText id={deck.id} primary={<DeckLink deckId={deck.id} deckName={deck.name} />} secondary={deck.faction} />
              </ListItem>
            )
          })}
        </List>
      </Box>
    )
  }

  return (
    <>
      <CssBaseline />
      <Search fieldLabel="Username" buttonLabel="Import" handleClick={handleSearchClick} />
      {decks.length > 0 && <DeckTable decks={decks} />}
      {fused.length > 0 && showFused()}
      {decks.length > 0 && <ButtonWrapper handleClick={randomFused}>Random Fused</ButtonWrapper>}

    </>
  )
}
