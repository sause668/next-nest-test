export interface Deck {
    id: number;
    name: string;
    description: string;
    cards: Card[];
}

export interface Card {
    id: number;
    name: string;
    description: string;
}

export type DeckData = Promise<Deck | Error> | Error;