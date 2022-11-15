import {URIs} from "../Constants";
import {Deck} from "./Deck";
import {Collection} from "./Collection";

export default class DeckGateway {
    constructor() {
    }

    async getCollection(username) {
        let decks = await this.getDecks(username);
        let fusedDecks = await this.getFusedDecks(username);
        return new Collection(decks, fusedDecks);
    }

    async getDecks(username) {
        const response = await fetch(URIs.SolforgeAPI + `deck?pageSize=1000&inclCards=true&username=${username.toLowerCase()}`);
        
        let formattedData = this.formatDecks(await response.json());
        return formattedData;
    }

    async getFusedDecks(username) {
        return [];
    }

    formatDecks(apiData) {
        let decks = [];
        apiData.Items.forEach((apiDeck) => {
            decks.push(new Deck(apiDeck));
        })

        return decks;
    }
}