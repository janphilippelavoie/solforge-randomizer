import * as React from 'react'
import DeckTableContainer from '../containers/DeckTableContainer';
import FusedDeckBox from './FusedDeckBox';
import ButtonWrapper from './wrappers/ButtonWrapper';

/* const useStyles = makeStyles({

}); */



export default function DeckPage(props) {

    //props
    const { decks } = props;

    //state
    const [fused, setFused] = React.useState([]);

    function randomFused() {
        while (true) {
            let first_deck = decks[Math.floor((Math.random() * decks.length))]
            let second_deck = decks[Math.floor((Math.random() * decks.length))]
            if (first_deck.faction !== second_deck.faction) {
                setFused([first_deck, second_deck])
                return;
            }
        }
    }

    return (
        <>
            {fused.length > 0 && <FusedDeckBox fused={fused} />}
            <ButtonWrapper handleClick={randomFused}>Random Fused</ButtonWrapper>
            <DeckTableContainer decks={decks} />
        </>
    )
}





