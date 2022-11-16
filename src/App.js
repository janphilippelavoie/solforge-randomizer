import { CssBaseline } from '@mui/material';
import * as React from 'react';

// Components
import LandingPage from './components/LandingPage';
import CollectionPage from './components/CollectionPage';

// Services
import DeckGateway from './data/DeckGateway';
import { Collection } from './data/Collection';

export function App() {
  //state
  const [collection, setCollection] = React.useState(new Collection())
 
  const deckGateway = new DeckGateway();

  function handleSearchClick(username) {
    deckGateway.getCollection(username).then(loadedCollection => setCollection(loadedCollection));
  }

  return (
    <>
      <CssBaseline />

      {collection.getDecks().length === 0 ? <LandingPage handleSearchClick={handleSearchClick} /> : <CollectionPage handleSearchClick={handleSearchClick} collection={collection} />}
    </>
  )
}
