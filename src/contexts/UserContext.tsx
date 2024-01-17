import React, { createContext, ReactNode, useEffect } from "react"
import { useHistory } from "react-router"
import { useUser } from "../hooks/auth/useUser"
import { iUserInfo } from "../requests/auth.request"

export type tUser = {
    _id: string
    email: string,
    isVerified: boolean,
    isAdmin: boolean,

}

export interface iUserContext {
    user: iUserInfo,
    authToken: string | null
}

const defaultState = {
    user: {
        email: '',
        isVerified: false,
        isAdmin: false,
        _id: ''
    },
    authToken: ''
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
        <UserContext.Provider value={{user: userQuery.data!, authToken: localStorage.getItem("authToken")}}>
            { children }
        </UserContext.Provider>
    )
}

export default UserContextProvider;