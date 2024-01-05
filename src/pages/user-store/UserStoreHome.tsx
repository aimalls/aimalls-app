import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonRow } from "@ionic/react";
import "../../styles/v1/pages/user-store/UserStoreHome.scss"
import { useShopProfile } from "../../hooks/shop-profile/useShopProfile";
export const UserStoreHome: React.FC = () => {

    const { ShopProfile, ShopProfileIsLoading } = useShopProfile();

    return (
        <div id="user-store-home">
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
                                                <div className="count">5</div>
                                                <div className="status">New Order</div>
                                            </div>
                                            <div className="item">
                                                <div className="count">5</div>
                                                <div className="status">To Ship</div>
                                            </div>
                                            <div className="item">
                                                <div className="count">20</div>
                                                <div className="status">Shipped</div>
                                            </div>
                                            <div className="item">
                                                <div className="count">30</div>
                                                <div className="status">Delivered</div>
                                            </div>
                                            <div className="item">
                                                <div className="count">5</div>
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
                                        <div className="products">
                                            <div className="item">
                                                <div className="count">5</div>
                                                <div className="status">Live</div>
                                            </div>
                                            <div className="item">
                                                <div className="count">5</div>
                                                <div className="status">Reviewing</div>
                                            </div>
                                            <div className="item">
                                                <div className="count">20</div>
                                                <div className="status">Failed</div>
                                            </div>
                                            <div className="item">
                                                <div className="count">20</div>
                                                <div className="status">Deactivated</div>
                                            </div>
                                        </div>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>

                    ): null }
            </IonGrid>
        </div>   
    )
}

export default UserStoreHome;