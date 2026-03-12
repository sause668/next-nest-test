import { JWTPayload } from "jose";
import * as z from 'zod'

// Session Definitions
export interface SessionPayload extends JWTPayload {
    userId: string;
    expiresAt: Date;
}

export interface ActionResponse {
    message?: string;
}

// User Definitions
export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
}

//Login Form Definitions
export const LoginFormSchema = z.object({
    email: z.email({ error: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        // .min(8, { error: 'Be at least 8 characters long' })
        // .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
        // .regex(/[0-9]/, { error: 'Contain at least one number.' })
        // .regex(/[^a-zA-Z0-9]/, {
        //     error: 'Contain at least one special character.',
        // })
        .trim(),
})

export type LoginFormState = {
    errors: string[],
    properties?: {
        email?: { errors: string[] } | undefined;
        password?: { errors: string[] } | undefined;
    } | undefined
} | undefined

// export interface LoginFormState {
//     errors: string[],
//     properties?: {
//         email?: { errors: string[] } | undefined;
//         password?: { errors: string[] } | undefined;
//     } | undefined
// }




//Deck Definitions
export interface Deck {
    id: number;
    userId: number;
    name: string;
    description: string;
    cards?: Card[];
}

export interface Card {
    id: number;
    name: string;
    description: string;
}

export type DeckData = Promise<Deck | Error> | Error;




