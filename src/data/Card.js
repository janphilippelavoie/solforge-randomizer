import {CardType} from "../Constants";

export class Card {
    // Interface

    // cardType: string
    // cardSubTypes: string
    // title: string
    // rarity: string
    // levels: {
    //    attack: number
    //    health: number
    //    text: string
    // }[]

    constructor (apiData) {
        this.cardType = apiData.cardType;
        this.cardSubTypes = apiData.cardSubType;
        this.title = apiData.title;
        this.rarity = apiData.rarity;
        this.levels = apiData.levels;
    }

    isCreature() {
        return this.hasType(CardType.Creature);
    }

    isSpell() {
        return this.hasType(CardType.Spell);
    }

    hasType(type) {
        return this.cardType === type ||
        this.cardSubTypes.includes(type);
    }

    getCreatureProperty(level, propName) {
        if (this.isCreature()) {
            if (level > 0 && level <= 3) {
                if (this.levels[level].hasOwnProperty(propName)) {
                    return this.levels[level][propName];
                }
            }
        }
        return undefined;
    }

    getCreatureSubTypes() {
        if (this.isCreature()) {
            return this.cardSubTypes.split(" ").sort();
        }
        return [];
    }
}