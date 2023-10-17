import { FC } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow, useIonAlert, useIonLoading, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonList, IonListHeader, IonItem, IonLabel, IonChip } from "@ionic/react";
import { useHistory } from "react-router";
import { useUserAddress } from "../../../hooks/user-address/useUserAddress";
import { iUserAddress } from "../../../requests/user-address.request";
export interface iProps {}
export const Addresses: FC<iProps> = (props): JSX.Element => {
    const navigation = useHistory();
    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();

    const { userAddresses, userAddressesLoading } = useUserAddress();

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
                        <IonCol size="12">
                            <IonList lines="full">
                                <IonListHeader>
                                    User Addresses
                                </IonListHeader>
                                { userAddresses && userAddresses.length !== 0 ? (
                                    userAddresses.map((address: iUserAddress) => (
                                        <IonItem key={address._id}>
                                            <div style={{ display: "flex", flexDirection: "column", padding: "10px 0px" }}>
                                                <div>
                                                    { `${address.contactName} | ${address.contactNumber}` }
                                                </div>
                                            
                                                <div style={{ textOverflow: "unset", marginTop: "10px" }}>
                                                    { 
                                                        `${address.streetBuildingHouse} 
                                                        ${address.barangay.name} ,
                                                        ${address.city.name} ,
                                                        ${address.province.name} ,
                                                        ${address.region.name} ,
                                                        ${address.postalCode}
                                                        ` }
                                                </div>
                                                <div style={{ marginTop: "10px" }}>
                                                    { address.default ? (
                                                        <IonChip color={"primary"}>Default</IonChip>
                                                    ) : null }
                                                </div>
                                            </div>
                                        </IonItem>
                                    ))
                                    
                                ) : (
                                    <IonItem>
                                        <IonLabel>No Addresses Found.</IonLabel>
                                    </IonItem>
                                ) }
                            </IonList>

                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};
export default Addresses;