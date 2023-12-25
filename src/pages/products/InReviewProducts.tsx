import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react"
import { useUserInReviewProducts } from "../../hooks/product/useUserInReviewProducts";
import { ProductCard } from "./components/ProductCard";

export const InReviewProducts: React.FC = () => {

    const { userInReviewProducts, isUserInReviewProductsLoading, refetch } = useUserInReviewProducts();

    return (
        <IonPage>
            <IonContent>
                <IonGrid>
                    <IonRow class="ion-justify-content-center">
                    { userInReviewProducts ? userInReviewProducts.map((product => (
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