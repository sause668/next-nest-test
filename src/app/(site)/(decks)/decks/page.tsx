import Decks from "./_components/Decks/Decks";
import { getDecks } from "./_actions/decks_actions";

export default function DecksPage() {
    const decksData = getDecks();
    return (
    <div>
        <Decks decksData={decksData} />
    </div>
    );
}