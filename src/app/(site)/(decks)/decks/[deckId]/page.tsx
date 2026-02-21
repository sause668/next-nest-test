import { getDeck } from "../_actions/decks_actions";
import { notFound } from "next/navigation";
import DeckComponent from "../_components/Deck/Deck";
import { Deck } from "../_types/deck-types";

export default async function DeckPage({ params }: { params: { deckId: string }  }) {
    const { deckId } = await params;
    const data: Promise<Deck | Error> = getDeck(deckId);

    if (await data instanceof Error) {
        const error: Error = await data as Error;
        if (error.message === "Deck not found") {
            notFound();
        } 

        throw error;
    } 

    return (
        <div>
            <DeckComponent deckData={data as Promise<Deck>} />
        </div>
    );
}