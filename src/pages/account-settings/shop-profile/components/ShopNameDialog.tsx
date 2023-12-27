import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonModal, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { useEffect, useRef, useState } from "react"
import { SET_SHOP_NAME, iShopProfile } from "../../../../store/shop-profile"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../../store"


export const ShopNameDialog: React.FC = () => {

    const dispatch = useDispatch();

    const shopNameDialog = useRef<HTMLIonModalElement>(null)
    
    const { shopName } = useSelector((state: RootState) => state.shopProfileStore);

    const [shopNameInput, setShopNameInput] = useState<iShopProfile['shopName']>("")

    useEffect(() => {
        setShopNameInput(shopName)
    }, [shopName])

    const handleSaveShopName = () => {
        dispatch(SET_SHOP_NAME(shopNameInput))
        shopNameDialog.current?.dismiss()
    }

    return (
        <IonModal
            trigger="shop-name-dialog-trigger"
            ref={shopNameDialog}
        >
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={() => shopNameDialog.current?.dismiss()}>Close</IonButton>
                    </IonButtons>
                    <IonTitle className="ion-text-center">
                        Set Shop Name
                    </IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => handleSaveShopName()}>Save</IonButton>
                    </IonButtons>

                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            <IonInput
                                value={shopNameInput}
                                type="text" 
                                placeholder="Set Shop Name" 
                                label="Shop Name:"
                                labelPlacement="floating"
                                onIonInput={(e) => setShopNameInput(e.detail.value!)}
                            ></IonInput>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonModal>
    )
}

function dispatch(arg0: { payload: string; type: "shop-profile-store/SET_SHOP_NAME" }) {
    throw new Error("Function not implemented.")
}
