import { Link } from '@material-ui/core'
import * as React from 'react'
import {URIs} from "../Constants";



export default function DeckLink(props) {

  //props
  const { deckId, deckName } = props

  return (
    <Link variant="subtitle2" href={ URIs.SolforgeSite + "fused/" + deckId} target="_blank">{deckName}</Link>
  )
}


