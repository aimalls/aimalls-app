import { FC } from "react";
import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonList, IonListHeader, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert, useIonLoading } from "@ionic/react";
import { useHistory } from "react-router";
export interface iProps {}
export const AccountSetting: FC<iProps> = (props): JSX.Element => {
    const navigation = useHistory();
    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons style={{ position: 'fixed'}} slot="start">
                        <IonBackButton defaultHref="/dashboard"></IonBackButton>
                    </IonButtons>
                    <IonTitle className="ion-text-center">Account Settings</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList lines="full">
                    <IonListHeader>Account</IonListHeader>
                    <IonItem button detail routerLink="/account-settings/profile">Account Profile</IonItem>
                    <IonItem button detail>Verifications</IonItem>
                    <IonItem button detail routerLink="/account-settings/addresses">Addresses</IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    )
};
export default AccountSetting;