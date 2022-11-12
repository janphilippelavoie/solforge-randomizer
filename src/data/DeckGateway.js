import {URIs} from "../Constants";
import {Deck} from "./Deck";

export default class DeckGateway {
    constructor() {
    }

    async getDecks(username) {
        const response = await fetch(URIs.SolforgeAPI + `deck?pageSize=1000&inclCards=true&username=${username.toLowerCase()}`);
        
        let formattedData = this.formatDecks(await response.json());
        return formattedData;
    }

    formatDecks(apiData) {
        let decks = [];
        apiData.Items.forEach((apiDeck) => {
            decks.push(new Deck(apiDeck));
        })

        return decks;
    }
}