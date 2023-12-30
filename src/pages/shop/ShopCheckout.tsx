import { IonBackButton, IonButton, IonButtons, IonCheckbox, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonList, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { useHistory } from "react-router";
import DeliverAddressSelect from "./components/DeliveryAddressSelect";
import { iUserCart } from "../../requests/user-cart.request";
import { useMemo, useState } from "react";
import { storefront, storefrontOutline, trashBin } from "ionicons/icons";

import "../../styles/v1/pages/shop/ShopCheckout.scss"
import { iUserAddress } from "../../requests/user-address.request";

export const ShopCheckout: React.FC = () => {

    const navigation = useHistory();

    const selectedCarts = navigation.location.state as iUserCart[];

    const totalDue = useMemo(() => {
        if (!selectedCarts) return 0;
        let total = 0;
        selectedCarts.forEach((cart) => {
            cart.items.forEach((item) => {
                total += item.variantsAndOptions.option.length > 0 ? item.variantsAndOptions.option[0].price * item.quantity : item.product.price! * item.quantity;
            })
            
        })
        return total;
    }, [selectedCarts])

    const [selectedAddress, setSelectedAddress] = useState<iUserAddress>({} as iUserAddress)

    return (
        <IonPage id="shop-checkout">
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/shop/cart"></IonBackButton>
                    </IonButtons>
                    Checkout
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <DeliverAddressSelect value={ selectedAddress } onChange={(address) => setSelectedAddress(address)} />
                {/* { JSON.stringify(selectedCarts) }  */}
                {/* { JSON.stringify(navigation.location.state) } */}
                <IonGrid>
                    { selectedCarts && [...selectedCarts].map((cartGroup) => (
                        <IonRow key={cartGroup._id}>
                            <IonCol size="12" class="cart-header">
                                <div className="shop-name">
                                    <IonIcon icon={ storefrontOutline }></IonIcon> { cartGroup.shopProfile.shopName }
                                </div>
                            </IonCol>
                            <IonCol size="12">
                                <IonList lines="none">

                                { cartGroup.items.map((cart_item) => (
                                        <IonItem className="product-details" key={cart_item._id}>
                                        
                                        <IonImg src={ cart_item.files[0].thumbnail_location }></IonImg>
                                        <div className="product-info">
                                            <div className="product-name">
                                                { cart_item.product.productName }
                                            </div>
                                            <div className="product-price">
                                                
                                                ₱{ cart_item.variantsAndOptions.option.length > 0 ? cart_item.variantsAndOptions.option[0].price:  cart_item.product.price} x { cart_item.quantity }
                                            </div>
                                            
                                        </div>
                                        </IonItem>
                                )) }
                                </IonList>
                            </IonCol>
                        </IonRow>
                    )) }
                </IonGrid>
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <IonTitle>Total: ₱ { totalDue }</IonTitle>
                    <IonButtons slot="end">
                        <IonButton color={"primary"} fill="solid">Place Order</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    )
}

export default ShopCheckout;