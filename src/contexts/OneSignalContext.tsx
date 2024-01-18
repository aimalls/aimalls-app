import React, { createContext, ReactNode, useEffect } from "react"


import OneSignal, { NotificationClickEvent, OneSignalPlugin } from 'onesignal-cordova-plugin';

export const OneSignalContext = createContext<OneSignalPlugin>(OneSignal)

type OneSignalContextProviderProps = {
    children: ReactNode
}

export const OneSignalContextProvider = ({ children }: OneSignalContextProviderProps) => {
    
    const oneSignalInit = async () => {
        
        OneSignal.initialize("868353a3-e592-4556-9d5e-82ce4bef66b6")
        
        let myClickListener = async function(event: NotificationClickEvent) {
            let notificationData = JSON.stringify(event);
        };
        OneSignal.Notifications.addEventListener("click", myClickListener);

        OneSignal.Notifications.requestPermission(true).then((accepted: boolean) => {
            console.log("User accepted notifications: " + accepted);
        });
    }

    useEffect(() => {
        oneSignalInit();
    }, [])


    return (
        <OneSignalContext.Provider value={OneSignal}>
            { children }
        </OneSignalContext.Provider>
    )
}

export default OneSignalContextProvider;