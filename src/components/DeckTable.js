import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import * as React from 'react'
import DeckLink from "./DeckLink";
import FusedDeckLink from "./FusedDeckLink";


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

/**
 *
 * @param {*} props
 * props.headers
 * @returns
 */
export default function DeckTable(props) {
  const classes = useStyles();

  //props
  const { headers, rows, tableName, deckType = 'deck' } = props

  //state
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');

  function createSortHandler(event, property) {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }

  function getCell(header, row) {
    if (header.id === 'name') {
      if (deckType === 'deck') {
        return <DeckLink deckId={row.id} deckName={row[header.id]} />;
      } else if (deckType === 'fusedDeck') {
        return <FusedDeckLink deckId={row.id} deckName={row[header.id]} />;
      }
    }
    
    return row[header.id];
  }

  function getSortedTableRows() {
    return rows.sort(getComparator(order, orderBy)).map(row => {
      return (
          <TableRow key={row.id}>
            {headers.map(header => (
                <TableCell align={header.number ? "right" : "left"}>
                  {getCell(header, row)}
                </TableCell>
            ))}
          </TableRow>
      )
    })
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
      <Table className={classes.table} aria-label={tableName}>
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
          {getSortedTableRows()}
        </TableBody>
      </Table>
    </TableContainer>
  )
}


