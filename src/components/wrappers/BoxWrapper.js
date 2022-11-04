import { makeStyles } from '@material-ui/core';
import { Box } from '@mui/system';
import * as React from 'react'

const useStyles = makeStyles({
    smallRoundedBox: {
        margin: 2,
        border: 2,
        width: "16%",
        borderColor: 'grey.500',
        bgcolor: 'background.paper',
        borderRadius: 6
    }
});

export default function BoxStyles(props) {
    const classes = useStyles()
    // props
    const { style } = props

    return (
        <Box className={classes.SmallRoundedBox} justifyContent="center"></Box>
    )
}