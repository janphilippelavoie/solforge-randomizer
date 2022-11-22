import {URIs} from "../Constants";
import {Deck} from "./Deck";
import {FusedDeck} from "./FusedDeck";
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
        const URI = URIs.SolforgeAPI + `deck?pageSize=1000&inclCards=true&username=${username.toLowerCase()}`
        let decks = []
        let response = await fetch(URI);
        let apiData = await response.json()
        decks = decks.concat(this.formatDecks(apiData))
        
        while(apiData.LastEvaluatedKey) {
            let exclusiveStartKey = encodeURIComponent(JSON.stringify(apiData.LastEvaluatedKey))
            response = await fetch(URI + `&exclusiveStartKey=${exclusiveStartKey}`);
            apiData = await response.json()
            decks = decks.concat(this.formatDecks(apiData))
        }
        return decks
    }

    async getFusedDecks(username) {
        const response = await fetch(URIs.SolforgeAPI + `fuseddeck?pageSize=1000&username=${username.toLowerCase()}`);

        return this.formatFusedDecks(await response.json());
    }

    formatDecks(apiData) {
        let decks = [];
        apiData.Items.forEach((apiDeck) => {
            decks.push(new Deck(apiDeck));
        })

        return decks;
    }

    formatFusedDecks(apiData) {
        let fusedDecks = [];
        apiData.Items.forEach((apiDeck) => {
            if(!apiDeck.isArchived) {
                fusedDecks.push(new FusedDeck(apiDeck));
            }
        })

        return fusedDecks;
    }
}