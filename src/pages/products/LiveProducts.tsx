import { IonCard, IonCol, IonContent, IonGrid, IonItem, IonList, IonLoading, IonPage, IonRefresher, IonRefresherContent, IonRow, RefresherCustomEvent, RefresherEventDetail } from "@ionic/react"
import { useUserLiveProducts } from "../../hooks/product/useUserLiveProducts"
import { ProductCard } from "./components/ProductCard";

export const LiveProducts: React.FC = () => {

    const { userLiveProducts, isUserLiveProductsLoading, refetch } = useUserLiveProducts();


    const handleLiveProductsRefresh = async (e: CustomEvent<RefresherEventDetail>) => {
        await refetch();
        e.detail.complete()
    }

    return (
        <IonPage>
            <IonContent>
                <IonRefresher slot="fixed" onIonRefresh={handleLiveProductsRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <IonGrid>
                    <IonLoading isOpen={ isUserLiveProductsLoading }></IonLoading>
                    <IonRow class="ion-justify-content-center">
                    { userLiveProducts ? userLiveProducts.map((product => (
                        <IonCol size="12" key={product._id}>
                            <ProductCard product={product} onUpdate={ async () => await refetch() } />
                        </IonCol>
                    ))): null }
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}