import { Link } from '@material-ui/core'
import * as React from 'react'



export default function DeckLink(props) {

  //props
  const { deckId } = props

  return (
      <Link variant="subtitle4" href={"https://solforgefusion.com/decks/" + deckId} target="_blank">Link</Link>
  )
}


