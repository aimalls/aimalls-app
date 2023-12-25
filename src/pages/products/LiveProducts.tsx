import { IonCard, IonCol, IonContent, IonGrid, IonItem, IonList, IonPage, IonRow } from "@ionic/react"
import { useUserLiveProducts } from "../../hooks/product/useUserLiveProducts"
import { ProductCard } from "./components/ProductCard";

export const LiveProducts: React.FC = () => {

    const { userLiveProducts, isUserLiveProductsLoading, refetch } = useUserLiveProducts();

    return (
        <IonPage>
            <IonContent>
                <IonGrid>
                    <IonRow class="ion-justify-content-center">
                    { userLiveProducts ? userLiveProducts.map((product => (
                        <IonCol size="12" key={product._id}>
                            <ProductCard product={product} />
                        </IonCol>
                    ))): null }
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}