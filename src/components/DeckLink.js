import { Link } from '@material-ui/core'
import * as React from 'react'



export default function DeckLink(props) {

  //props
  const { deckId, deckName } = props

  return (
      <Link variant="subtitle2" href={"https://solforgefusion.com/decks/" + deckId} target="_blank">{deckName}</Link>
  )
}


