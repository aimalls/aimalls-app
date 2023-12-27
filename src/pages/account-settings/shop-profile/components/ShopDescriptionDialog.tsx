import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonModal, IonRow, IonTextarea, IonTitle, IonToolbar } from "@ionic/react"
import { useEffect, useRef, useState } from "react"
import { SET_SHOP_DESCRIPTION, SET_SHOP_NAME, iShopProfile } from "../../../../store/shop-profile"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../../store"


export const ShopDescriptionDialog: React.FC = () => {

    const dispatch = useDispatch();

    const shopDescriptionDialog = useRef<HTMLIonModalElement>(null)
    
    const { shopDescription } = useSelector((state: RootState) => state.shopProfileStore);

    const [shopDescriptionInput, setShopDescriptionInput] = useState<iShopProfile['shopDescription']>(shopDescription)


    useEffect(() => {
        setShopDescriptionInput(shopDescription)
    }, [shopDescription])

    const handleSaveShopDescription = () => {
        dispatch(SET_SHOP_DESCRIPTION(shopDescriptionInput))
        shopDescriptionDialog.current?.dismiss()
    }

    return (
        <IonModal
            trigger="shop-description-dialog-trigger"
            ref={shopDescriptionDialog}
        >
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={() => shopDescriptionDialog.current?.dismiss()}>Close</IonButton>
                    </IonButtons>
                    <IonTitle className="ion-text-center">
                        Set Shop Description
                    </IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => handleSaveShopDescription()}>Save</IonButton>
                    </IonButtons>

                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            <IonTextarea
                                value={shopDescriptionInput}
                                placeholder="Set Shop Description" 
                                label="Shop Description:"
                                labelPlacement="floating"
                                onIonInput={(e) => setShopDescriptionInput(e.detail.value!)}
                            ></IonTextarea>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonModal>
    )
}

export default ShopDescriptionDialog;