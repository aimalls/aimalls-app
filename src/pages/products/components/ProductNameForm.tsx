import { IonButton, IonLabel, IonIcon, IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonInput, IonTextarea } from "@ionic/react";
import { chevronDown, chevronForward } from "ionicons/icons";
import { FC, useEffect, useRef, useState } from "react";
import "../../../styles/v1/pages/products/components/OtherProductInfo.scss"

export interface iProductName {
    productName: string,
    onDone: (value: string) => void
}

export const ProductNameForm: FC<iProductName> = ({ onDone, productName }) => {

    const [isProductNameDialogOpen, setIsProductNameDialogOpen] = useState(false);
    const [formProductName, setFormProductName] = useState(productName ?? "");


    useEffect(() => {
        if (productName) {
            setFormProductName(productName)
        }
    }, [productName])

    const handleProductNameDone = () => {
        onDone(formProductName)
        setIsProductNameDialogOpen(false)
    }


    return (
        <div id="other-product-info">
            <IonButton fill="clear" className="activator" expand="block" onClick={() => setIsProductNameDialogOpen(true)}>
                <IonLabel slot="start" style={{ display: 'flex', alignItems: 'center' }}>
                    Product Name
                </IonLabel>
                { formProductName } 
                <IonIcon icon={ chevronForward} size="small" slot="end"></IonIcon>
            </IonButton>
            <IonModal isOpen={ isProductNameDialogOpen }>
                <IonHeader style={{ boxShadow: 'none' }}>
                    <IonToolbar>
                        <IonButton slot="start" fill="clear" onClick={() => setIsProductNameDialogOpen(false)}>Close</IonButton>
                        <IonTitle>Set Product Name</IonTitle>
                        <IonButton slot="end" fill="clear" onClick={() => handleProductNameDone()}>Done</IonButton>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonInput
                                    fill="solid"
                                    value={formProductName}
                                    labelPlacement="floating"
                                    label="Product Name"
                                    placeholder="Input product name"
                                    onIonInput={(event) => setFormProductName(event.detail.value!)}
                                ></IonInput>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonModal>
        </div>
    )
}