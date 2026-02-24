import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({
  adapter,
});
const userData: Prisma.UserCreateInput[] = [
  {
    firstName: "Jane",
    lastName: "Foster",
    username: "jfoster",
    email: "jane.foster@magicdecks.com",
    password: "password",
    decks: {
      create: [
        {
            id: 1,
            name: "Ral",
            description: "Spellslinger",
            cards: {
                create: [
                    {
                        id: 1,
                        name: "Strick it Rich",
                        description: "Make a treasure token",
                    },
                    {
                        id: 2,
                        name: "Reckless Impulse",
                        description: "Draw 2 cards, then discard a card",
                    },
                ],
            },
        },
        {
            id: 2,
            name: "Firelord Azula",
            description: "Copy on Attack",
            cards: {
                create: [
                    {
                        id: 3,
                        name: "Frantic Search",
                        description: "Draw 2 cards, then discard a card.  Untap two lands",
                    },
                    {
                        id: 4,
                        name: "Valley Floodcrawler",
                        description: "Noncreature spell have flash",
                    },
                ],
            },
        },
        {
            id: 3,
            name: "Katara",
            description: "Card Draw",
            cards: {
                create: [
                    {
                        id: 5,
                        name: "Drematic Reversal",
                        description: "Untap all nonland permanents",
                    },
                    {
                        id: 6,
                        name: "Hulbreaker Horror",
                        description: "Spell can't be countered",
                    },
                ],
            },
        },
      ],
    },
  },
];
export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}
main();