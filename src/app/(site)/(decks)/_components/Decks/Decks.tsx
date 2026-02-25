"use client";

import { useRouter } from "next/navigation";
import { use } from "react";

import "./Decks.css";
import { Deck } from "../../_types/deck-types";

export default function Decks({ decks }: { decks: Deck[] }) {
    const router = useRouter();

    console.log("Decks", decks);

    return (
    <div className="flex min-h-screen items-center justify-center bg-black font-sans">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-start gap-4 py-32 px-16 bg-black sm:items-start">
            <h1 className="text-3xl font-bold border-b border-white">Decks</h1>
            <div className="flex flex-col gap-4 ">
                {decks.map((deck: Deck) => (
                    <div 
                    onClick={() => router.push(`/decks/${deck.id}`)}
                    className="flex flex-col gap-2 p-3 border border-white rounded-md cursor-pointer hover:bg-white hover:text-black transition-all duration-300" key={deck.id}>
                        <div className="flex justify-between items-center gap-6">
                            <h2 className="text-2xl font-bold">{deck.name}</h2>
                            <p className="text-sm text-gray-500">{deck.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    </div>
    );
}