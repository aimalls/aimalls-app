import { IonPage, IonContent, IonGrid, IonCol, IonInput, IonRow, IonButton, IonIcon, useIonAlert, useIonLoading, IonHeader, IonToolbar, useIonToast } from "@ionic/react";
import { FC, useMemo, useState } from "react";
import { eyeOff, eye, arrowForward } from "ionicons/icons";
import "../../styles/v1/pages/auth/Register.scss"
import { iRegistrationForm, processLegacyRegistrationToAPI } from "../../requests/auth.request";
import { useHistory } from "react-router";

import logoRobot from "../../assets/images/logo-robot.png"
import { getOTPFromAPI } from "../../requests/otp.request";
import { set } from "date-fns";

export interface iProps { }

export const Register: FC<iProps> = (props): JSX.Element => {


    const [presentAlert] = useIonAlert();
    const [present, dismiss] = useIonLoading();
    const [presentToast] = useIonToast();

    const navigation = useHistory();
    

    const [registrationForm, setRegistrationForm] = useState<iRegistrationForm>({
        email: '',
        password: '',
        confirm_password: '',
        otp: ''
    })

    const [otpSent, setOtpSent] = useState(false);

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
            presentAlert(error.response.data)
        } finally {
            await dismiss();
        }
    }

    const sendCode = async () => {
        // logic to send verification code.
        try {
            await present();
            const otpResult = await getOTPFromAPI(registrationForm.email, "register"); // call API to generate and send OTP
            await presentToast(otpResult.data.message, 5000)
            setOtpSent(true);
        } catch (err: any) {
            presentAlert(err.response.data.error)
        } finally {
            await dismiss();
        }
    }

    const canResendCountdown = useMemo(() => {
        if(otpSent) {
            return setTimeout(() => {
            setOtpSent(false);
            }, 60000); // 1 minute
        }
        return null;
    },[otpSent])

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
                                label="Email"
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
                            <IonInput
                                disabled={!otpSent && registrationForm.otp == ""}
                                type="number"
                                label="OTP"
                                fill="solid"
                                value={registrationForm.otp}
                                labelPlacement="floating"
                                onIonInput={(e) => handleRegistrationFormChange("otp", e.detail.value!)}
                            >
                            </IonInput>
                        </IonCol>
                        <IonCol size="12" style={{ display: 'flex', justifyContent: 'end' }}>
                            <IonButton size="small" fill="clear" routerLink="/login">Already have store?
                                <IonIcon slot="end" icon={arrowForward}></IonIcon>
                            </IonButton>
                        </IonCol>
                        <IonCol size="12" className="form-button">
                            <IonButton disabled={otpSent} size="default" expand="block" shape="round" onClick={() => sendCode()}>
                                <span slot="">Send Code</span>
                            </IonButton>
                        </IonCol>
                        <IonCol size="12" className="form-button">
                            <IonButton disabled={!otpSent && registrationForm.otp == ""} size="default" expand="block" shape="round" onClick={() => processRegistration()}>
                                <span slot="">Register</span>
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};
export default Register;