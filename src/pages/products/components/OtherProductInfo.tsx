import { IonButton, IonLabel, IonIcon, IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonInput, IonTextarea } from "@ionic/react";
import { chevronDown, chevronForward } from "ionicons/icons";
import { FC, useEffect, useRef, useState } from "react";
import "../../../styles/v1/pages/products/components/OtherProductInfo.scss"

export interface iOtherProductInfo {
    otherProductInfo: string,

    onDone: (value: string) => void
}

export const OtherProductInfo: FC<iOtherProductInfo> = ({ onDone, otherProductInfo }) => {

    const [isOtherProductInfoDialogOpen, setIsOtherProductInfoDialogOpen] = useState(false);
    const [formOtherProductInfo, setFormOtherProductInfo] = useState("");



    const handleOtherProductInfoDone = () => {
        onDone(formOtherProductInfo)
        setIsOtherProductInfoDialogOpen(false)
    }


    return (
        <div id="other-product-info">
            <IonButton fill="clear" className="activator" expand="block" onClick={() => setIsOtherProductInfoDialogOpen(true)}>
                <IonLabel slot="start" style={{ display: 'flex', alignItems: 'center' }}>
                    Other Product Info.
                </IonLabel>
                <IonIcon icon={ chevronForward} size="small" slot="end"></IonIcon>
            </IonButton>
            <IonModal isOpen={ isOtherProductInfoDialogOpen }>
                <IonHeader style={{ boxShadow: 'none' }}>
                    <IonToolbar>
                        <IonButton slot="start" fill="clear" onClick={() => setIsOtherProductInfoDialogOpen(false)}>Close</IonButton>
                        <IonTitle>Other Product Info</IonTitle>
                        <IonButton slot="end" fill="clear" onClick={() => handleOtherProductInfoDone()}>Done</IonButton>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonTextarea
                                    fill="solid"
                                    value={formOtherProductInfo}
                                    labelPlacement="floating"
                                    label="Other product Info."
                                    placeholder="Input other product information"
                                    onIonInput={(event) => setFormOtherProductInfo(event.detail.value!)}
                                ></IonTextarea>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonModal>
        </div>
    )
}