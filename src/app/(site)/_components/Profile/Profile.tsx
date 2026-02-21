"use client";

import { useUser } from "../../_context/users";
import { User } from "../../_types/user-types";
import "./Profile.css";

export default function Profile() {

    const { user } = useUser() as { user: User };
    
    return (
        <div className="flex justify-end items-center bg-black font-sans p-4 pr-50">
            <div className="flex flex-col items-start justify-center gap-2 border border-white rounded-md p-4">
            <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
            <p className="text-sm text-gray-500">{user.email}</p>
            </div>
        </div>
    );
}