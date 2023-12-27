import { IonButton } from "@ionic/react"
import { iProduct } from "../../../requests/product.request"

interface iProductWithRating extends iProduct {
    avgRating: null | number
}

type BuyNowProp = {
    product: iProductWithRating
}

export const BuyNow: React.FC<BuyNowProp> = ({ product }) => {
    return (
        <>
            <IonButton fill="solid">Buy Now</IonButton>
        </>
    )
}

export default BuyNow;