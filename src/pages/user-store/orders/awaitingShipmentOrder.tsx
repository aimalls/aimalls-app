import { IonContent, IonList, IonListHeader, IonItem } from "@ionic/react";
import useStoreOrder from "../../../hooks/order/useStoreOrder";
import { OrderListItem } from "./components/OrderListItem";

const awaitingShipmentOrder: React.FC = () => {
    const { awaitingShipment: orders, refetchSellerOrders } = useStoreOrder();

    return (
        <IonContent>
            <div style={{ marginBottom: "70px" }}>
                <IonList lines="none">
                    <IonListHeader>Awaiting Shipment Orders</IonListHeader>
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

export default awaitingShipmentOrder;