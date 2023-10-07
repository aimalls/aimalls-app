import { FC } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow, useIonAlert, useIonLoading, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle } from "@ionic/react";
import { useHistory } from "react-router";
export interface iProps {}
export const Addresses: FC<iProps> = (props): JSX.Element => {
    const navigation = useHistory();
    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/account-settings"></IonBackButton>
                    </IonButtons>
                    <IonTitle className="ion-text-center">Addresses</IonTitle>
                    <IonButtons slot="end">
                        <IonButton routerLink="/account-settings/addresses/add-new">Add</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="page-title">{"Addresses"}</span>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};
export default Addresses;