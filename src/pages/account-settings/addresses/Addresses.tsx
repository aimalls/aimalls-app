import { FC, useEffect } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow, useIonAlert, useIonLoading, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonList, IonListHeader, IonItem, IonLabel, IonChip, IonIcon } from "@ionic/react";
import { useHistory } from "react-router";
import { useUserAddress } from "../../../hooks/user-address/useUserAddress";
import { iUserAddress, processAddressDeleteToAPI } from "../../../requests/user-address.request";
import { pencilOutline, trashBinOutline } from "ionicons/icons";
import "../../../styles/v1/pages/account-settings/Addresses.scss"
import { useDispatch } from "react-redux";
import { SET_SELECTED_ADDRESS } from "../../../store/address";
export interface iProps {}
export const Addresses: FC<iProps> = (props): JSX.Element => {
    const navigation = useHistory();
    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();
    const dispatch = useDispatch()


    const { userAddresses, userAddressesLoading, refetchAddresses } = useUserAddress();

    const handleProcessAddressDelete = async (address: iUserAddress) => {
        presentAlert({
            header: "Delete Address",
            message: "Are you sure you want to delete this address?",
            buttons: [
                {
                    text: "Yes",
                    handler: async () => {
                        try {
                        await present();
                        await processAddressDeleteToAPI(address._id);
                        refetchAddresses();
                        } catch (error: any) {
                        presentAlert({
                            header: "Delete Failed",
                            message: error.message,
                            buttons: [{ text: "Ok" }],
                        });
                        } finally {
                        await dismiss();
                        }
                    }
                },
                {
                    text: "No",
                    handler: () => {}
                }
            ],
        })
    }

    const handleEditAddress = (address: iUserAddress) => {
        dispatch(SET_SELECTED_ADDRESS(address))
        navigation.push("/account-settings/addresses/edit-address");
    }

    return (
        <IonPage id="addresses">
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
                                        <IonItem key={address._id} disabled={address.isDeleted}>
                                            <div style={{ display: "flex", flexDirection: "column", padding: "10px 0px" }}>
                                                <div style={{ marginBottom: '20px', fontWeight: 'bold' }}>
                                                    { `${address.label} Address` }
                                                </div>
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
                                                <div className="action-buttons">
                                                    <IonButton size="small" fill="clear" onClick={() => handleProcessAddressDelete(address)}>
                                                        <IonIcon icon={ trashBinOutline }></IonIcon>
                                                    </IonButton>
                                                    <IonButton size="small" fill="clear" onClick={() => handleEditAddress(address)}>
                                                        <IonIcon icon={ pencilOutline }></IonIcon>
                                                    </IonButton>
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