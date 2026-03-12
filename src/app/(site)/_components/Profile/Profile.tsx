"use client";

import { logoutUser } from "../../_actions/user-actions";
import { User } from "../../_types/user-types";
import "./Profile.css";

export default function Profile({ user }: { user: User }) {

    const handleLogout = async () => {
        const result = await logoutUser();
        if (result instanceof Error) {
            console.error(result);
        }
    }

    return (
        <div className="flex justify-end items-center bg-black font-sans p-4 pr-50">
            <div className="flex flex-col items-start justify-center gap-2 border border-white rounded-md p-4">
                <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
                <p className="text-sm text-gray-500">{user.email}</p>
                <button
                    className="bg-white text-black border border-black px-4 py-2 rounded-md hover:bg-black hover:text-white hover:border-white transition-colors cursor-pointer"
                    onClick={handleLogout}
                >Logout</button>
            </div>
        </div>
    );
}