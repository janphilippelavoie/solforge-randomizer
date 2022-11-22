import * as React from 'react'
import FusedDeckTableContainer from '../containers/FusedDeckTableContainer';
import RandomHandBox from './RandomHandBox';

/* const useStyles = makeStyles({

}); */



export default function FusedDeckPage(props) {

    //props
    const { fusedDecks } = props;

    //state
    const [hand, setHand] = React.useState([]);

    function drawHand(deck) {
        setHand(deck.getRandomHand().map((card) => card.title).sort());
    }

    return (
        <>
            {hand.length > 0 && <RandomHandBox hand={hand} />}
            <FusedDeckTableContainer decks={fusedDecks} handleClick={drawHand}/>
        </>
    )
}

