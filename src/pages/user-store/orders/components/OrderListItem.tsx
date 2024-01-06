import { IonButton, IonImg, useIonAlert, useIonLoading, useIonToast } from "@ionic/react"
import { SellerData, processSellerCancelOrderToAPI, processSellerApproveOrderToAPI, processSellerBookOrderToAPI } from "../../../../requests/order.request"
import "../../../../styles/v1/pages/user-store/orders/components/OrderListItem.scss"

type OrderListItemProps = {
    order: SellerData,
    onOrderUpdate?: () => void
}

export const OrderListItem: React.FC<OrderListItemProps> = ({ order, onOrderUpdate }) => {

    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();
    const [presentToast] = useIonToast();


    const handleSellerApproveOrder = async () => {

        presentAlert({
            message: "Are you sure you want to approve this order?",
            buttons: [
                {
                    text: "No",
                    role: "cancel",
                    handler: () => {}
                },
                {
                    text: "Yes",
                    handler: async () => {
                        try {
                            await present();
                            const result = await processSellerApproveOrderToAPI(order._id);
                            presentToast({
                                message: result.message,
                                duration: 3000
                            })
                            if (onOrderUpdate) onOrderUpdate()
                        } catch (err: any) {
                            presentAlert(err)
                        } finally {
                            await dismiss();
                        }
                    }
                }
            ]
        })

        
    }


    const handleSellerCancelOrder = async () => {

        presentAlert({
            message: "Are you sure you want to cancel this order?",
            buttons: [
                {
                    text: "No",
                    role: "cancel",
                    handler: () => {}
                },
                {
                    text: "Yes",
                    handler: async () => {
                        try {
                            await present();
                            const result = await processSellerCancelOrderToAPI(order._id);
                            presentToast({
                                message: result.message,
                                duration: 3000
                            })
                            if (onOrderUpdate) onOrderUpdate()
                        } catch (err: any) {
                            presentAlert(err)
                        } finally {
                            await dismiss();
                        }
                    }
                }
            ]
        })

        
    }

    const handleSellerBookOrder = async () => {
            
            presentAlert({
                message: "Are you sure you want to book this order?",
                buttons: [
                    {
                        text: "No",
                        role: "cancel",
                        handler: () => {}
                    },
                    {
                        text: "Yes",
                        handler: async () => {
                            try {
                                await present();
                                const result = await processSellerBookOrderToAPI(order._id);
                                presentToast({
                                    message: result.message,
                                    duration: 3000
                                })
                                if (onOrderUpdate) onOrderUpdate()
                            } catch (err: any) {
                                presentAlert(err)
                            } finally {
                                await dismiss();
                            }
                        }
                    }
                ]
            })
    }

    return (
        <div id="order-list-item">
            <div className="order-list-item-header">
                <div className="order-list-item-header__customer-name">
                    <span>{`${order.buyerProfile.first_name} ${order.buyerProfile.last_name}`}</span>
                    <span>{order.orderDetail.status}</span>
                </div>
                <div className="divider"></div>
                <div className="order-list-item-header__order-number">
                    <span>Order ID</span>
                    <span>{order._id}</span>
                </div>
                <div className="order-list-item-header__order-date">
                    <span>Order Date</span>
                    <span>{order.createdAt}</span>
                </div>
            </div>
            { order.orderDetail.shipping ? (
                <div>
                    
                    <div className="divider"></div>
                    <div className="order-list-item-shipping-details">
                        <div className="tracking-number">
                            <span>Tracking Number</span>
                            <span>{order.orderDetail.shipping.bookingDetail.tracking_number}</span>
                        </div>
                        <div className="courier">
                            <span>Courier</span>
                            <span>{order.orderDetail.shipping.courier}</span>
                        </div>
                    </div>
                </div>
            ): null }
            <div className="divider"></div>
            { order.orderDetail.items.map((cart_item) => (
                <div className="order-list-item-body" key={cart_item._id}>
                    
                    <div className="order-list-item-body__order-item-image">
                        <IonImg src={cart_item.files[0].thumbnail_location} alt="Product" />
                    </div>
                    <div className="order-list-item-body__order-details">
                        <div className="order-list-item-body__order-details__product-name">
                            <span>{cart_item.product.productName}</span>
                        </div>
                        <div className="order-list-item-body__order-details__product-quantity">
                            <span>₱ {cart_item.variantsAndOptions.option.length > 0 ? cart_item.variantsAndOptions.option[0].price : cart_item.product.price!} x {cart_item.quantity} </span>
                        </div>
                        <div className="order-list-item-body__order-details__product-total">
                            <span>Due: </span>
                            <span>₱ {cart_item.due}</span>
                        </div>
                    </div>
                </div>    
            )) }
            
            <div className="order-list-item-footer">
                <div className="order-list-item-footer__order-shipping">
                    <span>Shipping</span>
                    <span>₱ {order.orderDetail.shippingFee.fees.total_rate}</span>
                </div>
                <div className="order-list-item-footer__order-total">
                    <span>Order Total</span>
                    <span>₱ {order.orderTotal}</span>
                </div>
                { order.orderDetail.status === "Pending" ? (
                    <div className="order-list-item-footer__order-actions">
                        <IonButton fill="clear" className="cancel-btn" onClick={() => handleSellerCancelOrder()}>Cancel Order</IonButton>
                        <IonButton fill="clear" className="approve-btn" onClick={() => handleSellerApproveOrder()}>Approve</IonButton>
                    </div>
                ): null }

                {
                    order.orderDetail.status === "To Ship" ? (
                        <div className="order-list-item-footer__order-actions">
                            <IonButton fill="clear" className="approve-btn" onClick={() => handleSellerBookOrder()}>Book Order</IonButton>
                        </div>
                    ) : null
                }
            </div>
            { order.orderDetail.remarks ? (
                <>
                <div className="divider"></div>
                <div className="order-list-item-remarks">
                    <span>Remarks:</span>
                    { order.orderDetail.remarks.map((remark, index) => (
                        <div key={`remark-${index}`}>
                        <br />
                        <span>{remark}</span>
                        </div>
                    )) }
                </div>
                </>
            ) : null }
        </div>
    )
}