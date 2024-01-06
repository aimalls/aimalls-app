import { IonHeader, IonToolbar, IonTabBar, IonTabButton, IonLabel, IonContent, IonRouterOutlet, IonFab, IonFabButton, IonIcon } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import { addOutline } from "ionicons/icons"
import { Redirect, Route } from "react-router"
import "../../../styles/v1/pages/user-store/StoreOrders.scss"
import { DelistedProducts } from "../../products/DelistedProducts"
import { InReviewProducts } from "../../products/InReviewProducts"
import { ListingFailedProducts } from "../../products/ListingFailedProducts"
import { LiveProducts } from "../../products/LiveProducts"
import useStoreOrder from "../../../hooks/order/useStoreOrder"
import pendingOrders from "./pendingOrders"
import awaitingShipmentOrder from "./awaitingShipmentOrder"
import inTransitOrders from "./inTransitOrder"
import deliveredOrders from "./deliveredOrder"
import completedOrders from "./completedOrder"
import cancelledOrders from "./cancelledOrder"
import awaitingCollectionOrder from "./awaitingCollectionOrder"

export const StoreOrders: React.FC = () => {

    const { pending, awaitingShipment,
        awaitingCollection,
        inTransit,
        delivered,
        completed,
        cancelled } = useStoreOrder();

    return (
        <div id="store-orders">
        <IonReactRouter>
            <IonHeader>
                <IonToolbar className="tabbar-toolbar">
                    <IonTabBar className="scrollable-toolbar">
                        <IonTabButton tab="pending" href="/user-store/orders/pending">
                            <IonLabel>Pending({ pending.length })</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="awaiting-shipment" href="/user-store/orders/awaiting-shipment">
                            <IonLabel>Awaiting Shipment({ awaitingShipment.length })</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="awaiting-collection" href="/user-store/orders/awaiting-collection">
                            <IonLabel>Awaiting Collection({ awaitingCollection.length })</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="in-transit" href="/user-store/orders/in-transit">
                            <IonLabel>In Transit({ inTransit.length })</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="delivered" href="/user-store/orders/delivered">
                            <IonLabel>Delivered({ delivered.length })</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="completed" href="/user-store/orders/completed">
                            <IonLabel>Completed({ completed.length })</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="cancelled" href="/user-store/orders/cancelled">
                            <IonLabel>Cancelled({ cancelled.length })</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonRouterOutlet>
                    <Redirect exact path="/user-store/orders" to="/user-store/orders/pending" />
                    <Route path="/user-store/orders/pending" component={pendingOrders} exact={true} />
                    <Route path="/user-store/orders/awaiting-shipment" component={awaitingShipmentOrder} exact={true} />
                    <Route path="/user-store/orders/awaiting-collection" component={awaitingCollectionOrder} exact={true} />
                    <Route path="/user-store/orders/in-transit" component={inTransitOrders} exact={true} />
                    <Route path="/user-store/orders/delivered" component={deliveredOrders} exact={true} />
                    <Route path="/user-store/orders/completed" component={completedOrders} exact={true} />
                    <Route path="/user-store/orders/cancelled" component={cancelledOrders} exact={true} />
                    
                </IonRouterOutlet>

                
            </IonContent>
        </IonReactRouter>
        </div>
    )
}