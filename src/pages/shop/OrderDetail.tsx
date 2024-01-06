import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPage, IonRow, IonToolbar, useIonAlert, useIonLoading, useIonToast } from "@ionic/react";
import { useHistory, useParams } from "react-router";
import { useOrder } from "../../hooks/order/useOrder";

import "../../styles/v1/pages/shop/order/OrderDetail.scss"
import { useMemo } from "react";
import { airplaneOutline, cartOutline, checkmarkDoneOutline, closeOutline, paperPlaneOutline, storefrontOutline } from "ionicons/icons";
import { Data, iOrderData, processCancelOrderToAPI } from "../../requests/order.request";
import DeliverAddressSelect from "./components/DeliveryAddressSelect";
const orderStatuses = [
    {
        status: "Order Placed",
        subText: "We have received your order",
        icon: cartOutline
    },
    {
        status: "Confirmed",
        subText: "Your order is being processed",
        icon: checkmarkDoneOutline
    },
    {
        status: "Shipped",
        subText: "Your order is on its way to you",
        icon: airplaneOutline
    },
    {
        status: "Delivered",
        subText: "Your order has been delivered",
        icon: checkmarkDoneOutline
    },
    {
        status: "Cancelled",
        subText: "Your order has been cancelled",
        icon: closeOutline
    },
    
]

const cancellableStatus = ["Order Placed", "Order Confirmed", "Order Shipped"];

export const OrderDetail: React.FC = () => {
    const navigation = useHistory();
    const { order_id } = useParams<{order_id: string}>();
    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();
    const [presentToast] = useIonToast();

    const { Order, isOrderLoading, refetch: refetchOrder } = useOrder(order_id);

    const order: iOrderData<Data>['data'] = Order?.data;
    
    const orderStatus = useMemo(() => {
        if (order) {
            return orderStatuses.find((status) => status.status === order.status) ?? orderStatuses[0]
        } else {
            return orderStatuses[0]
        }
    }, [order])

    const handleCancelOrder = async () => {

        presentAlert({
            header: "Cancel Order",
            message: "Are you sure you want to cancel this order?",
            buttons: [
                {
                    text: "Yes",
                    handler: async () => {
                        try {
                            await present();
                            const result = await processCancelOrderToAPI(order._id);
                            await refetchOrder();
                            presentToast(result.message, 5000)
                        } catch (err: any) {
                            presentAlert(err.response.data.message)
                        } finally {
                            await dismiss();
                        }
                    }
                },
                {
                    text: "No",
                    handler: () => {}
                }
            ],
        })

        
        // navigation.replace("/shop/order/cancelled-orders")
    }

    return (
        <IonPage id="order-detail">
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/shop"></IonBackButton>
                    </IonButtons>
                    Order Detail
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                { order ? (
                    <>
                        <div className="order-status">
                            <div className="status-text">
                                <div className="header">
                                    { orderStatus.status  }
                                </div>
                                <div className="sub-text">
                                    { orderStatus.subText }
                                </div>
                            </div>
                            <div className="status-icon">
                                <IonIcon icon={ orderStatus.icon }></IonIcon>
                            </div>
                        </div>
                        <DeliverAddressSelect value={ order.deliveryAddress } />
                        
                        <div className="order-details-wrapper">
                            { order.orderDetail.map((detail) => (
                                <IonRow key={detail._id}>
                                    <IonCol size="12" class="cart-header">
                                        <div className="shop-name">
                                            <IonIcon icon={ storefrontOutline }></IonIcon> { detail.shopProfile.shopName }
                                        </div>
                                    </IonCol>
                                    { detail.shipping !== null ? (
                                    <IonCol size="12" className="shipping-info">
                                        <div className="header">
                                            <IonIcon icon={ paperPlaneOutline }></IonIcon> Shipping Information
                                        </div>
                                        <div className="shipping-detail">
                                            <div className="shipping-type">
                                                { detail.shipping.bookingDetail.delivery_type }
                                            </div>
                                            <div className="shipping-courier">
                                                { detail.shipping.courier }
                                            </div>
                                            <div className="tracking-number">
                                                { detail.shipping.bookingDetail.tracking_number }
                                            </div>
                                        </div>
                                    </IonCol>
                                    ) : null }
                                    <IonCol size="12">
                                        <IonList lines="none">
        
                                        { detail.items.map((cart_item) => (
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
                                                    <IonLabel slot="end">₱ { detail.cartDue }</IonLabel>
                                                </div>
                                                <div>
                                                    <IonLabel>Shipping Fee</IonLabel>
                                                    <IonLabel slot="end">₱ { detail.shippingFee.fees.total_rate }</IonLabel>
                                                </div>
                                            </div>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>Total</IonLabel>
                                            <IonLabel className="ion-text-right">₱ { detail.cartDueWithShipping }</IonLabel>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                            ))}
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
                                <IonCol size="12">
                                    { cancellableStatus.includes(orderStatus.status) ? (
                                        <IonButton color={"light"} expand="block" onClick={handleCancelOrder}>Cancel Order</IonButton>
                                    ): null }
                                </IonCol>
                            </IonRow>
                        </div>
                    </>
                ): null }
            </IonContent>
        </IonPage>
    )
}

export default OrderDetail;