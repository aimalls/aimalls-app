import React, { createContext, ReactNode, useEffect } from "react"
import { useHistory } from "react-router"
import { useUser } from "../hooks/auth/useUser"

export type tUser = {
    _id: string
    email: string,
    isVerified: boolean,
    isAdmin: boolean,

}

export interface iUserContext {
    user: tUser
}

const defaultState = {
    user: {
        email: '',
        isVerified: false,
        isAdmin: false,
        _id: ''
    }
} as iUserContext

export const UserContext = createContext(defaultState)

type UserContextProviderProps = {
    children: ReactNode
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const navigation = useHistory();
    
    const user = useUser();
    const { userQuery } = user;

    useEffect(() => {
        if (!!localStorage.getItem("authToken") == false) {
            navigation.push("/login")
        }
    }, [])

    return (
        <UserContext.Provider value={{user: userQuery.data?.data}}>
            { children }
        </UserContext.Provider>
    )
}

export default UserContextProvider;