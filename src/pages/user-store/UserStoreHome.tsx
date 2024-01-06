import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonRow } from "@ionic/react";
import "../../styles/v1/pages/user-store/UserStoreHome.scss"
import { useShopProfile } from "../../hooks/shop-profile/useShopProfile";
import useStoreOrder from "../../hooks/order/useStoreOrder";
import { useUserProduct } from "../../hooks/product/useUserProduct";
export const UserStoreHome: React.FC = () => {

    const { ShopProfile, ShopProfileIsLoading } = useShopProfile();

    const { pending, awaitingShipment,
        awaitingCollection,
        inTransit,
        delivered,
        completed,
        cancelled } = useStoreOrder();

    const { userProductsCount, isUserProductsCountLoading, refetchUserProductsCount } = useUserProduct();

    return (
            <IonContent id="user-store-home">
            <IonGrid>
                    { ShopProfile ? (
                        <IonRow>
                            <IonCol size="12">
                                <h1>{ ShopProfile.shopName } Store</h1>
                            </IonCol>
                            <IonCol size="12" className="store-transactions">
                                <IonCard>
                                    <IonCardHeader>
                                        <IonCardTitle>Store Transactions</IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <div className="transactions">
                                            <div className="item">
                                                <div className="count">{ pending.length }</div>
                                                <div className="status">New Order</div>
                                            </div>
                                            <div className="item">
                                                <div className="count">{ awaitingShipment.length }</div>
                                                <div className="status">To Ship</div>
                                            </div>
                                            <div className="item">
                                                <div className="count">{ awaitingCollection.length }</div>
                                                <div className="status">Shipped</div>
                                            </div>
                                            <div className="item">
                                                <div className="count">{ inTransit.length }</div>
                                                <div className="status">In Transit</div>
                                            </div>
                                            <div className="item">
                                                <div className="count">{ delivered.length }</div>
                                                <div className="status">Delivered</div>
                                            </div>
                                            <div className="item">
                                                <div className="count">{ completed.length }</div>
                                                <div className="status">Completed</div>
                                            </div>
                                            <div className="item">
                                                <div className="count">{ cancelled.length }</div>
                                                <div className="status">Cancelled</div>
                                            </div>
                                        </div>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                            <IonCol size="12" className="store-products">
                                <IonCard>
                                    <IonCardHeader>
                                        <IonCardTitle>Store Products</IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        { userProductsCount ? (
                                        <div className="products">
                                            <div className="item">
                                                <div className="count">{ userProductsCount["Live"] ?? 0 }</div>
                                                <div className="status">Live</div>
                                            </div>
                                            <div className="item">
                                                <div className="count">{ userProductsCount["In Review"] ?? 0 }</div>
                                                <div className="status">Reviewing</div>
                                            </div>
                                            <div className="item">
                                                <div className="count">{ userProductsCount["Failed"] ?? 0 }</div>
                                                <div className="status">Failed</div>
                                            </div>
                                            <div className="item">
                                                <div className="count">{ userProductsCount["Deactivated"] ?? 0 }</div>
                                                <div className="status">Deactivated</div>
                                            </div>
                                        </div>
                                        ): null }
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>

                    ): null }
            </IonGrid>
            </IonContent>
    )
}

export default UserStoreHome;