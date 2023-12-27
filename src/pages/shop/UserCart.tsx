import { IonBackButton, IonButton, IonButtons, IonCheckbox, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonImg, IonItemDivider, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { useUserCart } from "../../hooks/shop/useUserCart"

import "../../styles/v1/pages/shop/UserCart.scss"
import { trashBin } from "ionicons/icons"
import { useMemo, useState } from "react"
import { iUserCart } from "../../requests/user-cart.request"
import { CheckboxCustomEvent } from "@ionic/core"

export const UserCart: React.FC = () => {

    const { UserCart, isUserCartLoading, refetch: refetchUserCart } = useUserCart()

    const [selectedCarts, setSelectedCarts] = useState<iUserCart[]>([])

    const totalDue = useMemo(() => {
        return selectedCarts.reduce((acc, cart) => acc + (cart.variantsAndOptions[0].option.price * cart.quantity), 0)
    }, [selectedCarts])

    const handleSelectCartProduct = (e: CheckboxCustomEvent, userCart: iUserCart) => {
        const { checked } = e.detail;
        if (checked) {
            setSelectedCarts([...selectedCarts, userCart])
        } else {
            setSelectedCarts(selectedCarts.filter((cart) => cart._id !== userCart._id))
        }
    }

    return (
        <IonPage id="user-cart">
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/shop"></IonBackButton>
                    </IonButtons>
                    Shopping Cart
                    
                </IonToolbar>
                
            </IonHeader>
            <IonContent>
                <IonGrid>
                    { UserCart && UserCart.map((cart) => (

                        <IonRow key={cart._id}>
                            <IonCol size="12" class="cart-header">
                                <div className="shop-name">
                                    <IonCheckbox onIonChange={(e) => handleSelectCartProduct(e, cart)}></IonCheckbox>{ cart.shopProfile.shopName }
                                </div>
                                <div>
                                    <IonButton fill="clear">
                                        <IonIcon size="small" slot="icon-only" icon={ trashBin }></IonIcon>
                                    </IonButton>
                                </div>
                            </IonCol>
                            <IonCol size="12" className="product-details">
                                <IonImg src={ cart.files[0].thumbnail_location }></IonImg>
                                <div className="product-info">
                                    <div className="product-name">
                                        { cart.product.productName }
                                    </div>
                                    <div className="product-price">
                                        ₱{ cart.variantsAndOptions[0].option.price } x { cart.quantity }
                                    </div>
                                    
                                </div>
                            </IonCol>
                            <IonCol size="12">
                                <IonItemDivider></IonItemDivider>
                            </IonCol>
                        </IonRow>
                        
                    )) }
                </IonGrid>
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <IonTitle>Total: ₱ { totalDue }</IonTitle>
                    <IonButtons slot="end">
                        <IonButton color={"primary"} fill="solid">Checkout</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    )
}