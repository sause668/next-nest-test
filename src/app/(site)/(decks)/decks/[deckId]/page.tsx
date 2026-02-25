import { getDeck } from "../../_actions/decks_actions";
import { notFound } from "next/navigation";
import DeckComponent from "../../_components/Deck/Deck";
import { Deck } from "../../_types/deck-types";
import prisma from "@/root/lib/prisma";

export default async function DeckPage({ params }: { params: Promise<{ deckId: string }>  }) {
    const { deckId } = await params;
    const deck = await getDeck(deckId);

    if (deck instanceof Error) {
        const error: Error = deck as Error;
        if (error.message === "Deck not found") {
            notFound();
        } 

        throw error;
    } 

    return (
        <div>
            <DeckComponent deck={deck} />
        </div>
    );
}