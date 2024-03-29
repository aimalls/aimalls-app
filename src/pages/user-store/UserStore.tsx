import { IonBackButton, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonImg, IonLabel, IonMenuButton, IonPage, IonRouterOutlet, IonSplitPane, IonTabBar, IonTabButton, IonToolbar, useIonViewDidEnter, useIonViewDidLeave } from "@ionic/react";
import React from "react";
import { Sidebar } from "./components/Sidebar";
import { cartOutline, chatboxEllipses, searchOutline, camera, notificationsOutline, home, pieChartOutline, chatboxEllipsesOutline, personCircleOutline, cubeOutline, readerOutline } from "ionicons/icons";

import aimallsVert from "../../assets/images/aimalls-vert.png"
import { Redirect, Route, useHistory } from "react-router";

import UserStoreHome from "./UserStoreHome";
import StoreAnalytics from "./StoreAnalytics";
import StoreMessages from "./StoreMessages";
import UserNotifications from "./UserNotifications";
import { ProductsV2 } from "../products/ProductsV2";
import { DelistedProducts } from "../products/DelistedProducts";
import { InReviewProducts } from "../products/InReviewProducts";
import { ListingFailedProducts } from "../products/ListingFailedProducts";
import { LiveProducts } from "../products/LiveProducts";
import { StoreOrders } from "./orders/StoreOrders";

export const UserStore: React.FC = () => {

    const navigation = useHistory();
 
    return (
        <IonSplitPane when="md" contentId="user-store-content" id="user-store-layout">
            {/* <Sidebar /> */}
            <IonPage id="user-store-content">
                <IonHeader class="ion-no-border">
                    <IonToolbar className="header-buttons">
                        {/* <IonMenuButton slot="start"></IonMenuButton> */}
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/shop"></IonBackButton>
                        </IonButtons>
                        <IonImg src={aimallsVert} style={{ height: "30px" }} />
                        <IonButtons slot="end">
                            <IonButton routerLink="/chat">
                                <IonIcon icon={ chatboxEllipsesOutline } />
                            </IonButton>
                            <IonButton routerLink="/notifications">
                                <IonIcon icon={ notificationsOutline } />
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    
                    <IonRouterOutlet>
                        
                        <Redirect exact path="/user-store" to="/user-store/home" />
                        <Route path="/user-store/home" render={() => <UserStoreHome />} exact={true} />
                        <Route path="/user-store/products" render={() => <ProductsV2 />}>
                            {/* <Redirect exact path="/user-store/products" to="/user-store/products/live" /> */}
                            
                        </Route>
                        <Route path="/user-store/orders" render={() => <StoreOrders />} />
                        <Route path="/user-store/messages" render={() => <StoreMessages />} exact={true} />

                        
                        {/* <Route path="/user-store/reviewing" render={() => <InReviewProducts />} exact={true} />
                        <Route path="/user-store/messages" render={() => <ListingFailedProducts />} exact={true} /> */}
                    </IonRouterOutlet>
                </IonContent>
                <IonFooter>
                    <IonTabBar slot="bottom">
                        <IonTabButton tab="home" href="/user-store/home">
                            <IonIcon icon={ home }></IonIcon>
                            <IonLabel>Home</IonLabel>
                        </IonTabButton>

                        <IonTabButton tab="products" href="/user-store/products">
                            <IonIcon icon={ cubeOutline }></IonIcon>
                            <IonLabel>Products</IonLabel>
                        </IonTabButton>

                        <IonTabButton tab="orders" href="/user-store/orders">
                            <IonIcon icon={ readerOutline }></IonIcon>
                            <IonLabel>Orders</IonLabel>
                        </IonTabButton>

                        <IonTabButton tab="shop-profile" onClick={() => navigation.push("/account-settings/shop-profile")}>
                            <IonIcon icon={ personCircleOutline }></IonIcon>
                            <IonLabel>Shop Profile</IonLabel>
                        </IonTabButton>
                        
                    </IonTabBar>
                </IonFooter>
            </IonPage>
        </IonSplitPane>
    )
}

export default UserStore;