import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonHeader, IonToolbar, IonButtons, IonBackButton, IonPage, IonButton, IonTitle, IonContent, IonFooter, useIonToast, IonFabButton, IonIcon, IonFab, IonRoute, IonTab } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import { Redirect, Route, Switch, useHistory } from "react-router"
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
import { useUserProduct } from "../../hooks/product/useUserProduct"

export const ProductsV2: React.FC = () => {

    const navigation = useHistory();

    const { ShopProfile, ShopProfileIsLoading } = useShopProfile()
    const [presentToast] = useIonToast();

    const { shopName } = useSelector((state: RootState) => state.shopProfileStore)


  const { userProductsCount, isUserProductsCountLoading, refetchUserProductsCount } = useUserProduct();

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
        
        <IonReactRouter>
            <IonHeader>
                <IonToolbar>
                    { userProductsCount ? (
                    <IonTabBar>
                        <IonTabButton tab="live" href="/user-store/products/live">
                            <IonLabel>Live({ userProductsCount["Live"] ?? 0 })</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="reviewing" href="/user-store/products/reviewing">
                            <IonLabel>Reviewing({ userProductsCount["In Review"] ?? 0 })</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="failed" href="/user-store/products/failed">
                            <IonLabel>Failed({ userProductsCount["Failed"] ?? 0 })</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="delisted" href="/user-store/products/delisted">
                            <IonLabel>Delisted({userProductsCount["Deactivated"] ?? 0 })</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                    ): null }
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonRouterOutlet>
                    <Redirect exact path="/user-store/products" to="/user-store/products/live" />
                    <Route path="/user-store/products/live" component={LiveProducts} exact={true} />
                    <Route path="/user-store/products/reviewing" component={InReviewProducts} exact={true} />
                    <Route path="/user-store/products/failed" component={ListingFailedProducts} exact={true} />
                    <Route path="/user-store/products/delisted" component={DelistedProducts} exact={true} />
                </IonRouterOutlet>

                <IonFab slot="fixed" vertical="bottom" horizontal="end" style={{ marginBottom: "65px" }}>
                    <IonFabButton onClick={() => navigation.replace("/products/new")}>
                        <IonIcon icon={ addOutline }></IonIcon>
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonReactRouter>
        
    )
}