import { IonAvatar, IonBackButton, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonImg, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonListHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { useUserProduct } from "../../hooks/product/useUserProduct"
import aiMallsProductPreloadSkeleton from "../../assets/images/logo.png"

export const Products: React.FC = () => {

    const { userProducts, isUserProductsLoading } = useUserProduct();

    return (
        <IonPage id="products">
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/dashboard"></IonBackButton>
                    </IonButtons>
                    <IonTitle className="ion-text-center">Products</IonTitle>
                    <IonButtons slot="end">
                        <IonButton color={"primary"} routerLink="/products/new">New</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList lines="full">

                    <IonListHeader>My Products</IonListHeader>
                    { userProducts && !isUserProductsLoading ? (
                        userProducts.length !== 0 ? (
                            userProducts.map(product => (
                                <IonItem key={product._id} detail routerLink={`/products/${product._id}/view`}>
                                    <IonAvatar slot="start">
                                        { product.files.length !== 0 ? (
                                            <IonImg src={ product.files[0].thumbnail_location } />
                                        ): (
                                            <IonImg src={ aiMallsProductPreloadSkeleton } />
                                            
                                        ) } 
                                    </IonAvatar>
                                    <IonLabel>
                                        { product.productName }
                                        <p>{ product.category ? product.category.name : null }</p>
                                    </IonLabel>
                                </IonItem>
                            ))
                        ): (
                            <IonItem>
                                <IonLabel>No Products listed yet.</IonLabel>
                            </IonItem>
                        ) 
                    ) : (
                        <IonItem>
                            <IonLabel>Loading Products...</IonLabel>
                        </IonItem>
                    ) }
                </IonList>
            </IonContent>
            
        </IonPage>
    )
}