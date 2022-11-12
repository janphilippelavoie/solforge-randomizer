import { CssBaseline } from '@mui/material';
import * as React from 'react';

// Components
import LandingPage from './components/LandingPage';
import DeckPage from './components/DeckPage';

// Services
import DeckGateway from './data/DeckGateway';

export function App() {
  //state
  const [decks, setDecks] = React.useState([])
 
  const deckGateway = new DeckGateway();

  function handleSearchClick(username) {
    deckGateway.getDecks(username).then(loadedDecks => setDecks(loadedDecks));
  }

  return (
    <>
      <CssBaseline />

      {decks.length === 0 ? <LandingPage handleSearchClick={handleSearchClick} /> : <DeckPage handleSearchClick={handleSearchClick} decks={decks} />}
    </>
  )
}
