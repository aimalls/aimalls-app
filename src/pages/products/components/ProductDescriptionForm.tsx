import { IonButton, IonLabel, IonIcon, IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonInput, IonTextarea } from "@ionic/react";
import { chevronDown, chevronForward } from "ionicons/icons";
import { FC, useEffect, useRef, useState } from "react";
import "../../../styles/v1/pages/products/components/OtherProductInfo.scss"

export interface iProductDescription {
    productDescription: string,
    onDone: (value: string) => void
}

export const ProductDescriptionForm: FC<iProductDescription> = ({ onDone, productDescription }) => {

    const [isProductDescriptionDialogOpen, setIsProductDescriptionDialogOpen] = useState(false);
    const [formProductDescription, setFormProductDescription] = useState("");



    const handleProductDescriptionDone = () => {
        onDone(formProductDescription)
        setIsProductDescriptionDialogOpen(false)
    }


    return (
        <div id="other-product-info">
            <IonButton fill="clear" className="activator" expand="block" onClick={() => setIsProductDescriptionDialogOpen(true)}>
                <IonLabel slot="start" style={{ display: 'flex', alignItems: 'center' }}>
                    Product Description
                </IonLabel>
                <div>{ productDescription }</div>
                <IonIcon icon={ chevronForward} size="small" slot="end"></IonIcon>
            </IonButton>
            <IonModal isOpen={ isProductDescriptionDialogOpen }>
                <IonHeader style={{ boxShadow: 'none' }}>
                    <IonToolbar>
                        <IonButton slot="start" fill="clear" onClick={() => setIsProductDescriptionDialogOpen(false)}>Close</IonButton>
                        <IonTitle>Set Product Description</IonTitle>
                        <IonButton slot="end" fill="clear" onClick={() => handleProductDescriptionDone()}>Done</IonButton>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonTextarea
                                    fill="solid"
                                    value={formProductDescription}
                                    labelPlacement="floating"
                                    label="Product Description"
                                    placeholder="Input Product Description"
                                    onIonInput={(event) => setFormProductDescription(event.detail.value!)}
                                ></IonTextarea>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonModal>
        </div>
    )
}