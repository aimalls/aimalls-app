import { FC, useEffect } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow, useIonAlert, useIonLoading, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonSearchbar, IonIcon, useIonToast, IonFooter, IonTabBar, IonTabButton, IonCard, IonImg, IonCardSubtitle, IonCardContent, IonMenuButton, IonSplitPane, IonRefresher, RefresherEventDetail, IonRefresherContent } from "@ionic/react";
import { useHistory, useParams } from "react-router";
import "../../styles/v1/pages/shop/Shop.scss"
import { camera, cartOutline, chatboxEllipses, heart, home, notifications, personCircle, scan, searchOutline } from "ionicons/icons";
import { useProductSearch } from "../../hooks/product/useProductSearch";
import aimallsVert from "../../assets/images/aimalls-vert.png"
import { Sidebar } from "./Sidebar";
import ShopProductListCard from "./components/ShopProductListCard";
export interface iProps {}
export const Shop: FC<iProps> = (props): JSX.Element => {
    const navigation = useHistory();

    const [presentToast] = useIonToast();


    const handleCameraSearch = async () => {
        await presentToast("Smart scan is not yet available!", 3000)
    }

    const { search_string }: { search_string: string } = useParams();
    
    const { productSearchResult, isProductSearchResultLoading, refetch: refetchProductSearchResult } = useProductSearch(search_string)

    const handleSearchButton = () => {
        if (!!search_string) {
            navigation.replace(`/shop/search`, { search_string })
        } else {
            navigation.push("/shop/search")
        }
    }

    const handleRefetchProductSearchResult = async (event: CustomEvent<RefresherEventDetail>) => {
        event.detail.complete()
        await refetchProductSearchResult()
    }

   
    return (
        <IonSplitPane when="md" contentId="shop-content" id="shop-home-layout">
            
            <Sidebar />
            <IonPage id="shop-content">
                <IonHeader class="ion-no-border">
                    <IonToolbar className="header-buttons">
                        <IonMenuButton slot="start"></IonMenuButton>
                        <IonImg src={aimallsVert} style={{ height: "30px" }} />
                        <IonButtons slot="end">
                            <IonButton routerLink="/shop/cart">
                                <IonIcon icon={ cartOutline } />
                            </IonButton>
                            <IonButton>
                                <IonIcon icon={ chatboxEllipses } />
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                    <IonToolbar>
                        <div className="search-btn" onClick={() => handleSearchButton()}>

                            <IonIcon icon={ searchOutline }></IonIcon>
                            <div>{ !!search_string ? search_string : "Product Search" }</div>
                            <IonButton fill="clear" color={"dark"} className="ion-no-padding" onClick={() => handleCameraSearch()}>
                                <IonIcon icon={ camera }></IonIcon>
                            </IonButton>
                        </div>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonRefresher slot="fixed" onIonRefresh={handleRefetchProductSearchResult}>
                        <IonRefresherContent></IonRefresherContent>
                    
                    </IonRefresher>
                        <IonGrid>
                            <IonRow>
                                { productSearchResult && productSearchResult.length !==0  && !isProductSearchResultLoading ? (
                                    productSearchResult.map((product) => (
                                        <IonCol size="6" key={product._id}>
                                            <ShopProductListCard product={product} />
                                        </IonCol>
                                    ))
                                ) : isProductSearchResultLoading ? (
                                    <IonCol size="12">Loading Products...</IonCol>
                                ) : productSearchResult?.length === 0 ? (
                                    <IonCol size="12">No Result Found.</IonCol>
                                ) : null }
                            </IonRow>
                        </IonGrid>
                </IonContent>
                <IonFooter>
                    <IonTabBar>
                        <IonTabButton tab="shop" href="/shop">
                            <IonIcon icon={ home }></IonIcon>
                        </IonTabButton>
                        <IonTabButton tab="wishlist">
                            <IonIcon icon={ heart }></IonIcon>
                        </IonTabButton>
                        <IonTabButton tab="scan">
                            <IonIcon icon={ scan }></IonIcon>
                        </IonTabButton>
                        <IonTabButton tab="notifications">
                            <IonIcon icon={ notifications }></IonIcon>
                        </IonTabButton>
                        <IonTabButton tab="profile" onClick={() => navigation.push("/account-settings/profile")} >
                            <IonIcon icon={ personCircle }></IonIcon>
                        </IonTabButton>
                    </IonTabBar>
                </IonFooter>
            </IonPage>
        </IonSplitPane>
    )
};
export default Shop;