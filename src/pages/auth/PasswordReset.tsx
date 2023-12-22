import { IonPage, IonContent, IonGrid, IonCol, IonInput, IonRow, IonButton, IonIcon, useIonAlert, useIonLoading, IonHeader, IonToolbar, useIonToast } from "@ionic/react";
import { FC, useMemo, useState } from "react";
import { eyeOff, eye, arrowForward } from "ionicons/icons";
import "../../styles/v1/pages/auth/Register.scss"
import { iRegistrationForm, processLegacyRegistrationToAPI, processResetPasswordToAPI } from "../../requests/auth.request";
import { useHistory, useParams } from "react-router";

import logoRobot from "../../assets/images/logo-robot.png"
import { getOTPFromAPI } from "../../requests/otp.request";
import { set } from "date-fns";

export interface iProps { }

export const PasswordReset: FC<iProps> = (props): JSX.Element => {


    const [presentAlert] = useIonAlert();
    const [present, dismiss] = useIonLoading();
    const [presentToast] = useIonToast();

    const navigation = useHistory();

    const { email } = useParams<{ email: string }>();
    

    const [passwordResetForm, setPasswordResetForm] = useState({
        email: email,
        password: '',
        confirm_password: '',
        otp: ''
    })

    const [otpSent, setOtpSent] = useState(false);

    const handlePasswordResetForm = (key: string, value: string) => {
        setPasswordResetForm((current) => {
            let curr = { ...current };

            curr[key as keyof typeof curr] = value;

            return curr;
        })
    }

    const processPasswordReset = async () => {
        await present();
        try {
            const result = await processResetPasswordToAPI(passwordResetForm)
            navigation.replace("/login")
            presentToast(result.data.message, 5000);
        } catch (error: any) {
            presentAlert(error.response.data)
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
                        <IonCol size="8" className="page-title">
                            Password Reset
                        </IonCol>
                        <IonCol size="12" className="form">

                            <IonInput
                                type="password"
                                label="Password"
                                fill="solid"
                                value={passwordResetForm.password}
                                labelPlacement="floating"
                                onIonInput={(e) => handlePasswordResetForm("password", e.detail.value!)}
                            >
                            </IonInput>
                            <IonInput
                                type="password"
                                label="Confirm Password"
                                fill="solid"
                                value={passwordResetForm.confirm_password}
                                labelPlacement="floating"
                                onIonInput={(e) => handlePasswordResetForm("confirm_password", e.detail.value!)}
                            >
                            </IonInput>
                            <IonInput
                                type="number"
                                label="OTP"
                                fill="solid"
                                value={passwordResetForm.otp}
                                labelPlacement="floating"
                                onIonInput={(e) => handlePasswordResetForm("otp", e.detail.value!)}
                            >
                            </IonInput>
                        </IonCol>
                        <IonCol size="12" className="form-button">
                            <IonButton size="default" expand="block" shape="round" onClick={() => processPasswordReset()}>
                                <span slot="">Reset Password</span>
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};
export default PasswordReset;