"use server"

import { decks } from "@/app/_db/decks-data";
import { cacheTag } from "next/cache";
// import { notFound } from "next/navigation";
import { Deck } from "../_types/deck-types";
import prisma from "@/root/lib/prisma";

export async function getDecks(userId: string) {
    "use cache"
    cacheTag("decks");

    try {
    const decksData = await prisma.deck.findMany({
        where: {
            userId: parseInt(userId),
        },
        });

        if (!decksData) {
            throw new Error("Decks not found");
        }
        const decks: Deck[] = decksData.map((deck) => ({
            id: deck.id,
            name: deck.name,
            description: deck.description
        }));

        return decks;

    } catch (error) {
        return error as Error;
    }
}

export async function getDeck(deckId: string) {
    "use cache"
    cacheTag("deck");
    
    try {
        const dbDeck = await prisma.deck.findUnique({
            where: {
                id: parseInt(deckId),
            },
            include: {
                cards: true,
            },
        });

        if (!dbDeck) {
            throw new Error("Deck not found");
        }

        const deck: Deck = {
            id: dbDeck.id,
            name: dbDeck.name,
            description: dbDeck.description,
            cards: dbDeck.cards,
        };

        return deck;

    } catch (error) {
        // console.error((error as Error).message);
        return error as Error;
    }
}