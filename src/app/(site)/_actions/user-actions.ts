"use server";

import * as z from 'zod'
import { cacheTag } from "next/cache";
import prisma from "@/lib/prisma";
import { User } from "../_types/user-types";
import { createSession, verifySession, deleteSession } from "@/app/lib/session";
import { ActionResponse, LoginFormState, LoginFormSchema } from "@/app/lib/definitions";

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

export async function updateUserSession() {

    try {
        const session = await verifySession();

        if (session instanceof Error) {
            throw session;
        }

        const user = await getUser(session.userId as string);

        if (user instanceof Error) {
            throw user;
        }

        return user;

    } catch (error) {
        return error as Error;
    }
}

export async function loginUser(email: string, password: string) {

    // const passwordHash = await bcrypt.hash(password, 10);

    try {
        // Validate form fields
        const validatedFields = LoginFormSchema.safeParse({
            email: email,
            password: password,
        })

        // If any form fields are invalid, return early
        if (!validatedFields.success) {
            return z.treeifyError(validatedFields.error) as LoginFormState;
        }

        // Call the provider or db to create a user...
        const userData = await prisma.user.findUnique({
            where: { email: validatedFields.data.email },
        });

        if (!userData) {
            throw new Error("User not found");
        }

        if (userData.password !== validatedFields.data.password) {
            throw new Error("Invalid password");
        }

        await createSession(userData.id.toString());

        // return { message: "Login successful"} as ActionResponse;
    }
    catch (error) {
        return error as Error;
    }
}

export async function sessionUser(userId: string) {

    try {
        await createSession(userId);
    }
    catch (error) {
        return error as Error;
    }
}

export async function logoutUser() {

    try {
        await deleteSession();
    }
    catch (error) {
        return error as Error;
    }
}

export async function createUser(firstName: string, lastName: string, username: string, email: string, password: string) {
    "use cache"
    cacheTag("user");

    try {
        const user = await prisma.user.create({
            data: { firstName, lastName, username, email, password },
        });
    } catch (error) {
        return error as Error;
    }
}


export async function updateUser(id: string, firstName: string, lastName: string, username: string, email: string, password: string) {
    "use cache"
    cacheTag("user");

    try {
        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { firstName, lastName, username, email, password },
        });
    } catch (error) {
        return error as Error;
    }
}

export async function deleteUser(id: string) {
    "use cache"
    cacheTag("user");

    try {
        const user = await prisma.user.delete({
            where: { id: parseInt(id) },
        });
    } catch (error) {
        return error as Error;
    }
}




