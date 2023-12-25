import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react"
import { useUserFailedReviewProducts } from "../../hooks/product/useUserFailedReviewProducts";
import { ProductCard } from "./components/ProductCard";

export const ListingFailedProducts: React.FC = () => {

    const { userFailedReviewProducts, isUserFailedReviewProductsLoading, refetch } = useUserFailedReviewProducts();

    return (
        <IonPage>
            <IonContent>
                <IonGrid>
                    <IonRow class="ion-justify-content-center">
                    { userFailedReviewProducts ? userFailedReviewProducts.map((product => (
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