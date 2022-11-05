import * as React from 'react'
import DeckTable from '../components/DeckTable';
import IconWrapper from "../components/wrappers/IconWrapper";
import {Typography} from "@mui/material";
import {ImagePaths} from "../Constants";



export default function DeckTableContainer(props) {

  //props
  const { decks } = props

  //state


  const CardType = {
    Creature: "Creature",
    Spell: "Spell"
  }


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
      let deckTotals = Object.values(deck.cards).reduce((totals, card) => {
        if (card.cardType === CardType.Creature) {
          totals.nbCreatures += 1
          totals.totalAttackI += card.levels["1"].attack
          totals.totalAttackII += card.levels["2"].attack
          totals.totalAttackIII += card.levels["3"].attack
          totals.totalHealthI += card.levels["1"].health
          totals.totalHealthII += card.levels["2"].health
          totals.totalHealthIII += card.levels["3"].health
        } else if (card.cardType === CardType.Spell) {
          totals.nbSpells += 1
        }
        return totals
      },
        {
          totalAttackI: 0,
          totalAttackII: 0,
          totalAttackIII: 0,
          totalHealthI: 0,
          totalHealthII: 0,
          totalHealthIII: 0,
          nbCreatures: 0,
          nbSpells: 0
        })
      return {
        "id": deck.id,
        "name": deck.name,
        "faction": deck.faction,
        "attackI": getFormattedAverage(deckTotals.totalAttackI, deckTotals.nbCreatures),
        "attackII": getFormattedAverage(deckTotals.totalAttackII, deckTotals.nbCreatures),
        "attackIII": getFormattedAverage(deckTotals.totalAttackIII, deckTotals.nbCreatures),
        "healthI": getFormattedAverage(deckTotals.totalHealthI, deckTotals.nbCreatures),
        "healthII": getFormattedAverage(deckTotals.totalHealthII, deckTotals.nbCreatures),
        "healthIII": getFormattedAverage(deckTotals.totalHealthIII, deckTotals.nbCreatures),
        "nbCreatures": deckTotals.nbCreatures,
        "nbSpells": deckTotals.nbSpells
      }
      })
  }

  function getFormattedAverage(total, count, decimals = 3) {
    return (total / count).toFixed(decimals)
  }


  return (
      <DeckTable 
        headers={headers}
        rows={getRows()}
        tableName="HalfDecks"
      />
  )
}


