import { CssBaseline } from '@mui/material';
import * as React from 'react';
import {URIs} from "./Constants";
import LandingPage from './components/LandingPage';
import DeckPage from './components/DeckPage';

export function App() {

  //state
  const [decks, setDecks] = React.useState([])
 

  function handleSearchClick(username) {
    fetch(URIs.SolforgeAPI + `deck?pageSize=1000&inclCards=true&username=${username.toLowerCase()}`)
      .then(response => response.json())
      .then(data => setDecks(data.Items))
  }

  return (
    <>
      <CssBaseline />

      {decks.length === 0 ? <LandingPage handleSearchClick={handleSearchClick} /> : <DeckPage handleSearchClick={handleSearchClick} decks={decks} />}
    </>
  )
}
