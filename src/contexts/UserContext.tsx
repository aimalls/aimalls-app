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

    const { data: userData, isLoading: userDataIsLoading } = userQuery;

    useEffect(() => {
        if (userDataIsLoading) return
        if (!userDataIsLoading) {
            if (!userData) {
                navigation.replace("/login")
            }
            return
        }
        if (!!localStorage.getItem("authToken") == false) {
            navigation.replace("/login")
        }
    }, [userQuery])

    return (
        <UserContext.Provider value={{user: userQuery.data?.data}}>
            { children }
        </UserContext.Provider>
    )
}

export default UserContextProvider;