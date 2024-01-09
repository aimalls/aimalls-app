import { IonButton, IonIcon, useIonAlert, useIonLoading, useIonToast } from "@ionic/react"
import { heart, heartOutline, save } from "ionicons/icons"
import { iProduct } from "../../../requests/product.request"
import useLikedProduct from "../../../hooks/liked-product/useLikedProduct"
import { useMemo } from "react"
import { iLikedProduct, saveUserLikeProductToAPI } from "../../../requests/liked-products.request"

type LikedProductButtonProps = {
    product: iProduct
}

export const LikedProductButton: React.FC<LikedProductButtonProps> = ({ product }) => {

    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();
    const [presentToast] = useIonToast();

    const { likedProducts, isLikedProductsLoading, refetch } = useLikedProduct()
    
    const isProductLiked = () => {
        if (!likedProducts) return false;
        if (!product) return false;
        return !!likedProducts.find((likedProduct: iLikedProduct) => {
            return likedProduct.product._id === product._id && likedProduct.isLiked === true
        });
    }

    const handleLikeProduct = async () => {
        try {
            await present();
            const result = await saveUserLikeProductToAPI(product._id);
            if (result) {
                presentToast({
                    message: result.message,
                    duration: 3000
                })
                refetch();
            }
        } catch (err: any) {
            presentAlert(err)
        } finally {
            await dismiss();
        }
    }

    return (
        <IonButton fill='clear' size='small' onClick={() => handleLikeProduct()}>
            <IonIcon slot='icon-only' size='small' icon={ isProductLiked() ? heart : heartOutline }></IonIcon>
        </IonButton>
    )
}