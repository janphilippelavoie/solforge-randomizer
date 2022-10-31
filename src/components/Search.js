import { Button, Container, CssBaseline, TextField } from "@mui/material"
import React, {useState} from "react"

export default function Search(props) {

  //state
  const [input, setInput] = useState()

  //props
  const fieldLabel = props.fieldLabel
  const buttonLabel = props.buttonLabel || "Search"
  const handleClick = props.handleClick
  return (
    <>
      <TextField label={fieldLabel} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => {if (e.key === 'Enter') handleClick(input) }} />
      <Button variant="contained" onClick={() => handleClick(input)}>{buttonLabel}</Button>
    </>
  )
}