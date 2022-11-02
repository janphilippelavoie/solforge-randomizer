import { Link, makeStyles, Button } from '@material-ui/core'
import { spacing } from "@material-ui/system";

import * as React from 'react'


const useStyles = makeStyles({
  buttonWrapper: {
    background: "#797d9e",
    color: "white",
    margin: 10,
    fontWeight: "bold",
    '&:hover': {
      backgroundColor: '#36454F',
    },
  },

});


export default function ButtonWrapper(props) {
  const classes = useStyles();

  //props
  const { children, handleClick } = props
  return (
    <Button variant="contained" className={classes.buttonWrapper} onClick={handleClick}>{children}</Button>
  )
}
