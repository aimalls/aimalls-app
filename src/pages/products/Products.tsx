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
                        <IonButton color={"primary"} routerLink="products/new">New</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList lines="full">

                    <IonListHeader>My Products</IonListHeader>
                    { userProducts && !isUserProductsLoading ? (
                        userProducts.length !== 0 ? (
                            userProducts.map(product => (
                                <IonItemSliding key={product._id}>
                                    <IonItem key={product._id}>
                                        <IonAvatar slot="start">
                                            { product.files.length !== 0 ? (
                                                <IonImg src={ product.files[0].thumbnail_location } />
                                            ): (
                                                <IonImg src={ aiMallsProductPreloadSkeleton } />
                                                
                                            ) } 
                                        </IonAvatar>
                                        <IonLabel>
                                            { product.productName }
                                            <p>{ product.category.name }</p>
                                        </IonLabel>
                                    </IonItem>
                                    <IonItemOptions>
                                        <IonItemOption routerLink={`products/${product._id}/update`}>Update</IonItemOption>
                                        <IonItemOption>Delete</IonItemOption>
                                    </IonItemOptions>
                                </IonItemSliding>
                                
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