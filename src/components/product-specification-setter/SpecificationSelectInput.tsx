import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import { chevronForward, chevronDown, checkmark } from "ionicons/icons";
import { FC, useState } from "react";

import "../../styles/v1/components/product-specification-setter/SpecificationSelectInput.scss"
import { iProductSpecification } from "../../requests/product-specification.request";

interface iSpecificationSelectInputProps {
    specification: iProductSpecification,
    value: string,
    onChange: (value: string) => void
}

export const SpecificationSelectInput: FC<iSpecificationSelectInputProps> = ({ specification, onChange, value }) => {

    const [isSpecificationSelectInputOpen, setIsSpecificationSelectInputOpen] = useState<boolean>(false);

    const handleDoneSelect = () => {
        setIsSpecificationSelectInputOpen(false)
    }

    const isSelected = (option: string) => {
        return option == value
    }

    const handleOnSelect = (value: string) => {
        onChange(value)
        setIsSpecificationSelectInputOpen(false)
    }

    return (
        <div id="specification-select-input">
            <IonButton fill="clear" className="activator" expand="block" onClick={() => setIsSpecificationSelectInputOpen(true)}>
                <IonLabel slot="start" style={{ display: 'flex', alignItems: 'center' }}>
                    Select { specification.name } { !!specification.attributes?.includes("Required") ? '*' : '' }
                </IonLabel>
                { value ? value : null }
                <IonIcon icon={ chevronDown } size="small" slot="end"></IonIcon>
            </IonButton>
            <IonModal isOpen={ isSpecificationSelectInputOpen }>
                <IonHeader style={{ boxShadow: 'none' }}>
                    <IonToolbar>
                        <IonButton slot="start" fill="clear" onClick={() => setIsSpecificationSelectInputOpen(false)}>Close</IonButton>
                        <IonTitle>Select { specification.name } { !!specification.attributes?.includes("Required") ? '*' : '' }</IonTitle>
                        <IonButton slot="end" fill="clear" onClick={() => handleDoneSelect()}>Done</IonButton>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    { specification ? (
                    <IonList>
                        { specification.fieldOptions.map((option, index) => (
                            <IonItem key={`${specification._id}-specification-option-${index}`} button onClick={() => handleOnSelect(option)}>
                                { isSelected(option) ? (
                                    <IonIcon slot="end" icon={ checkmark }></IonIcon>
                                ): null}
                                { option }
                            </IonItem>
                        )) }
                    </IonList>
                    ): null }
                </IonContent>

            </IonModal>
        </div>
    )
}