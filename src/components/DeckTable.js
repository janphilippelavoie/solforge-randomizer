import { Box, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import * as React from 'react'
import DeckLink from './DeckLink'
import { visuallyHidden } from '@mui/utils'
import IconWrapper from './IconWrapper';
import { Typography } from '@mui/material';
import { Paths } from './Constants';


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

  function headerIcons(label, ImagePaths) {
    return <><IconWrapper path={path}></IconWrapper> <Typography variant="inherit" sx={{ p: 0.2 }}>{label}</Typography></>
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

  function getTableRows() {
    const rows = getRows()
    return rows.sort(getComparator(order, orderBy)).map(row => {
      return (
        <TableRow key={row.id}>
          {headers.map(header => (
            <TableCell align={header.number ? "right" : "left"}>
              {header.id === 'name' ? <DeckLink deckId={row.id} deckName={row[header.id]} /> : row[header.id]}
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
    const isNumber = headers.find(header => header.id === orderBy).number
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy, isNumber)
      : (a, b) => -descendingComparator(a, b, orderBy, isNumber);
  }

  function descendingComparator(a, b, orderBy, isNumber) {
    const aValue = isNumber ? Number(a[orderBy]) : a[orderBy]
    const bValue = isNumber ? Number(b[orderBy]) : b[orderBy]
    if (bValue < aValue) {
      return -1;
    }
    if (bValue > aValue) {
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


