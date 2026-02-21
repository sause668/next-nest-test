'use client'
 
import { createContext, useContext } from 'react'
import { User } from '../_types/user-types';
 
export const UserContext = createContext({})
 
export default function UserProvider({ children, user }: { children: React.ReactNode, user: User }) {

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
}

export function useUser() {
    return useContext(UserContext);
}