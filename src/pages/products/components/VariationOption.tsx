import { FC, useEffect, useState } from "react";
import { iVariationOption } from "./SalesInformation";
import { IonButton, IonIcon, IonInput } from "@ionic/react";
import { close } from "ionicons/icons";
import SingleImageUpload from "../../../components/SingleImageUpload";

interface iVariationOptionProps {
    option: iVariationOption,
    index: number,
    onOptionRemove: (optionIndex: number) => void,
    onChange: (option: iVariationOption, index: number) => void
}

export const VariationOption: FC<iVariationOptionProps> = ({ option, index, onOptionRemove, onChange }) => {

   

    const [vOption, setVOption] = useState<iVariationOption>(option)

    useEffect(() => {
        onChange(vOption, index)
    }, [vOption])

    const handleOptionChange = <Key extends keyof iVariationOption>(key: Key, value: iVariationOption[Key]) => {
        
        setVOption(current => {
            let curr = { ...current };
            curr[key] = value;
            return curr;
        })
    }

    const handleOptionRemove = () => {
        onOptionRemove(index)
    }

    return (
        <div style={{ marginTop: '10px' }} key={option.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>Option {index + 1}</div>
                <IonButton fill="clear" size="small" onClick={() => handleOptionRemove()}>
                    <IonIcon icon={ close }></IonIcon>
                </IonButton>
            </div>
            <SingleImageUpload value={option.image} key={option.id} onChange={(image) => handleOptionChange("image", image)} />
            <IonInput
                type="text"
                label="Option Name"
                value={option.name}
                placeholder="Input Price"
                labelPlacement="floating"
                fill="solid"
                style={{ marginBottom: '10px' }}
                onIonInput={({ detail }) => handleOptionChange("name", detail.value!)}
            ></IonInput>
            <IonInput
                type="number"
                label="Price *"
                value={option.price}
                placeholder="Input Price"
                labelPlacement="floating"
                fill="solid"
                style={{ marginBottom: '10px' }}
                onIonInput={({ detail }) => handleOptionChange("price", detail.value!)}
            ></IonInput>
            <IonInput
                type="number"
                label="Stock *"
                value={option.stock}
                placeholder="Input Stock"
                labelPlacement="floating"
                fill="solid"
                style={{ marginBottom: '10px' }}
                onIonInput={({ detail }) => handleOptionChange("stock", detail.value!)}
            ></IonInput>
            <IonInput
                type="text"
                label="SKU"
                value={option.sku}
                placeholder="Input SKU"
                labelPlacement="floating"
                fill="solid"
                style={{ marginBottom: '10px' }}
                onIonInput={({ detail }) => handleOptionChange("sku", detail.value!)}
            ></IonInput>
        </div>
    )
}

export default VariationOption;