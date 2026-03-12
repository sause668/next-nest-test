"use client";

import { useActionState, useState, useTransition } from "react";
import { loginUser, logoutUser, sessionUser } from "../../_actions/user-actions";
import { User } from "../../_types/user-types";
import "./Profile.css";
import { LoginFormState } from "@/app/lib/definitions";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<LoginFormState>(undefined);
    const [pending, startTransition] = useTransition();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        startTransition(async () => {
            e.preventDefault();
            const result = await loginUser(email, password);
            if (result instanceof Error) {
                console.error(result);
            } else {
                setErrors(result);
            }
        });
    }

    const handleLogin = async () => {
        const result = await sessionUser('1');
        if (result instanceof Error) {
            console.error(result);
        }
    }

    return (
        <div className="flex justify-end items-center bg-black font-sans p-4 pr-50">
            <div className="flex flex-col items-start justify-center gap-2 border border-white rounded-md p-4">
                <h1>Log In</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Email
                        <input
                            name="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    {errors?.properties?.email && <p>{errors.properties.email.errors.join(', ')}</p>}
                    <label>
                        Password
                        <input
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    {errors?.properties?.password && <p>{errors.properties.password.errors.join(', ')}</p>}
                    <button type="submit" disabled={pending}>{pending ? "Logging in..." : "Log In"}</button>
                </form>
                <button className="bg-white text-black border border-black px-4 py-2 rounded-md hover:bg-black hover:text-white hover:border-white transition-colors cursor-pointer" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}