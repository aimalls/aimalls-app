import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react"
import { useUserDelistedProducts } from "../../hooks/product/useUserDelistedProducts";
import { ProductCard } from "./components/ProductCard";

export const DelistedProducts: React.FC = () => {

    const { userDelistedProducts, isUserDelistedProductsLoading, refetch } = useUserDelistedProducts();

    return (
        <IonPage>
            <IonContent>
                <IonGrid>
                    <IonRow class="ion-justify-content-center">
                    { userDelistedProducts ? userDelistedProducts.map((product => (
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