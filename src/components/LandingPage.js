import { makeStyles } from '@material-ui/core';
import { Box } from '@mui/system';
import * as React from 'react'
import Search from './Search';

const useStyles = makeStyles({
    box: {
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        minHeight:"100vh",
        flexDirection:"column",
        
        "& body":{
            marginBottom: 10,
        }
    }
});

export default function LandingPage(props) {

    //props
    const { handleSearchClick } = props
    const classes = useStyles();


    return (
        <>
            <Box className={classes.box}>
                <h1>Welcome to Solforge Manager!</h1>
                <h3> Solforge Manager is community driven projet to help players manager their collection and find their best decks </h3>
                <body> Simply enter your username below to import your decks. A "random fused" option is available to add spice in your life. </body>
                <body> This tool is in early Alpha, and is being continuously improved. Features that aren't available might be available tomorrow! </body>
                <body> We welcome all thoughts, comments, suggestions and offers of help! We can be found on Discord at GreatDantone#8379 or Nasreddin#1506</body>
                <Box>
                    <Search fieldLabel="Username" buttonLabel="Import" handleSearchClick={handleSearchClick} />
                </Box>
            </Box>
        </>
    )
}



