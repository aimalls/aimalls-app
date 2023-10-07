import { IonBackButton, IonButton, IonContent, IonHeader, IonLabel, IonPage, IonToolbar } from "@ionic/react";
import { FC, useEffect, useState } from "react";
import "../styles/v1/pages/SplashScreen.scss"
import AIMallsLogo from "../assets/images/logo.png"
import { useHistory } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { iAppSetting } from "../requests/app-setting.request";
import MaintenanceModeDialog from "../components/MaintenanceModeDialog";
import { useAppSetting } from "../hooks/splash-screen/useAppSetting";

export const SplashScreen: FC = () => {

    const navigation = useHistory();

    const { AppSettingsQuery } = useAppSetting();
    
    const AppSettings = AppSettingsQuery.data;

    const [isMaintenanceModeStatus, setIsMaintenanceModeStatus] = useState<boolean>(false)

    useEffect(() => {
        if (AppSettings) {
            const isMaintenanceMode: iAppSetting = AppSettings.find((v: iAppSetting) => v.name == 'isMaintenanceMode');

            if (isMaintenanceMode) {
                if (isMaintenanceMode.value == true) {
                    setIsMaintenanceModeStatus(true)
                } else {
                    setTimeout(() => {
                        navigation.push("/dashboard")
                    }, 3000)
                }
            } else {
                setTimeout(() => {
                    navigation.push("/dashboard")
                }, 3000)
            }
        }
        
    }, [AppSettings])

    return  (
        <IonPage id="splash-screen">
            <MaintenanceModeDialog isOpen={ isMaintenanceModeStatus } />
            <IonContent fullscreen>
                <div className="container">
                    <img src={ AIMallsLogo } alt="aimalls-logo" />
                    <div className="greetings">Welcome to AIMALLS</div>
                    {/* <div className="auth-buttons">
                        <IonButton>
                            <IonLabel>Sign Up</IonLabel>
                        </IonButton>
                        <IonButton color={"light"}>Login</IonButton>
                    </div> */}
                </div>
            </IonContent>
        </IonPage>
    )
}