import { IonButton, IonIcon } from "@ionic/react"
import { shareSocial } from "ionicons/icons"
import { iProduct } from "../../../requests/product.request"
import { App } from "@capacitor/app"

type ShareProductButtonProps = {
    product: iProduct
}



export const ShareProductButton: React.FC<ShareProductButtonProps> = ({ product }) => {

    const handleShareProduct = () => {
        App.exitApp();
    }

    return (
        <IonButton fill='clear' size='small' onClick={() => handleShareProduct()}>
            <IonIcon slot='icon-only' size='small' icon={ shareSocial }></IonIcon>
        </IonButton>
    )
}