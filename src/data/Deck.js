import { Card } from "./Card";
import { CardType } from "../Constants";

export class Deck {

    // Interface

    // id : string
    // name: string
    // faction: string
    // cards: Card[]
    // forgeborn: * -> TODO
    // imageUrl: string

    constructor(apiDeck) {
        this.id = apiDeck.id;
        this.name = apiDeck.name;
        this.faction = apiDeck.faction;
        this.forgeborn = apiDeck.forgeborn;
        this.imageUrl = apiDeck.imageUrl;
        this.cards = this.parseCards(apiDeck.cards);
    }

    parseCards(apiCards) {
        let cards = [];

        for (const [key, value] of Object.entries(apiCards)) {
            let card = new Card(value);
            cards.push(card);
        }

        return cards;
    }

    getNbCardsOfType(type) {
        let total = 0;
        for (const card of this.cards) {
            if (card.hasType(type)) {
                total += 1
            }
        }
        return total;
    }

    getAverageCreatureProperty(level, propName) {
        let total = 0;
        let nbCreatures = 0;
        for (const card of this.cards) {
            if (card.isCreature()) {
                nbCreatures++;
                let value = card.getCreatureProperty(level, propName);
                if (value) {
                    total += value;
                }
            }
        }
        return total/nbCreatures;
    }

    getMinCreatureProperty(level, propName) {
        let min = Number.POSITIVE_INFINITY;
        for(const card of this.cards) {
            if (card.isCreature()) {
                min = Math.min(min, card.getCreatureProperty(level, propName));
            }
        }
        return min;
    }

    getMaxCreatureProperty(level, propName) {
        let max = Number.NEGATIVE_INFINITY;
        for(const card of this.cards) {
            if (card.isCreature()) {
                max = Math.max(max, card.getCreatureProperty(level, propName));
            }
        }
        return max;
    }
}