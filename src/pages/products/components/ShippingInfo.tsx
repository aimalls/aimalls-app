import { IonButton, IonLabel, IonIcon, IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonRow, IonCol, IonGrid, IonInput, IonList, IonListHeader, IonItem } from "@ionic/react"
import { chevronDown } from "ionicons/icons"
import { FC, useState } from "react"

import "../../../styles/v1/pages/products/components/ShippingInfo.scss"
import { iProductShippingInfo } from "../AddNewProduct"



export interface iShippingInfoProps{
    shippingInfo: iProductShippingInfo,
    onDone: (shippingInfo: iProductShippingInfo) => void
}

export const ShippingInfo: FC<iShippingInfoProps> = ({ onDone, shippingInfo }) => {

    const [isShippingInfoDialogOpen, setIsShippingInfoDialogOpen]  = useState(false);
    const [formShippingInfo, setFormShippingInfo] = useState<iProductShippingInfo>({
        weight: 0,
        height: 0,
        width: 0,
        length: 0
    })

    const handleShippingInfoChange = <Key extends keyof iProductShippingInfo>(key: Key, value: iProductShippingInfo[Key]) => {
        setFormShippingInfo(curr => {
            let current = {...curr};
            current[key as keyof typeof curr] = value;
            return current;
        })
    }

    const handleShippingInfoDone = () => {
        onDone(formShippingInfo)
        setIsShippingInfoDialogOpen(false)
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
                    <IonList lines="full">
                        <IonListHeader>
                            Parcel Weight
                        </IonListHeader>
                        <IonItem>
                            <IonInput
                                value={formShippingInfo.weight}
                                type="number"
                                label="Weight (KG)"
                                labelPlacement="floating"
                                onIonInput={(event) => handleShippingInfoChange("weight", +event.detail.value!)}
                            ></IonInput>
                        </IonItem>
                        <IonListHeader>
                            Parcel Size
                        </IonListHeader>
                        <IonItem>
                            <IonInput
                                value={formShippingInfo.width}
                                type="number"
                                label="Width (cm)"
                                labelPlacement="floating"
                                onIonInput={(event) => handleShippingInfoChange("width", +event.detail.value!)}
                            ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput
                                value={formShippingInfo.length}
                                type="number"
                                label="Length (cm)"
                                labelPlacement="floating"
                                onIonInput={(event) => handleShippingInfoChange("length", +event.detail.value!)}
                            ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput
                                value={formShippingInfo.height}
                                type="number"
                                label="Height (cm)"
                                labelPlacement="floating"
                                onIonInput={(event) => handleShippingInfoChange("height", +event.detail.value!)}
                            ></IonInput>
                        </IonItem>
                    </IonList>
                    
                </IonContent>
            </IonModal>
        </div>
    )
}