import { IonPage, IonContent, IonGrid, IonCol, IonInput, IonRow, IonButton, IonIcon, useIonAlert, useIonLoading, IonHeader, IonToolbar } from "@ionic/react";
import { FC, useState } from "react";
import { eyeOff, eye, arrowForward } from "ionicons/icons";
import "../../styles/v1/pages/auth/Register.scss"
import { iRegistrationForm, processLegacyRegistrationToAPI } from "../../requests/auth.request";
import { iError } from "../../interfaces/Errors";
import { useHistory } from "react-router";

import logoRobot from "../../assets/images/logo-robot.png"

export interface iProps { }

export const Register: FC<iProps> = (props): JSX.Element => {


    const [presentAlert] = useIonAlert();
    const [present, dismiss] = useIonLoading();

    const navigation = useHistory();

    const [registrationForm, setRegistrationForm] = useState<iRegistrationForm>({
        email: '',
        password: '',
        confirm_password: ''
    })

    const handleRegistrationFormChange = (key: string, value: string) => {
        setRegistrationForm((current) => {
            let curr = { ...current };

            curr[key as keyof typeof curr] = value;

            return curr;
        })
    }

    const processRegistration = async () => {
        await present();
        try {
            const result = await processLegacyRegistrationToAPI(registrationForm)
            navigation.push("/register-success")
        } catch (error: any) {
            presentAlert(error)
        } finally {
            await dismiss();
        }
    }

    return (
        <IonPage id="register">
            <IonContent fullscreen>
                <IonHeader>
                    <IonToolbar>
                        <IonButton slot="end" fill="clear" routerLink="/login">Log In</IonButton>
                    </IonToolbar>
                </IonHeader>
                <IonGrid style={{ paddingTop: '50px' }}>
                    <IonRow>
                        <IonCol size="12" className="logo">
                            <img src={logoRobot} alt="aimalls-robot" height={100} />
                        </IonCol>
                        <IonCol size="6" className="page-title">
                            Sign Up
                        </IonCol>
                        <IonCol size="12" className="form">
                            <IonInput
                                type="email"
                                label="Business Email"
                                fill="solid"
                                value={registrationForm.email}
                                labelPlacement="floating"
                                onIonInput={(e) => handleRegistrationFormChange("email", e.detail.value!)}
                            />

                            <IonInput
                                type="password"
                                label="Password"
                                fill="solid"
                                value={registrationForm.password}
                                labelPlacement="floating"
                                onIonInput={(e) => handleRegistrationFormChange("password", e.detail.value!)}
                            >
                            </IonInput>
                            <IonInput
                                type="password"
                                label="Confirm Password"
                                fill="solid"
                                value={registrationForm.confirm_password}
                                labelPlacement="floating"
                                onIonInput={(e) => handleRegistrationFormChange("confirm_password", e.detail.value!)}
                            >
                            </IonInput>
                        </IonCol>
                        <IonCol size="12" style={{ display: 'flex', justifyContent: 'end' }}>
                            <IonButton size="small" fill="clear" routerLink="/login">Already have store?
                                <IonIcon slot="end" icon={arrowForward}></IonIcon>
                            </IonButton>
                        </IonCol>
                        <IonCol size="12" className="form-button">
                            <IonButton size="default" expand="block" shape="round" onClick={() => processRegistration()}>
                                <span slot="">Create Store</span>
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};
export default Register;