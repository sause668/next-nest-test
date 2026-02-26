import Decks from "../_components/Decks/Decks";
import { getDecks } from "../_actions/decks_actions";
import prisma from "@/lib/prisma";
import { useUser } from "../../_context/users";
import { User } from "../../_types/user-types";
import { Deck } from "../_types/deck-types";

export default async function DecksPage() {
    // const { user } = useUser() as { user: User };
    const decksData = await getDecks("1");
    
    return (
    <div>
        <Decks decks={decksData as unknown as Deck[]} />
    </div>
    );
}