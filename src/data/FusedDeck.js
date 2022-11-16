import {Deck} from './Deck';

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
}