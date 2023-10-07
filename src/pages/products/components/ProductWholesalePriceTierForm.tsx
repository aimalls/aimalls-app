import { FC, useEffect, useState } from "react";
import { iProductWholeSalePriceTier } from "./SalesInformation";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonIcon, IonInput } from "@ionic/react";
import { close } from "ionicons/icons";

interface iProductWholesalePriceTierFormProps {
    productWholeSaleTier: iProductWholeSalePriceTier,
    index: number,
    onRemove: (id: string) => void,
    onChange: (productWholeSaleTier: iProductWholeSalePriceTier) => void
}



export const ProductWholesalePriceTierForm: FC<iProductWholesalePriceTierFormProps> = ({ productWholeSaleTier, index, onRemove, onChange }) => {

  
    const [productWholeSaleTierV, setProductWholeSaleTierV] = useState<iProductWholeSalePriceTier>(productWholeSaleTier)

    useEffect(() => {
        if (productWholeSaleTier) {
            onChange(productWholeSaleTierV)
        }
    }, [productWholeSaleTierV])

    const handleProductWholeSalesTierChange = <Key extends keyof iProductWholeSalePriceTier>(key: Key, value: iProductWholeSalePriceTier[Key]) => {
        setProductWholeSaleTierV(current => {
            let curr = { ...current };

            curr[key] = value;

            return curr;
        })
    }
    

    return (
        <IonCard style={{ padding: '0px' }}>
            <IonCardHeader>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>Price Tier {index + 1}</div>
                    <IonButton fill="clear" onClick={() => onRemove(productWholeSaleTier.id)}>
                        <IonIcon icon={ close }></IonIcon>
                    </IonButton>
                </div>
            </IonCardHeader>
            <IonCardContent>
                <IonInput
                    label="Min. Quantity"
                    placeholder="Input minimum order quantity"
                    labelPlacement="floating"
                    fill="solid"
                    type="number"
                    value={productWholeSaleTier.minQty}
                    style={{ marginBottom: '10px' }}
                    onIonInput={({ detail }) => handleProductWholeSalesTierChange("minQty", detail.value!)}
                ></IonInput>
                <IonInput
                    label="Max. Quantity"
                    placeholder="Input maximum order quantity"
                    labelPlacement="floating"
                    fill="solid"
                    type="number"
                    value={productWholeSaleTier.maxQty}
                    style={{ marginBottom: '10px' }}
                    onIonInput={({ detail }) => handleProductWholeSalesTierChange("maxQty", detail.value!)}
                ></IonInput>
                <IonInput
                    label="Price"
                    placeholder="Input Price"
                    labelPlacement="floating"
                    fill="solid"
                    type="number"
                    value={productWholeSaleTier.price}
                    style={{ marginBottom: '10px' }}
                    onIonInput={({ detail }) => handleProductWholeSalesTierChange("price", detail.value!)}
                ></IonInput>
            </IonCardContent>
        </IonCard>
    )
}