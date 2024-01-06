import { IonRow, IonCol, IonIcon, IonList, IonItem, IonImg, IonLabel, IonButton } from "@ionic/react"
import { storefrontOutline, paperPlaneOutline } from "ionicons/icons"
import { SellerData } from "../../../../requests/order.request"
import DeliverAddressSelect from "../../../shop/components/DeliveryAddressSelect"

type OrderDetailsProps = {
    order: SellerData
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {

    

    return (
        <div id="order-details">
            <DeliverAddressSelect value={ order.deliveryAddress } />
                        
            <div className="order-details-wrapper">
                
                <IonRow key={order.orderDetail._id}>
                    <IonCol size="12" class="cart-header">
                        <div className="shop-name">
                            <IonIcon icon={ storefrontOutline }></IonIcon> { order.orderDetail.shopProfile.shopName }
                        </div>
                    </IonCol>
                    { order.orderDetail.shipping !== null ? (
                    <IonCol size="12" className="shipping-info">
                        <div className="header">
                            <IonIcon icon={ paperPlaneOutline }></IonIcon> Shipping Information
                        </div>
                        <div className="shipping-detail">
                            <div className="shipping-type">
                                { order.orderDetail.shipping.bookingDetail.type }
                            </div>
                            <div className="shipping-courier">
                                { order.orderDetail.shipping.courier }
                            </div>
                            <div className="tracking-number">
                                { order.orderDetail.shipping.bookingDetail.tracking_number }
                            </div>
                        </div>
                    </IonCol>
                    ) : null }
                    <IonCol size="12">
                        <IonList lines="none">

                        { order.orderDetail.items.map((cart_item) => (
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
                            <div className="due-breakdown">
                                <div>
                                    <IonLabel>Due</IonLabel>
                                    <IonLabel slot="end">₱ { order.orderDetail.cartDue }</IonLabel>
                                </div>
                                <div>
                                    <IonLabel>Shipping Fee</IonLabel>
                                    <IonLabel slot="end">₱ { order.orderDetail.shippingFee.fees.total_rate }</IonLabel>
                                </div>
                            </div>
                        </IonItem>
                        <IonItem>
                            <IonLabel>Total</IonLabel>
                            <IonLabel className="ion-text-right">₱ { order.orderDetail.cartDueWithShipping }</IonLabel>
                        </IonItem>
                    </IonCol>
                </IonRow>
            </div>
            <div>
                <IonRow>
                    <IonCol size="12">
                        <IonList lines="full">
                            <IonItem>
                                <IonLabel>Order Total</IonLabel>
                                <IonLabel class="ion-text-right">
                                    ₱ { order.orderTotal }
                                </IonLabel>
                            </IonItem>
                        </IonList>
                    </IonCol>
                </IonRow>
            </div>
        </div>
    )
}