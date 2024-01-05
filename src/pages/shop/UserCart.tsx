import { IonBackButton, IonButton, IonButtons, IonCheckbox, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonItemDivider, IonItemOption, IonItemOptions, IonItemSliding, IonList, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { useUserCart } from "../../hooks/shop/useUserCart"

import "../../styles/v1/pages/shop/UserCart.scss"
import { storefrontOutline, trash, trashBin } from "ionicons/icons"
import { useCallback, useEffect, useMemo, useState } from "react"
import { iUserCart, iUserCartItem } from "../../requests/user-cart.request"
import { CheckboxCustomEvent } from "@ionic/core"
import { useHistory } from "react-router"

export const UserCart: React.FC = () => {


    const navigation = useHistory();
    
    const [selectedCarts, setSelectedCarts] = useState<iUserCart[]>([])

    
    const { UserCartGroupedBySeller, isUserCartGroupedBySellerLoading, refetch: refetchUserCart } = useUserCart()
    

    const totalDue = useMemo(() => {
        let total = 0;
        selectedCarts.forEach((cart) => {
            cart.items.forEach((item) => {
                total += item.variantsAndOptions.option.length > 0 ? item.variantsAndOptions.option[0].price * item.quantity : item.product.price! * item.quantity;
            })
            
        })
        return total
    }, [selectedCarts])

    
    


    const handleSelectCartProduct = (e: CheckboxCustomEvent, userCart: iUserCart) => {
        const { checked } = e.detail;
        if (checked) {
            
            setSelectedCarts(prev => {
                const current = [...prev];
                const cart = current.find((cart) => cart._id === userCart._id)
                if (!cart) {
                    current.push(userCart)
                }
                return current
            
            })
            
        } else {
            setSelectedCarts(prev => {
                return prev.filter((cart) => cart._id !== userCart._id)
            })
        }
    }

    const handleSelectedCartItemSelect = (e: CheckboxCustomEvent, cartGroup: iUserCart, userCartItem: iUserCartItem) => {
        const { checked } = e.detail;
        const selectedCartGroup = selectedCarts.find((cart) => cart._id === cartGroup._id);
        if (checked) {
            if (selectedCartGroup) {
                const selectedCartItem = selectedCartGroup.items.find((item) => item._id === userCartItem._id)
                if (!selectedCartItem) {
                    const updatedAddItems = selectedCarts.map((cart) => {
                        if (cart._id === selectedCartGroup._id) {
                            return {
                                ...cart,
                                items: [...cart.items, userCartItem]
                            }
                        } else {
                            return {
                                ...cart
                            }
                        }
                    });
                    if (updatedAddItems) setSelectedCarts(updatedAddItems)
                }
            } else {
                let cartGroupCopy = { ...cartGroup }
                cartGroupCopy.items = [userCartItem]
                setSelectedCarts([...selectedCarts, cartGroupCopy])
            }
        } else {
            if (selectedCartGroup) {

                if (selectedCartGroup.items.length <= 1) {
                    setSelectedCarts(prev => {
                        return prev.filter((cart) => cart._id !== cartGroup._id)
                    })
                } else {
                    const updatedItems = selectedCarts.map((cart) => {
                        if (cart._id === selectedCartGroup._id) {
                            return {
                                ...cart,
                                items: cart.items.filter((item) => item._id !== userCartItem._id)
                            }   
                        } else {
                            return {...cart}
                        }
                    })
                    
                    if (updatedItems) setSelectedCarts(updatedItems)
                    
                }
            }
        }
    }

    const isItemChecked = (cartGroup: iUserCart, userCartItem: iUserCartItem) => {
        const selectedCart = selectedCarts.find((cart) => cart._id === cartGroup._id)?.items.find((item) => item._id === userCartItem._id)
        if (selectedCart) {
            return true
        }
        return false
    }


    const isGroupChecked = (cartGroup: iUserCart) => {
        const selectedCart = selectedCarts.find((cart) => cart._id === cartGroup._id)

        if (selectedCart && selectedCart.items.length > 0) {
            return true
        }
        return false
    }

    const handleCheckout = () => {
        navigation.push("/shop/cart/checkout", selectedCarts )
    }

    const isCheckoutable = () => {
        return selectedCarts.length > 0
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
                    { UserCartGroupedBySeller && UserCartGroupedBySeller.length === 0 ? (
                        <IonRow>
                            <IonCol size="12">
                                Cart is empty.
                            </IonCol>
                        </IonRow>
                    ): null }
                    { UserCartGroupedBySeller && [...UserCartGroupedBySeller].map((cartGroup) => (
                        <IonRow key={cartGroup._id}>
                            <IonCol size="12" class="cart-header">
                                <div className="shop-name">
                                    <IonCheckbox checked={ isGroupChecked(cartGroup) } onIonChange={(e) => handleSelectCartProduct(e, cartGroup)}></IonCheckbox>
                                    <IonIcon icon={ storefrontOutline }></IonIcon>
                                    { cartGroup.shopProfile.shopName }
                                </div>
                                <div>
                                    <IonButton fill="clear">
                                        <IonIcon size="small" slot="icon-only" icon={ trashBin }></IonIcon>
                                    </IonButton>
                                </div>
                            </IonCol>
                            <IonCol size="12">
                                <IonList lines="none">

                                { cartGroup.items.map((cart_item) => (
                                    <IonItemSliding className="product-details" key={cart_item._id}>
                                        <IonItem>
                                        <IonCheckbox slot="start"
                                            onIonChange={(e) => handleSelectedCartItemSelect(e, cartGroup, cart_item)} 
                                            checked={ isItemChecked(cartGroup, cart_item) }
                                        ></IonCheckbox>
                                        
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
                                        <IonItemOptions>
                                            <IonItemOption color={"danger"}>
                                                Delete
                                            </IonItemOption>
                                        </IonItemOptions>
                                        
                                    </IonItemSliding>
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
                        <IonButton disabled={!isCheckoutable()} color={"primary"} fill="solid" onClick={handleCheckout}>Checkout</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    )
}