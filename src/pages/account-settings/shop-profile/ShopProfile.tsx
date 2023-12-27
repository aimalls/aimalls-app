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
import { useShopProfile } from "../../../hooks/shop-profile/useShopProfile";
import { iShopProfile } from "../../../store/shop-profile";
import { saveShopProfileToAPI, shopProfileParams } from "../../../requests/shop-profile.request";
import { ShopNameDialog } from "./components/ShopNameDialog";
import ShopDescriptionDialog from "./components/ShopDescriptionDialog";
export interface iProps {}
export const ShopProfile: FC<iProps> = (props): JSX.Element => {
    const navigation = useHistory();
    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();
    const [presentToast] = useIonToast();

    const dispatch = useDispatch()

    const [presentGenderPicker] = useIonPicker()

    const ShopProfile = useShopProfile();
    
    const { shopName, shopDescription, verificationStatus, isVerified } = useSelector((state: RootState) => state.shopProfileStore)

    
    

    const saveAccountProfile = async () => {
        let params: shopProfileParams = {
           shopName, shopDescription
        }
        
        try {
            await present();
            const result = await saveShopProfileToAPI(params)            
            await presentToast(result.message, 5000)
            navigation.replace("/account-settings")
        } catch (err: any) {
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
                    <IonTitle className="ion-text-center">Shop Profile</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={saveAccountProfile}>Save</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList lines="full">
                    <IonListHeader>
                        Shop Info.
                    </IonListHeader>
                    <IonItem button detail id="shop-name-dialog-trigger">
                        <IonLabel>
                            Shop Name
                        </IonLabel>
                        <IonLabel className="ion-text-right">
                            { shopName }
                        </IonLabel>
                        <ShopNameDialog />
                    </IonItem>
                    <IonItem button detail id="shop-description-dialog-trigger">
                        <IonLabel>
                            Shop Description
                        </IonLabel>
                        <IonLabel className="ion-text-right">
                            { shopDescription }
                        </IonLabel>
                        <ShopDescriptionDialog />
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
export default ShopProfile;