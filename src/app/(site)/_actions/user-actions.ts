"use server";

import { cacheTag } from "next/cache";
import prisma from "@/lib/prisma";
import { User } from "../_types/user-types";

export async function getUser(userId: string) {
    "use cache"
    cacheTag("user");

    try {
        const dbUser = await prisma.user.findUnique({
            where: {
                id: parseInt(userId),
            },
        });

        if (!dbUser) {
            throw new Error("User not found");
        }

        const user: User = {
            firstName: dbUser?.firstName,
            lastName: dbUser?.lastName,
            username: dbUser?.username,
            email: dbUser?.email,
        }

        return user;

    } catch (error) {
        return error as Error;
    }
}

