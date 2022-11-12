import * as React from 'react'
import DeckTable from '../components/DeckTable';
import IconWrapper from "../components/wrappers/IconWrapper";
import {Typography} from "@mui/material";
import {ImagePaths, CardType, CreatureProperty} from "../Constants";



export default function DeckTableContainer(props) {

  //props
  const { decks } = props

  //state

  function headerIcons(label, imagePaths) {
    return (
      <>
        <IconWrapper path={imagePaths} />
        <Typography variant="inherit" sx={{ p: 0.2 }}>{label}</Typography>
      </>
    )
  }
  
  const headers = [
    { id: "name", label: "Name", number: false },
    { id: "faction", label: "Faction", number: false },
    { id: "attackI", label: headerIcons("Average Attack", ImagePaths.Level1), number: true },
    { id: "attackII", label: headerIcons("Average Attack", ImagePaths.Level2), number: true },
    { id: "attackIII", label: headerIcons("Average Attack", ImagePaths.Level3), number: true },
    { id: "healthI", label: headerIcons("Average Health", ImagePaths.Level1), number: true },
    { id: "healthII", label: headerIcons("Average Health", ImagePaths.Level2), number: true },
    { id: "healthIII", label: headerIcons("Average Health", ImagePaths.Level3), number: true },
    { id: "nbCreatures", label: "Creatures", number: true },
    { id: "nbSpells", label: "Spells", number: true }
  ]

  function getRows() {
    return decks.map(deck => {
      return {
          "id": deck.id,
          "name": deck.name,
          "faction": deck.faction,
          "attackI": getFormattedValue(deck.getAverageCreatureProperty(1, CreatureProperty.Attack)),
          "attackII": getFormattedValue(deck.getAverageCreatureProperty(2, CreatureProperty.Attack)),
          "attackIII": getFormattedValue(deck.getAverageCreatureProperty(3, CreatureProperty.Attack)),
          "healthI": getFormattedValue(deck.getAverageCreatureProperty(1, CreatureProperty.Health)),
          "healthII": getFormattedValue(deck.getAverageCreatureProperty(2, CreatureProperty.Health)),
          "healthIII": getFormattedValue(deck.getAverageCreatureProperty(3, CreatureProperty.Health)),
          "nbCreatures": deck.getNbCardsOfType(CardType.Creature),
          "nbSpells": deck.getNbCardsOfType(CardType.Spell)
        }
      });
  }

  function getFormattedValue(value, decimals = 3) {
    return (value).toFixed(decimals)
  }

  return (
      <DeckTable 
        headers={headers}
        rows={getRows()}
        tableName="HalfDecks"
      />
  )
}


