"use server"

import { decks } from "@/app/_db/decks-data";
import { cacheTag } from "next/cache";
import { notFound } from "next/navigation";
import { Deck } from "../_types/deck-types";

export async function getDecks() {
    "use cache"
    cacheTag("decks");

    return decks;
}

export async function getDeck(deckId: string) {
    // "use cache"
    // cacheTag("deck");
    
    try {
    const deck: Deck | undefined = await decks.find((deck) => deck.id === parseInt(deckId));

        if (!deck) {
            throw new Error("Deck not found");
        }

        return deck;

    } catch (error) {

        return error as Error;
    }
}