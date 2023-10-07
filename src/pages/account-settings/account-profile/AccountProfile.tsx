import { FC } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow, useIonAlert, useIonLoading, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonList, IonListHeader, IonItem, IonLabel, IonInput, useIonPicker, IonDatetime, IonModal, IonDatetimeButton, useIonToast } from "@ionic/react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { SET_DOB, SET_GENDER } from "../../../store/account-profile";
import { format, parseISO } from "date-fns";
import { saveAccountProfileToAPI } from "../../../requests/account-profile.request";
import { useAccountProfile } from "../../../hooks/account-profile/useAccountProfile";
export interface iProps {}
export const AccountProfile: FC<iProps> = (props): JSX.Element => {
    const navigation = useHistory();
    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();
    const [presentToast] = useIonToast();

    const dispatch = useDispatch()

    const [presentGenderPicker] = useIonPicker()

    const accountProfile = useAccountProfile();
    
    const { name, gender, dob, phone } = useSelector((state: RootState) => state.accountProfileStore)

    const genderOptions = [
        { text: "Male", value: "Male" },
        { text: "Female", value: "Female" },
        { text: "Other", value: "Other" }
    ];

    const openGenderPicker = async () => {
        const picker = await presentGenderPicker({
            columns: [
                {
                    name: "gender",
                    selectedIndex: genderOptions.map(v => v.value).indexOf(gender),
                    options: genderOptions
                }
            ],
            buttons: [
                { text: "Cancel", role: "cancel" },
                { text: "Select", handler: (value) => {
                    dispatch(SET_GENDER(value.gender.value))
                    return;
                } }
            ]
        })
    }


    const onDOBChange = (value: any) => {
        // console.log(value)
        // const formattedDate = format(parseISO(value), "MM/dd/yyyy")
        // console.log(formattedDate)
        dispatch(SET_DOB(value))
    }


    const saveAccountProfile = async () => {
        let params = {
            name, gender, dob, phone
        }
        
        try {
            await present();
            const result = await saveAccountProfileToAPI(params)            
            await presentToast(result.message, 5000)
            navigation.replace("/account-settings")
        } catch (err: any) {
            presentAlert(err)
        } finally {
            await dismiss();
        }

    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/account-settings"></IonBackButton>
                    </IonButtons>
                    <IonTitle className="ion-text-center">Account Profile</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={saveAccountProfile}>Save</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList lines="full">
                    <IonListHeader>
                        Personal Info.
                    </IonListHeader>
                    <IonItem button detail routerLink="/account-settings/profile/set-name">
                        <IonLabel>
                            Name
                        </IonLabel>
                        { `${name.first_name} ${name.middle_name} ${name.last_name} ${name.suffix}` }
                    </IonItem>
                    <IonItem button detail onClick={openGenderPicker}>
                        <IonLabel>
                            Gender
                        </IonLabel>
                        { gender }
                    </IonItem>
                    <IonItem>
                        <IonLabel>Date of Birth: </IonLabel>
                        <IonDatetimeButton datetime="dob"></IonDatetimeButton>
                        <IonModal keepContentsMounted={true}>
                            <IonDatetime 
                                showDefaultButtons 
                                id="dob" 
                                presentation="date" 
                                value={new Date(dob === "" ? `01/01/2001 15:00:00` : `${dob}`).toISOString()}
                                onIonChange={(e) => onDOBChange(e.detail.value!)}
                            ></IonDatetime>
                        </IonModal>
                    </IonItem>
                    <IonItem button detail routerLink="/account-settings/profile/set-phone">
                        <IonLabel>
                            Phone Number
                        </IonLabel>
                        { phone }
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    )
};
export default AccountProfile;