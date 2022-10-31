import { Link, makeStyles, Button } from '@material-ui/core'

import * as React from 'react'


const useStyles = makeStyles({
  buttonWrapper: {
    background:"red",
    color:"black",
    "&:hover":"black",
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
