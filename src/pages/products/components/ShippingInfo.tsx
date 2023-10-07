import { IonButton, IonLabel, IonIcon, IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonRow, IonCol, IonGrid, IonInput } from "@ionic/react"
import { chevronDown } from "ionicons/icons"
import { FC, useState } from "react"

import "../../../styles/v1/pages/products/components/ShippingInfo.scss"

export interface iShippingInfo {
    
}

export const ShippingInfo: FC<iShippingInfo> = () => {

    const [isShippingInfoDialogOpen, setIsShippingInfoDialogOpen]  = useState(false);

    const handleShippingInfoDone = () => {

    }

    return (
        <div id="shipping-info">
            <IonButton fill="clear" className="activator" expand="block" onClick={() => setIsShippingInfoDialogOpen(true)}>
                <IonLabel slot="start" style={{ display: 'flex', alignItems: 'center' }}>
                    Shipping Info.
                </IonLabel>
                <IonIcon icon={ chevronDown } size="small" slot="end"></IonIcon>
            </IonButton>
            <IonModal isOpen={ isShippingInfoDialogOpen }>
                <IonHeader style={{ boxShadow: 'none' }}>
                    <IonToolbar>
                        <IonButton slot="start" fill="clear" onClick={() => setIsShippingInfoDialogOpen(false)}>Close</IonButton>
                        <IonTitle>Set Shipping Info.</IonTitle>
                        <IonButton slot="end" fill="clear" onClick={() => handleShippingInfoDone()}>Done</IonButton>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12">
                                <IonInput
                                    type="number"
                                    label="Weight"
                                    labelPlacement="floating"
                                ></IonInput>
                            </IonCol>
                            <IonCol size="12">
                                <IonLabel>Parcel Size</IonLabel>
                            </IonCol>
                            <IonCol size="12">
                                <IonInput
                                    type="number"
                                    label="Width"
                                    labelPlacement="floating"
                                ></IonInput>
                            </IonCol>
                            <IonCol size="12">
                                <IonInput
                                    type="number"
                                    label="Length"
                                    labelPlacement="floating"
                                ></IonInput>
                            </IonCol>
                            <IonCol size="12">
                                <IonInput
                                    type="number"
                                    label="Height"
                                    labelPlacement="floating"
                                ></IonInput>
                            </IonCol>
                        </IonRow>
                    </IonGrid> 
                </IonContent>
            </IonModal>
        </div>
    )
}