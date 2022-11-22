import {Deck} from './Deck';
import shuffle from '../utils/Shuffler';

export class FusedDeck {
    // Interface

    // id : string
    // name: string
    // deckIds: string[]
    // decks: Deck

    constructor(apiFusedDeck) {
        this.id = apiFusedDeck.id;
        this.name = apiFusedDeck.name;
        this.deckIds = apiFusedDeck.myDecks.map((apiDeck) => apiDeck.id);
    }

    linkDecks(deckMap) {
        this.decks = this.deckIds.map((deckId) => deckMap.get(deckId));
    }

    getRandomShuffle() {
        const cards = this.decks[0].cards.concat(this.decks[1].cards);
        return shuffle(cards);
    }

    getRandomHand() {
        return this.getRandomShuffle().slice(0, 5);
    }
}