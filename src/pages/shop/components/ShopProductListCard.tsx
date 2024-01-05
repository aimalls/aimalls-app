import { IonCard, IonIcon, IonImg } from "@ionic/react";
import { iProduct } from "../../../requests/product.request";

import skeletonPreload from "../../../assets/images/skeleton-preload.png"
import "../../../styles/v1/pages/shop/components/ShopProductListCard.scss"
import { star, starOutline } from "ionicons/icons";

interface iProductWithRating extends iProduct {
    avgRating?: null | number
}

type ShopProductListCardProp = {
    product: iProductWithRating
}

export const ShopProductListCard: React.FC<ShopProductListCardProp> = ({ product }) => {
    return (
        <IonCard className="shop-product-list-card" routerLink={`/shop/product/${product._id}/view`}>
            <IonImg src={ product.files.length !== 0 ? product.files[0].thumbnail_location : skeletonPreload }></IonImg>
            <div className="product-details">
                <div className="product-name">
                    { product.productName }
                </div>
                <div className="product-price">
                    ₱{ product.priceRange }
                </div>
                <div className="product-rating">
                    { product.avgRating ? (
                        <>
                        {
                        Array.from(Array(Math.round(product.avgRating)).keys()).map((index) => (
                            <IonIcon color={"primary"} icon={ star } key={index}></IonIcon>
                        ))
                        }
                        {
                            Array.from(Array(Math.round(5 - product.avgRating)).keys()).map((index) => (
                                <IonIcon color={"primary"} icon={ starOutline } key={`non-rating-${index}`}></IonIcon>
                            ))
                        }
                        </>
                    )
                        

                        
                    : (
                        Array.from(Array(5).keys()).map((index) => (
                            <IonIcon color={"primary"} icon={ starOutline } key={index}></IonIcon>
                        ))
                    ) }
                </div>
            </div>
        </IonCard>
    )
}

export default ShopProductListCard;