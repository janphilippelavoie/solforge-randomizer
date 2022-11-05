import { Box, TextField } from "@mui/material"
import React, { useState } from "react"
import ButtonWrapper from "./wrappers/ButtonWrapper"


export default function Search(props) {

  //state
  const [input, setInput] = useState()

  //props
  const { fieldLabel, buttonLabel = "Search", handleSearchClick } = props
  
  return (
    <>
      <Box sx={{ m: 3, display: 'flex', }}>
        <TextField label={fieldLabel} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => { if (e.key === 'Enter') handleSearchClick(input) }} />
        <ButtonWrapper handleClick={() => handleSearchClick(input)}>{buttonLabel}</ButtonWrapper> 
      </Box>
    </>
  )
}