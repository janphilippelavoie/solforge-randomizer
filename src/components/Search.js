import { ClassNames } from "@emotion/react";
import { Box, Button, Container, CssBaseline, TextField } from "@mui/material"
import React, { useState } from "react"
import ButtonWrapper from "./ButtonWrapper"


export default function Search(props) {

  //state
  const [input, setInput] = useState()

  //props
  const fieldLabel = props.fieldLabel
  const buttonLabel = props.buttonLabel || "Search"
  const handleClick = props.handleClick
  return (
    <>
      <Box sx={{ m: 3, display: 'flex', }}>
        <TextField label={fieldLabel} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => { if (e.key === 'Enter') handleClick(input) }} />
        <ButtonWrapper handleClick={() => handleClick(input)}>{buttonLabel}</ButtonWrapper> 
      </Box>
    </>
  )
}