import { IonBackButton, IonButton, IonButtons, IonCheckbox, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { useHistory } from "react-router";
import DeliverAddressSelect from "./components/DeliveryAddressSelect";
import { iUserCart } from "../../requests/user-cart.request";
import { useCallback, useEffect, useMemo, useState } from "react";
import { storefront, storefrontOutline, trashBin } from "ionicons/icons";

import "../../styles/v1/pages/shop/ShopCheckout.scss"
import { iUserAddress } from "../../requests/user-address.request";
import useDeliveryOption from "../../hooks/delivery-option/useDeliveryOption";
import { useUser } from "../../hooks/auth/useUser";
import { useUserCart } from "../../hooks/shop/useUserCart";

export const ShopCheckout: React.FC = () => {

    const navigation = useHistory();

    const selectedCarts = navigation.location.state as iUserCart[];
    
    const [selectedAddress, setSelectedAddress] = useState<iUserAddress>({} as iUserAddress)
    
    const { ComputedUserCartGroupedBySeller,
        isComputedUserCartGroupedBySellerLoading,
        refetchComputedUserCartGroupedBySeller } = useUserCart(selectedCarts, selectedAddress);



    const { boxPrices, isBoxPricesLoading, refetch: refetchBoxPrices } = useDeliveryOption();


    useEffect(() => {
        if (Object.keys(selectedAddress).length > 0) {
            refetchComputedUserCartGroupedBySeller()
        }
    }, [selectedAddress])
    

    const recommendedBoxSize = useMemo(() => {
        if (boxPrices) {
            const totalDimensions = selectedCarts.reduce((acc, cart) => {
                cart.items.forEach((item) => {
                    acc += item.product.length! * item.product.width! * item.product.height! * item.quantity;
                })
                return acc;
            }, 0)
            const maxPrice = boxPrices.reduce((max, box) => {
                return box.price > max ? box.price : max;
            }, 0);
            const boxSize = boxPrices.find((box) => {
                const maxDimension = box.dimensions.length * box.dimensions.width * box.dimensions.height;
                return totalDimensions <= maxDimension;
            });
            if (boxSize) {
                return boxSize
            } else {
                return maxPrice;
            }
        }
    }, [boxPrices]);

    const totalParcelWeight = useMemo(() => {
        if (!selectedCarts) return 0;
        return selectedCarts.reduce((acc, cart) => {
            cart.items.forEach((item) => {
                acc += item.product.weight! * item.quantity;
            })
            return acc;
        }, 0)
    }, [selectedCarts]);


    // const getShippingFee = useCallback(() => {
    //     selectedCarts.reduce((acc, cart) => {

    //     })
    // }, [selectedAddress, selectedCarts, recommendedBoxSize, totalParcelWeight])
    



    const processCheckout = () => {
        let params = {
            selectedCarts,
            selectedAddress,
            recommendedBoxSize,
            totalParcelWeight,
        }
    }

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
                <IonGrid>
                    { ComputedUserCartGroupedBySeller && ComputedUserCartGroupedBySeller.selectedCarts.map((cartGroup) => (
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
                            <IonCol size="12">
                                <IonItem>
                                    <IonLabel>Due</IonLabel>
                                    <IonLabel slot="end">₱ { cartGroup.cartDue }</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Shipping Fee</IonLabel>
                                    <IonLabel slot="end">₱ { cartGroup.shippingFee.fees.total_rate }</IonLabel>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                    )) }
                </IonGrid>
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    { ComputedUserCartGroupedBySeller ? (
                    <IonTitle>Total: ₱ { ComputedUserCartGroupedBySeller.totalDue }</IonTitle>
                    ): null }
                    <IonButtons slot="end">
                        <IonButton color={"primary"} fill="solid">Place Order</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    )
}

export default ShopCheckout;