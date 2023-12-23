import { FC, useState } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow, useIonAlert, useIonLoading, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonList, IonListHeader, IonItem, IonLabel, IonInput, useIonPicker, IonDatetime, IonModal, IonDatetimeButton, useIonToast, IonSelect, IonSelectOption } from "@ionic/react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { SET_DOB, SET_GENDER, SET_SUPPORTING_DOCUMENTS_TYPE, iAccountProfile, supportDocuments } from "../../../store/account-profile";
import { format, parseISO } from "date-fns";
import { saveAccountProfileToAPI } from "../../../requests/account-profile.request";
import { useAccountProfile } from "../../../hooks/account-profile/useAccountProfile";
import ImageUpload from "../../../components/ImageUpload";
export interface iProps {}
export const AccountProfile: FC<iProps> = (props): JSX.Element => {
    const navigation = useHistory();
    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();
    const [presentToast] = useIonToast();

    const dispatch = useDispatch()

    const [presentGenderPicker] = useIonPicker()

    const accountProfile = useAccountProfile();
    
    const { name, gender, dob, phone, supportingDocumentsType, supportingDocumentImage: docsImages, files, verificationStatus, isVerified } = useSelector((state: RootState) => state.accountProfileStore)

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
        dispatch(SET_DOB(value))
    }

    const onSupportingDocsTypeChange = (value: string) => {
        dispatch(SET_SUPPORTING_DOCUMENTS_TYPE(value));
    }

    
    const [supportingDocumentImage, setSupportingDocumentImage] = useState<supportDocuments | undefined>(docsImages)

    const documentTypes = [
        "UMID",
        "Passport",
        "SSS",
        "TIN ID",
        "Driver's License",
        "Voter's ID",
        "PhilPost ID",
        "PhilSys National ID",
        "PRC ID",
    ];


    const saveAccountProfile = async () => {
        let params: iAccountProfile = {
            name, gender, dob, phone, supportingDocumentsType, supportingDocumentImage
        }
        
        try {
            await present();
            const result = await saveAccountProfileToAPI(params)            
            await presentToast(result.message, 5000)
            navigation.replace("/account-settings")
        } catch (err: any) {
            // console.log(err.response.data.mesasge)
            presentToast(err.response.data.message, 5000)
            navigation.goBack()
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
                        <IonLabel>Date of Birth </IonLabel>
                        <IonDatetimeButton datetime="dob"></IonDatetimeButton>
                        <IonModal keepContentsMounted={true}>
                            <IonDatetime 
                                showDefaultButtons 
                                id="dob" 
                                presentation="date" 
                                value={new Date(dob === "" || dob === null ? `01/01/2001 15:00:00` : `${dob}`).toISOString()}
                                onIonChange={(e) => onDOBChange(e.detail.value!)}
                            ></IonDatetime>
                        </IonModal>
                    </IonItem>
                    <IonItem>
                        <IonSelect label="ID Type" value={supportingDocumentsType} placeholder="Select" onIonChange={e => onSupportingDocsTypeChange(e.detail.value!)}>
                            {documentTypes.map(type => (
                                <IonSelectOption value={type} key={type}>{type}</IonSelectOption>
                            ))}
                        </IonSelect>
                    </IonItem>
                    { files && files.length > 0 ? (
                        <IonItem>
                            <div style={{ display: 'flex', flexDirection: 'column', padding: '16px 0px' }}>
                                <IonLabel style={{ marginBottom: '10px' }}>Supporting Documents</IonLabel>
                                
                                <div>
                                    { files && files.length > 0 ? files.map((file => (
                                        <img src={file.thumbnail_location} key={file._id} style={{ height: '50px', width: '50px', border: "thin solid var(--ion-color-primary)", objectFit: 'contain', marginRight: '5px' }} />
                                    ))) : null }
                                </div>
                            </div>
                        </IonItem>
                    ): null }
                    { verificationStatus !== undefined && ["Failed", null].includes(verificationStatus) ? (
                    <IonItem>
                        <div style={{ display: 'flex', flexDirection: 'column', padding: '16px 0px' }}>
                            <IonLabel style={{ marginBottom: '10px' }}>Submit Documents</IonLabel>
                            
                            <div>
                                
                                <ImageUpload onChange={(images, thumbs) => setSupportingDocumentImage({images, thumbs})} min={1} max={2} />
                            </div>
                        </div>
                    </IonItem>
                    ): null  }
                    <IonItem button detail routerLink="/account-settings/profile/set-phone">
                        <IonLabel>
                            Phone Number
                        </IonLabel>
                        { phone }
                    </IonItem>
                    { verificationStatus && verificationStatus !== null ? (
                    <IonItem button>
                        <IonLabel>
                            Verification Status
                        </IonLabel>
                        { verificationStatus }
                    </IonItem>
                    ): null }
                </IonList>
            </IonContent>
        </IonPage>
    )
};
export default AccountProfile;