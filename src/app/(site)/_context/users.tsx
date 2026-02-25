'use client'
 
import { createContext, useContext, use } from 'react'
import { User } from '../_types/user-types';
 
export const UserContext = createContext({})
 
export default function UserProvider({ children, user }: { children: React.ReactNode, user: Promise<User> }) {

  const userData: User = use(user);

  return <UserContext.Provider value={{ user: userData }}>{children}</UserContext.Provider>
}

export function useUser() {
    return useContext(UserContext);
}