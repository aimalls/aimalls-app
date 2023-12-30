import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonHeader, IonToolbar, IonButtons, IonBackButton, IonPage, IonButton, IonTitle, IonContent, IonFooter, useIonToast, IonFabButton, IonIcon, IonFab } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import { Redirect, Route, useHistory } from "react-router"
import { DelistedProducts } from "./DelistedProducts"
import { InReviewProducts } from "./InReviewProducts"
import { ListingFailedProducts } from "./ListingFailedProducts"
import { LiveProducts } from "./LiveProducts"
import "../../styles/v1/pages/products/ProductsV2.scss"
import { useShopProfile } from "../../hooks/shop-profile/useShopProfile"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { addOutline } from "ionicons/icons"

export const ProductsV2: React.FC = () => {

    const navigation = useHistory();

    const { ShopProfile, ShopProfileIsLoading } = useShopProfile()
    const [presentToast] = useIonToast();

    const { shopName } = useSelector((state: RootState) => state.shopProfileStore)

  

    const handleNewProduct = () => {
        if (!ShopProfileIsLoading) {
            if (!ShopProfile) {
                
                
                presentToast("Please complete your shop profile first!", 5000)
                navigation.replace("/account-settings/shop-profile")

                return
            } else if (shopName === "") {
                presentToast("Please set your shop name first!", 5000)
                navigation.replace("/account-settings/shop-profile")
                return
            }
        }
        navigation.push("/products/new");
    }

    return (
        <IonPage id="products">
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/shop"></IonBackButton>
                    </IonButtons>
                    Products
                </IonToolbar>
                
            </IonHeader>
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
                <IonContent>
                    <IonRouterOutlet>
                        
                        <Redirect exact path="/products" to="/products/live" />
                        <Route path="/products/live" render={() => <LiveProducts />} exact={true} />
                        <Route path="/products/reviewing" render={() => <InReviewProducts />} exact={true} />
                        <Route path="/products/failed" render={() => <ListingFailedProducts />} exact={true} />
                        <Route path="/products/delisted" render={() => <DelistedProducts />} exact={true} />
                    </IonRouterOutlet>

                    <IonFab slot="fixed" vertical="bottom" horizontal="end">
                        <IonFabButton routerLink="/products/new">
                            <IonIcon icon={ addOutline }></IonIcon>
                        </IonFabButton>
                    </IonFab>
                </IonContent>
            {/* <IonFooter>
            <IonToolbar>
                <IonButton expand="block" color={"primary"} fill="solid" onClick={() => handleNewProduct()}>New</IonButton>
              </IonToolbar>
            </IonFooter> */}
        </IonPage>
        
    )
}