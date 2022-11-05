import { Box, CssBaseline, List, ListItem, ListItemText, Typography } from '@mui/material';
import * as React from 'react';
import Search from './components/Search';
import DeckLink from './components/DeckLink';
import ButtonWrapper from './components/wrappers/ButtonWrapper';
import DeckTableContainer from './containers/DeckTableContainer';
import {URIs} from "./Constants";
import FusedDeck from "./components/FusedDeck";

export function App() {

  //state
  const [decks, setDecks] = React.useState([])
  const [fused, setFused] = React.useState([])

  function handleSearchClick(username) {
    fetch(URIs.SolforgeAPI + `deck?pageSize=1000&inclCards=true&username=${username}`)
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


  return (
    <>
      <CssBaseline />
      <Search fieldLabel="Username" buttonLabel="Import" handleClick={handleSearchClick} />
      {fused.length > 0 && <FusedDeck fused={fused} />}
      {decks.length > 0 && <ButtonWrapper handleClick={randomFused}>Random Fused</ButtonWrapper>}
      {decks.length > 0 && <DeckTableContainer decks={decks} />}
    </>
  )
}
