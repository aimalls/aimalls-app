import { IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonItem, IonList, IonListHeader, IonPage, IonRow } from "@ionic/react";
import useStoreOrder from "../../../hooks/order/useStoreOrder";
import { OrderListItem } from "./components/OrderListItem";

export const pendingOrders: React.FC = () => {

    const { pending: orders, refetchSellerOrders } = useStoreOrder();

    return (
        
            <IonContent>
                <div style={{ marginBottom: "70px" }}>
                    <IonList lines="none">
                        <IonListHeader>Pending Orders</IonListHeader>
                        { orders.length > 0 ? orders.map((order, index) => (
                            <IonItem key={`${order.status}-order-${index}`}>
                                <OrderListItem order={order} onOrderUpdate={refetchSellerOrders} />
                            </IonItem>
                        )) : null }
                    </IonList>
                </div>
            </IonContent>
    )
}

export default pendingOrders;