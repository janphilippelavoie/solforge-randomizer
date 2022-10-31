import { Box, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import * as React from 'react'
import DeckLink from './DeckLink'
import { visuallyHidden } from '@mui/utils'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function DeckTable(props) {
  const classes = useStyles();

  //props
  const { decks } = props

  //state
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');

  const CardType = {
    Creature: "Creature",
    Spell: "Spell"
  }

  const headers = [
    { id: "name", label: "Name", number: false },
    { id: "faction", label: "Faction", number: false },
    { id: "attackI", label: "Average Attack (I)", number: true },
    { id: "attackII", label: "Average Attack (II)", number: true },
    { id: "attackIII", label: "Average Attack (III)", number: true },
    { id: "healthI", label: "Average Health (I)", number: true },
    { id: "healthII", label: "Average Health (II)", number: true },
    { id: "healthIII", label: "Average Health (III)", number: true },
    { id: "creatures", label: "Creatures", number: true },
    { id: "spells", label: "Spells", number: true }
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
        "creatures": deckTotals.creatures,
        "spells": deckTotals.spells
      }
      })
  }

  function getFormattedAverage(total, count, decimals = 3) {
    return (total / count).toFixed(decimals)
  }

  function getTableRows() {
    const rows = getRows()
    return rows.sort(getComparator(order, orderBy)).map(row => {
      return (
        <TableRow key={row.id}>
          {headers.map(header => (
            <TableCell align={header.number ? "right" : "left"}>
              {row[header.id]}
              {header.id === "name" && <Box><br /><DeckLink deckId={row.id} /></Box>}
            </TableCell>
          ))}
        </TableRow>
      )
    })
  }

  function createSortHandler(event, property) {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map(header => (
              <TableCell align={header.number ? "right" : "left"}>
                <TableSortLabel
                  active={orderBy === header.id}
                  direction={orderBy === header.id ? order : 'asc'}
                  onClick={(event) => createSortHandler(event, header.id)}
                >
                  {header.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {getTableRows()}
        </TableBody>
      </Table>
    </TableContainer>
  )
}


