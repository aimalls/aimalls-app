import { IonBackButton, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react"

export const Products: React.FC = () => {
    return (
        <IonPage id="products">
            <IonHeader>
                <IonToolbar>
                    <IonButtons style={{ position: 'fixed' }} slot="start">
                        <IonBackButton defaultHref="/dashboard"></IonBackButton>
                    </IonButtons>
                    <IonTitle className="ion-text-center">Products</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                Products
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <IonButton expand="block" routerLink="products/new">Add New</IonButton>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    )
}