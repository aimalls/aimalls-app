import { IonButton, IonImg } from "@ionic/react"
import { iProduct } from "../../../requests/product.request"
import "../../../styles/v1/pages/products/components/ProductCard.scss"
import { useHistory } from "react-router"

type tProductCardProp = {
    product: iProduct
}

export const ProductCard: React.FC<tProductCardProp> = ({ product }) => {
    const navigation = useHistory();
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
                        Price: ₱{ product.price }
                    </div>
                    <div className="product-stock">
                        Stock: { product.stock }
                    </div>
                </div>
            </div>
            <div className="product-buttons">
                <IonButton size="small" fill="clear">Deactivate</IonButton>
                <IonButton size="small" fill="clear" routerLink={`${product._id}/update`}>Edit</IonButton>
            </div>
        </div>
    )
}