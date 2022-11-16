import * as React from 'react'
import DeckTable from '../components/DeckTable';

export default function FusedDeckTableContainer(props) {

    //props
    const { decks } = props
  
    
    const headers = [
      { id: "name", label: "Name", number: false }
    ]
  
    function getRows() {
      return decks.map(deck => {
        return {
            "id": deck.id,
            "name": deck.name
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
  