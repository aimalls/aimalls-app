import { IonPage, IonContent, IonBackButton, IonHeader, IonToolbar, IonTitle, IonButtons, IonGrid, IonCol, IonInput, IonRow, IonButton, IonIcon, useIonAlert, useIonLoading, useIonToast } from "@ionic/react";
import { FC, useState } from "react";
import { eyeOff, eye, arrowForward } from "ionicons/icons";
import "../../styles/v1/pages/auth/Login.scss"

import { useLocalStorage } from 'usehooks-ts'
import { AxiosResponse } from 'axios'
import { useHistory } from "react-router";

import logoRobot from "../../assets/images/logo-robot.png"
import { getOTPFromAPI } from "../../requests/otp.request";

export interface iProps { }
export const ForgotPassword: FC<iProps> = (props): JSX.Element => {


    const [presentAlert] = useIonAlert();
    const [present, dismiss] = useIonLoading();
    const [presentToast] = useIonToast();

    const navigation = useHistory();

    const [email, setEmail] = useState("")

    const getOTP = async () => {
        await present();
        try {
            const result = await getOTPFromAPI(email, "reset-password")
            presentToast("OTP sent to your email", 5000);
            navigation.push(`/password-reset/${email}`)
        } catch (error: any) {
            presentAlert(error.response.data.message)
        } finally {
            await dismiss();
        }
    }

    return (
        <IonPage id="login">
            <IonHeader>
                <IonToolbar>
                    <IonButton slot="end" fill="clear" routerLink="/login">Login</IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>

                <IonGrid style={{ paddingTop: '50px' }}>
                    <IonRow>
                        <IonCol size="12" className="logo">
                            <img src={logoRobot} alt="aimalls-robot" height={100} />
                        </IonCol>
                        <IonCol size="9" className="page-title">
                            Forgot Password
                        </IonCol>
                        <IonCol size="12" className="form">
                            <IonInput
                                type="email"
                                label="Email"
                                fill="solid"
                                labelPlacement="floating"
                                value={email}
                                onIonInput={(e) => setEmail(e.detail.value!)}
                            />
                        </IonCol>
                        <IonCol size="12" className="form-button">
                            <IonButton size="large" expand="block" shape="round" onClick={() => getOTP()}>
                                <span slot="">Submit</span>
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};
export default ForgotPassword;