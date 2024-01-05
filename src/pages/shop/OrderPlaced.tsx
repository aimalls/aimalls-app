import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonPage, IonRow, IonToolbar } from "@ionic/react"
import { useHistory } from "react-router";
import orderPlacedSuccess from "../../assets/images/order-placed-success.gif"
import "../../styles/v1/pages/shop/OrderPlaced.scss"
import { iOrderData } from "../../requests/order.request";

export const OrderPlaced: React.FC = () => {

    const navigation = useHistory();

    const { message, data } = navigation.location.state as iOrderData;

    

    return (
        <IonPage id="order-placed">
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/shop"></IonBackButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonGrid>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" className="order-placed-success-image">
                            <IonImg src={ orderPlacedSuccess }></IonImg>
                        </IonCol>
                        <IonCol size="12" className="order-placed-success-text">
                            { message }
                        </IonCol>
                        <IonCol size="12" className="order-placed-success-sub-text">
                            Your order has been successfuly processed and is on its way to you soon.
                        </IonCol>
                        <IonCol size="10" className="action-buttons">
                            <IonButton fill="solid" expand="block" routerLink={`/shop/order/${data._id}/order-detail`}>My Order Detail</IonButton>
                            <IonButton fill="outline" expand="block" routerLink="/shop">Continue Shopping</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default OrderPlaced;