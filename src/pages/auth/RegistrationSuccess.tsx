import { FC } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonPage, IonRow } from "@ionic/react";
import { mail } from "ionicons/icons"
export interface iProps {}
import "../../styles/v1/pages/auth/Register.scss"
export const RegistrationSuccess: FC<iProps> = (props): JSX.Element => {

    return (
        <IonPage id="register-success">
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12" className="text-center" style={{display: 'flex', justifyContent: 'center' }}>
                            <IonIcon icon={ mail } color="light" style={{ fontSize: '5rem' }}></IonIcon>
                        </IonCol>
                        <IonCol size="12" className="ion-padding ion-text-center" style={{ color: '#FFF', fontWeight: 'bold', fontSize: '20px' }}>
                            Registration Successful!, Please check your email to validate your registration.
                        </IonCol>
                        <IonCol size="12" className="form-button">
                            <IonButton size="large" expand="block" shape="round" routerLink="/login">
                                <span slot="">Proceed to Login</span>
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};
export default RegistrationSuccess;