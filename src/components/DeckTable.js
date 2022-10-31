import { Box, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import * as React from 'react'
import DeckLink from './DeckLink';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function DeckTable(props) {
  const classes = useStyles();

  //props
  const decks = props.decks

  const CardType = {
    Creature: "Creature",
    Spell: "Spell"
  }

  function getDeckStats(deck) {
    let stats = Object.values(deck.cards).reduce((totals, card) => {
      console.log(totals)
      if (card.cardType === CardType.Creature) {
        totals.nbCreatures += 1
        totals.TotalAttackI += card.levels["1"].attack
        totals.TotalAttackII += card.levels["2"].attack
        totals.TotalAttackIII += card.levels["3"].attack
        totals.TotalHealthI += card.levels["1"].health
        totals.TotalHealthII += card.levels["2"].health
        totals.TotalHealthIII += card.levels["3"].health
      } else if (card.cardType === CardType.Spell) {
        totals.nbSpells += 1
      }
      return totals
    },
      {
        TotalAttackI: 0,
        TotalAttackII: 0,
        TotalAttackIII: 0,
        TotalHealthI: 0,
        TotalHealthII: 0,
        TotalHealthIII: 0,
        nbCreatures: 0,
        nbSpells: 0
      })
    return stats
  }

  function getFormattedAverage(total, count, decimals = 3) {
    return (total / count).toFixed(decimals)
  }


  function getRows(decks) {
    return props.decks.map(deck => {
      const deckStats = getDeckStats(deck)
      return (
        <TableRow key={deck.id}>
          <TableCell component="th" scope="row">
            <Box>
              {deck.name}<br />
              <DeckLink deckId={deck.id} />
            </Box>
          </TableCell>
          <TableCell component="th" scope="row">
            {deck.faction}
          </TableCell>
          <TableCell align="right">{getFormattedAverage(deckStats.TotalAttackI, deckStats.nbCreatures)}</TableCell>
          <TableCell align="right">{getFormattedAverage(deckStats.TotalAttackII, deckStats.nbCreatures)}</TableCell>
          <TableCell align="right">{getFormattedAverage(deckStats.TotalAttackIII, deckStats.nbCreatures)}</TableCell>
          <TableCell align="right">{getFormattedAverage(deckStats.TotalHealthI, deckStats.nbCreatures)}</TableCell>
          <TableCell align="right">{getFormattedAverage(deckStats.TotalHealthII, deckStats.nbCreatures)}</TableCell>
          <TableCell align="right">{getFormattedAverage(deckStats.TotalHealthIII, deckStats.nbCreatures)}</TableCell>
          <TableCell align="right">{deckStats.nbCreatures}</TableCell>
          <TableCell align="right">{deckStats.nbSpells}</TableCell>
        </TableRow>
      )
    })
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Faction</TableCell>
            <TableCell align="right">Average Attack (I)</TableCell>
            <TableCell align="right">Average Attack (II)</TableCell>
            <TableCell align="right">Average Attack (III)</TableCell>
            <TableCell align="right">Average HP (I)</TableCell>
            <TableCell align="right">Average HP (II)</TableCell>
            <TableCell align="right">Average HP (III)</TableCell>
            <TableCell align="right">Creatures</TableCell>
            <TableCell align="right">Spells</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getRows(props.decks)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}


