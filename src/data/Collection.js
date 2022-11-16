export class Collection {
    // Interface
    // decks : Map of id -> Deck
    // fusedDecks: Map of id -> FusedDeck

    constructor(decks = [], fusedDecks = []) {
        this.decks = this.createMap(decks);
        this.fusedDecks = this.createMap(fusedDecks);
        this.linkDecks();
    }

    getDecks() {
        return Array.from(this.decks.values());
    }

    getFusedDecks() {
        return Array.from(this.fusedDecks.values());
    }

    getDeck(id) {
        return this.decks.get(id);
    }

    getFusedDeck(id) {
        return this.fusedDecks.get(id);
    }

    createMap(decks) {
        let map = new Map();
        for(const deck of decks) {
            map.set(deck.id, deck);
        }
        return map;
    }

    linkDecks() {
        for(const fusedDeck of this.getFusedDecks()) {
            fusedDeck.linkDecks(this.decks);
        }
    }
}