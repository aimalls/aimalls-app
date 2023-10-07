import { FC, useEffect, useState } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow, useIonAlert, useIonLoading, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonInput } from "@ionic/react";
import { useHistory } from "react-router";
import { SET_NAME, iAccountProfile } from "../../../store/account-profile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
export interface iProps {}
export const SetName: FC<iProps> = (props): JSX.Element => {
    const navigation = useHistory();
    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();

    const dispatch = useDispatch()

    const { name } = useSelector((state: RootState) => state.accountProfileStore)

    const [profileName, setProfileName] = useState<iAccountProfile['name']>({
        first_name: name.first_name,
        middle_name: name.last_name,
        last_name: name.last_name,
        suffix: name.suffix
    })

    const handleNameChange = (key: string, value: string) => {
        setProfileName(prev => {
            let current = {...prev}
            current[key as keyof typeof prev] = value;
            return current;
        })
    }

    const saveSetName = () => {
        dispatch(SET_NAME(profileName))
        navigation.replace("/account-settings/profile")
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/account-settings/profile"></IonBackButton>
                    </IonButtons>
                    <IonTitle className="ion-text-center">Set Name</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={saveSetName}>Save</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            <IonInput
                                value={profileName.first_name}
                                labelPlacement="floating"
                                fill="solid"
                                type="text"
                                placeholder="Input First Name"
                                label="First Name:"
                                onIonInput={(e) => handleNameChange("first_name", e.detail.value!)}
                            />
                        </IonCol>
                        <IonCol size="12">
                            <IonInput
                                value={profileName.middle_name}
                                labelPlacement="floating"
                                fill="solid"
                                type="text"
                                placeholder="Input Middle Name"
                                label="Middle Name:"
                                onIonInput={(e) => handleNameChange("middle_name", e.detail.value!)}
                            />
                        </IonCol>
                        <IonCol size="12">
                            <IonInput
                                value={profileName.last_name}
                                labelPlacement="floating"
                                fill="solid"
                                type="text"
                                placeholder="Input Last Name"
                                label="Last Name:"
                                onIonInput={(e) => handleNameChange("last_name", e.detail.value!)}
                            />
                        </IonCol>
                        <IonCol size="12">
                            <IonInput
                                value={profileName.suffix}
                                labelPlacement="floating"
                                fill="solid"
                                type="text"
                                placeholder="Input Suffix, E.g Jr, Sr III"
                                label="Suffix(optional):"
                                onIonInput={(e) => handleNameChange("suffix", e.detail.value!)}
                            />
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};
export default SetName;