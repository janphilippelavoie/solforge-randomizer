import * as React from 'react'
import DeckTable from '../components/DeckTable';

export default function FusedDeckTableContainer(props) {

    //props
    const { decks } = props
  
    
    const headers = [
      { id: "name", label: "Name", number: false },
      { id: "deck1", label: "First Deck", number: false },
      { id: "deck2", label: "Second Deck", number: false },
      { id: "hand", label: "Random Hand", number: false}
    ]
  
    function getRows() {
      return decks.map(deck => {
        return {
            "id": deck.id,
            "name": deck.name,
            "deck1": deck.decks[0].name,
            "deck1Id": deck.decks[0].id,
            "deck2": deck.decks[1].name,
            "deck2Id": deck.decks[1].id,
            "hand": deck.getRandomHand().map((card) => card.title).sort().join(", ")
          }
        });
    }
  
    return (
        <DeckTable 
          headers={headers}
          rows={getRows()}
          tableName="FusedDecks"
          deckType="fusedDeck"
        />
    )
  }
  