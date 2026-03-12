"use server"

import { cacheTag, revalidatePath } from "next/cache";
import { Deck } from "../_types/deck-types";
import prisma from "@/lib/prisma";

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
            userId: deck.userId,
            name: deck.name,
            description: deck.description,
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
            userId: dbDeck.userId,
            name: dbDeck.name,
            description: dbDeck.description,
            cards: dbDeck.cards,
        };

        return deck;

    } catch (error) {
        return error as Error;
    }
}

export async function addCard(deckId: string, cardName: string, cardDescription: string) {
    
    try {
        const dbDeck = await prisma.deck.findUnique({
            where: {
                id: parseInt(deckId),
            },
        });

        if (!dbDeck) {
            throw new Error("Deck not found");
        }

        await prisma.card.create({
            data: {
                name: cardName,
                description: cardDescription,
                deckId: parseInt(deckId),
            },
        });
        
        revalidatePath(`/decks/${deckId}`);

        return { success: true };

        
    } catch (error) {
        return error as Error;
    }
}

export async function deleteCard(cardId: string) {
    try {
        const dbCard = await prisma.card.findUnique({
            where: {
                id: parseInt(cardId),
            },
        });

        if (!dbCard) {
            throw new Error("Card not found");
        }
        await prisma.card.delete({
            where: {
                id: parseInt(cardId),
            },
        });

        revalidatePath(`/decks/${dbCard.deckId}`);

        return { success: true };
    } catch (error) {
        return error as Error;
    }
}