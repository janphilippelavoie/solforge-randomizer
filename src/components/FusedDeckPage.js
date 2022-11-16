import * as React from 'react'
import FusedDeckTableContainer from '../containers/FusedDeckTableContainer';

/* const useStyles = makeStyles({

}); */



export default function FusedDeckPage(props) {

    //props
    const { fusedDecks } = props;

    return (
        <>
            <FusedDeckTableContainer decks={fusedDecks} />
        </>
    )
}

