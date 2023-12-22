import { IonPage, IonContent, IonBackButton, IonHeader, IonToolbar, IonTitle, IonButtons, IonGrid, IonCol, IonInput, IonRow, IonButton, IonIcon, useIonAlert, useIonLoading } from "@ionic/react";
import { FC, useState } from "react";
import { eyeOff, eye, arrowForward } from "ionicons/icons";
import "../../styles/v1/pages/auth/Login.scss"
import { iLoginForm, processLoginToAPI } from "../../requests/auth.request";
import { useLocalStorage } from 'usehooks-ts'
import { AxiosResponse } from 'axios'
import { useHistory } from "react-router";

import logoRobot from "../../assets/images/logo-robot.png"

export interface iProps { }
export const Login: FC<iProps> = (props): JSX.Element => {


    const [presentAlert] = useIonAlert();
    const [present, dismiss] = useIonLoading();

    const navigation = useHistory();

    const [loginForm, setLoginForm] = useState<iLoginForm>({
        email: '',
        password: '',
    })
    const [authToken, setAuthToken] = useLocalStorage<string | AxiosResponse>('authToken', '')

    const handleLoginFormChange = (key: string, value: string) => {
        setLoginForm((current) => {
            let curr = { ...current };

            curr[key as keyof typeof curr] = value;

            return curr;
        })
    }

    const processLogin = async () => {
        await present();
        try {
            const result = await processLoginToAPI(loginForm.email, loginForm.password)
            setAuthToken(result.data.authToken)
            navigation.push("/dashboard")
        } catch (error: any) {
            presentAlert(error.response.data)
        } finally {
            await dismiss();
        }
    }

    return (
        <IonPage id="login">
            <IonHeader>
                <IonToolbar>
                    <IonButton slot="end" fill="clear" routerLink="/register">Sign Up</IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>

                <IonGrid style={{ paddingTop: '50px' }}>
                    <IonRow>
                        <IonCol size="12" className="logo">
                            <img src={logoRobot} alt="aimalls-robot" height={100} />
                        </IonCol>
                        <IonCol size="6" className="page-title">
                            Log In
                        </IonCol>
                        <IonCol size="12" className="form">
                            <IonInput
                                type="email"
                                label="Email"
                                fill="solid"
                                labelPlacement="floating"
                                value={loginForm.email}
                                onIonInput={(e) => handleLoginFormChange("email", e.detail.value!)}
                            />

                            <IonInput
                                type="password"
                                label="Password"
                                fill="solid"
                                labelPlacement="floating"
                                value={loginForm.password}
                                onIonInput={(e) => handleLoginFormChange("password", e.detail.value!)}
                            >
                            </IonInput>
                        </IonCol>
                        <IonCol size="12" style={{ display: 'flex', justifyContent: 'end' }}>
                            <IonButton routerLink="/forgot-password" size="small" fill="clear">Forgot Password?
                                {/* <IonIcon slot="end" icon={ arrowForward }></IonIcon> */}
                            </IonButton>
                        </IonCol>
                        <IonCol size="12" className="form-button">
                            <IonButton size="large" expand="block" shape="round" onClick={() => processLogin()}>
                                <span slot="">Login</span>
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};
export default Login;