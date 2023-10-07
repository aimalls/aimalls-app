import { FC, useEffect, useState } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow, useIonAlert, useIonLoading, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonInput, useIonToast } from "@ionic/react";
import { useHistory } from "react-router";
import { SET_PHONE, iAccountProfile } from "../../../store/account-profile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
export interface iProps {}
export const SetPhoneNumber: FC<iProps> = (props): JSX.Element => {
    const navigation = useHistory();
    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();
    const [presentToast] = useIonToast();

    const dispatch = useDispatch()

    const { phone } = useSelector((state: RootState) => state.accountProfileStore)

    const [phoneNumber, setPhoneNumber] = useState<iAccountProfile['phone']>(phone)

    const savePhoneNumber = async () => {
        if (phoneNumber.match(/^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/)) {
            dispatch(SET_PHONE(phoneNumber))
            navigation.replace("/account-settings/profile")
        } else {
            await presentToast("Invalid Phone Number", 5000)
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/account-settings/profile"></IonBackButton>
                    </IonButtons>
                    <IonTitle className="ion-text-center">Set Phone</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={savePhoneNumber}>Save</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">

                            <IonInput
                                value={phoneNumber}
                                labelPlacement="floating"
                                fill="solid"
                                type="tel"
                                placeholder="Input your Phone Number"
                                label="Phone:"
                                onIonInput={(e) => setPhoneNumber(e.detail.value!)}
                            />
                        </IonCol>
                        
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};
export default SetPhoneNumber;