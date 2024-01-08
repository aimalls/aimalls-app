import React, { createContext, ReactNode, useContext, useEffect } from "react"
import { io, Socket } from "socket.io-client";
import { UserContext } from "./UserContext";
const socket = io(import.meta.env.VITE_SOCKET_URL, { extraHeaders: { Authorization: "Bearer " + localStorage.getItem("authToken") || "" }  });


export const SocketContext = createContext<Socket>(socket)

type SocketContextProviderProps = {
    children: ReactNode
}


export const SocketContextProvider = ({ children }: SocketContextProviderProps) => {
    
    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to socket")
        
        })
    }, [])
    
    return (
        <SocketContext.Provider value={ socket }>
            { children }
        </SocketContext.Provider>
    )
}

export default SocketContextProvider;