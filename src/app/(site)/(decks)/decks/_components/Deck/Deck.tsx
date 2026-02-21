"use client";
import Link from "next/link";
import "./Deck.css";
import { use } from "react";
import { Deck, Card } from "../../_types/deck-types";

export default function DeckComponent({ deckData, }: { deckData: Promise<Deck> }) {
    const deck: Deck = use(deckData);

    return (
        <div className="flex min-h-screen items-center justify-center bg-black font-sans">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-start gap-4 py-32 px-16 bg-black sm:items-start">
                <Link href="/decks" className="text-sm text-gray-500 hover:text-white transition-all duration-300">Back</Link>
                <div className="flex flex-col gap-2  border border-white rounded-md p-4">
                    <div className="flex justify-between items-center gap-6 mb-3">
                    <h1 className="text-3xl font-bold">{deck.name}</h1>
                    <p className="text-sm text-gray-500">{deck.description}</p>
                    </div>
                    <div className="flex gap-2">
                        {deck.cards.map((card: Card) => (
                            <div className="flex flex-col gap-2 bg-white rounded-md p-3 max-w-40" key={card.id}>
                                <h3 className="text-lg font-bold text-black">{card.name}</h3>
                                <p className="text-sm text-gray-500">{card.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}