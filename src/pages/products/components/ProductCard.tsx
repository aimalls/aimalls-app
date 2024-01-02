import { IonButton, IonImg, useIonAlert, useIonLoading } from "@ionic/react"
import { iProduct, updateProductStatusToAPI } from "../../../requests/product.request"
import "../../../styles/v1/pages/products/components/ProductCard.scss"
import { useHistory } from "react-router"

type tProductCardProp = {
    product: iProduct,
    onUpdate: (productId: string) => void
}

export const ProductCard: React.FC<tProductCardProp> = ({ product, onUpdate }) => {
    const navigation = useHistory();



    const [presentAlert] = useIonAlert();
    const [present, dismiss] = useIonLoading();


    const processProductDeactivate = (productId: string) => {
        presentAlert({
            header: "Deactivate Product",
            message: "Are you sure you want to deactivate this product?",
            buttons: [
                {
                    text: "Yes",
                    handler: async () => {
                        try {
                            await present();
                            await updateProductStatusToAPI(productId, "Deactivate");
                            onUpdate(productId);
                        } catch (error: any) {
                        presentAlert({
                            header: "Deactivate Failed",
                            message: error.message,
                            buttons: [{ text: "Ok" }],
                        });
                        } finally {
                            await dismiss();
                        }
                    }
                },
                {
                    text: "No",
                    handler: () => {}
                }
            ],
        })
    }

    const processProductReactivate = (productId: string) => {
        presentAlert({
            header: "Reactivate Product",
            message: "Are you sure you want to reactivate this product?",
            buttons: [
                {
                    text: "Yes",
                    handler: async () => {
                        try {
                            await present();
                            await updateProductStatusToAPI(productId, "Reactivate");
                            onUpdate(productId);
                        } catch (error: any) {
                        presentAlert({
                            header: "Reactivate Failed",
                            message: error.message,
                            buttons: [{ text: "Ok" }],
                        });
                        } finally {
                            await dismiss();
                        }
                    }
                },
                {
                    text: "No",
                    handler: () => {}
                }
            ],
        })
    }

    return (
        <div className="product-card">
            <div className="product-details">
                <div>
                    <IonImg src={ product.files[0].thumbnail_location }></IonImg>
                </div>
                <div className="product-desc">
                    <div className="product-name">
                        { product.productName }
                    </div>
                    <div className="product-price">
                        Price: ₱{ product.priceRange }
                    </div>
                    <div className="product-stock">
                        Stock: { product.totalStocks }
                    </div>
                </div>
            </div>
            <div className="product-buttons">
                { product.status == "Live" ? (
                    <IonButton size="small" fill="clear" onClick={() => processProductDeactivate(product._id)}>Deactivate</IonButton>
                ) : product.status == "Deactivated" ? (
                    <IonButton size="small" fill="clear" onClick={() => processProductReactivate(product._id)}>Reactivate</IonButton>
                ) : null }
                <IonButton size="small" fill="clear" routerLink={`${product._id}/update`}>Edit</IonButton>
            </div>
        </div>
    )
}