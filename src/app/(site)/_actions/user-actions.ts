"use server";

import { users } from "@/app/_db/users";
import { cacheTag, revalidateTag } from "next/cache";

export async function getUser(userId: string) {
    "use cache"
    cacheTag("user");

    const user = users.find((user) => user.id === parseInt(userId));

    if (!user) {
        throw new Error("User not found");
    }

    // revalidateTag("user", "max");
    return user;
}