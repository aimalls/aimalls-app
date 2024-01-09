import { IonBackButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonRow, IonToolbar, RefresherEventDetail } from "@ionic/react"
import ShopProductListCard from "../shop/components/ShopProductListCard"
import useLikedProduct from "../../hooks/liked-product/useLikedProduct"

export const LikedProducts: React.FC = () => {

    
    const { likedProducts, isLikedProductsLoading, refetch } = useLikedProduct()

    const handleRefetchLikedProducts = async (event: CustomEvent<RefresherEventDetail>) => {
        event.detail.complete()
        await refetch()
    }
    return (
        <IonPage id="liked-products">
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/shop"></IonBackButton>
                    </IonButtons>
                    Liked Products
                </IonToolbar>
            </IonHeader>
            <IonContent>
                    <IonRefresher slot="fixed" onIonRefresh={handleRefetchLikedProducts}>
                        <IonRefresherContent></IonRefresherContent>
                    </IonRefresher>
                        <IonGrid>
                            <IonRow>
                                { likedProducts && likedProducts.length !==0  && !isLikedProductsLoading ? (
                                    likedProducts.map((liked) => (
                                        <IonCol size="6" key={liked.product._id}>
                                            <ShopProductListCard product={liked.product} />
                                        </IonCol>
                                    ))
                                ) : isLikedProductsLoading ? (
                                    <IonCol size="12">Loading Products...</IonCol>
                                ) : likedProducts?.length === 0 ? (
                                    <IonCol size="12">No Result Found.</IonCol>
                                ) : null }
                            </IonRow>
                        </IonGrid>
                </IonContent>
        </IonPage>
    )
}