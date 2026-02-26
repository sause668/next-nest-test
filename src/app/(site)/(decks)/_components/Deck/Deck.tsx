"use client";
import Link from "next/link";
import { useState } from "react";
import "./Deck.css";
import { Deck, Card } from "../../_types/deck-types";
import { addCard, deleteCard } from "../../_actions/decks_actions";
import { useRouter } from "next/navigation";
// import { revalidatePath } from "next/cache";

export default function DeckComponent({ deck }: { deck: Deck }) {
    const [cardName, setCardName] = useState("");
    const [cardDescription, setCardDescription] = useState("");
    const router = useRouter();

    const handleAddCard = async () => {
        const card = await addCard(deck.id.toString(), cardName, cardDescription);

        if (card instanceof Error) {
            console.error(card.message);
        }
    }

    const handleDeleteCard = async (cardId: string) => {
        const card = await deleteCard(cardId);
        
        if (card instanceof Error) {
            console.error(card.message);
        } 
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-black font-sans">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-start gap-4 py-32 px-16 bg-black sm:items-start">
                <Link href="/decks" className="text-sm text-gray-500 hover:text-white transition-all duration-300">Back</Link>
                <div className="flex flex-col gap-2  border border-white rounded-md p-4">
                    <div className="flex justify-between items-center gap-6 mb-3">
                    <h1 className="text-3xl font-bold">{deck.name}</h1>
                    <p className="text-sm text-gray-500">{deck.description}</p>
                    </div>
                    <div className="flex gap-2 flex-wrap justify-center">
                        {deck.cards && deck.cards.map((card: Card) => (
                            <div className="flex flex-col gap-2 bg-white rounded-md p-3 max-w-40" key={card.id}>
                                <div className="flex justify-start items-start gap-2">
                                    <button 
                                        className="text-sm text-gray-500 cursor-pointer hover:text-black transition-all duration-300" 
                                        onClick={() => handleDeleteCard(card.id.toString())}
                                    >X</button>
                                    <h3 className="text-lg font-bold text-black">{card.name}</h3>
                                </div>
                                <p className="text-sm text-gray-500">{card.description}</p>
                            </div>
                        ))}
                        <div className="flex flex-col gap-2 bg-white rounded-md p-3 max-w-40">
                            <h3 className="text-lg font-bold text-black">Add Card</h3>
                            <input 
                                type="text" 
                                placeholder="Card Name" 
                                className="text-sm text-gray-500" 
                                value={cardName} 
                                onChange={(e) => setCardName(e.target.value)} 
                                required 
                            />
                            <input 
                                type="text" 
                                placeholder="Card Description" 
                                className="text-sm text-gray-500" 
                                value={cardDescription} 
                                onChange={(e) => setCardDescription(e.target.value)} 
                                required 
                            />
                            <button 
                                className="bg-black text-white rounded-md p-2 cursor-pointer hover:bg-white hover:text-black hover:border-black border border-transparent transition-all duration-300"
                                onClick={handleAddCard}
                                disabled={!cardName || !cardDescription}
                            >Add Card</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}