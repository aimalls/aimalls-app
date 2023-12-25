import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonHeader, IonToolbar, IonButtons, IonBackButton, IonPage, IonButton, IonTitle, IonContent, IonFooter } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import { Redirect, Route } from "react-router"
import { DelistedProducts } from "./DelistedProducts"
import { InReviewProducts } from "./InReviewProducts"
import { ListingFailedProducts } from "./ListingFailedProducts"
import { LiveProducts } from "./LiveProducts"
import "../../styles/v1/pages/products/ProductsV2.scss"

export const ProductsV2: React.FC = () => {
    return (
        <IonPage id="products">
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/dashboard"></IonBackButton>
                    </IonButtons>
                    Products
                    
                </IonToolbar>
            </IonHeader>
            <IonContent>
                
                    <IonTabs>
                        <IonRouterOutlet>
                            {/*
                            Use the render method to reduce the number of renders your component will have due to a route change.

                            Use the component prop when your component depends on the RouterComponentProps passed in automatically.
                            */}
                            <Redirect exact path="/products" to="/products/live" />
                            <Route path="/products/live" render={() => <LiveProducts />} exact={true} />
                            <Route path="/products/reviewing" render={() => <InReviewProducts />} exact={true} />
                            <Route path="/products/failed" render={() => <ListingFailedProducts />} exact={true} />
                            <Route path="/products/delisted" render={() => <DelistedProducts />} exact={true} />
                        </IonRouterOutlet>

                        <IonTabBar slot="top">
                            <IonTabButton tab="live" href="/products/live">
                                <IonLabel>Live</IonLabel>
                            </IonTabButton>

                            <IonTabButton tab="reviewing" href="/products/reviewing">
                                <IonLabel>Reviewing</IonLabel>
                            </IonTabButton>

                            <IonTabButton tab="failed" href="/products/failed">
                                <IonLabel>Failed</IonLabel>
                            </IonTabButton>

                            <IonTabButton tab="delisted" href="/products/delisted">
                                <IonLabel>Delisted</IonLabel>
                            </IonTabButton>
                        </IonTabBar>
                    </IonTabs>
                    
                
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <IonButton expand="block" color={"primary"} fill="solid" routerLink="/products/new">New</IonButton>
                </IonToolbar>
            </IonFooter>
        </IonPage>
        
    )
}