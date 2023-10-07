import { IonButton, IonCard, IonCardContent, IonCardHeader, IonIcon, IonInput, IonItem, IonTitle, IonToolbar } from "@ionic/react"
import { useState, useEffect, FC } from "react"
import { iVariation, iVariationOption } from "./SalesInformation"
import { close } from "ionicons/icons"
import VariationOption from "./VariationOption"


interface iVariationFormProps {
    variationProp: iVariation,
    onVariationChange: (variation: iVariation) => void,
    index: number,
    onRemove: () => void,
    onOptionAdd: () => void,
    onOptionRemove: (optionId: string) => void
}

const VariationForm: FC<iVariationFormProps> = ({variationProp, onVariationChange, index, onRemove, onOptionAdd, onOptionRemove}) => {

    const [variation, setVariation] = useState<iVariation>(variationProp)

    const makeid = (length: number) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }

    
    const variationDefault = {
        id: makeid(5),
        name: '',
        options: [
            {
                id: makeid(7),
                name: '',
                image: null,
                price: null,
                stock: null,
                sku: ''
            }
        ]
    }

    useEffect(() => {
        onVariationChange(variation)
    }, [variation])

    const hanldeVariationChange = <Key extends keyof iVariation>(key: Key, value: iVariation[Key]) => {
        if (variation) {
        
            setVariation(current => {
                let curr = {...current};
                curr[key] = value;
                return curr;
            })
        }
    }

    
    const handleVariationOptionChange = (option: iVariationOption, optionIndex: number) => {
        setVariation(current => {
            let curr = { ...current };
            curr.options[optionIndex] = option;
            return curr;
        })
    }

    const handleOptionRemove = (optionId: string) => {
        onOptionRemove(optionId)
    }

    return (
        <IonCard style={{ padding: '0px' }}>
            <IonCardHeader>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>Variation {index + 1}</div>
                    <IonButton fill="clear" onClick={onRemove}>
                        <IonIcon icon={ close }></IonIcon>
                    </IonButton>
                </div>
            </IonCardHeader>
            <IonCardContent>
                <IonInput
                    label="Variation Name"
                    labelPlacement="floating"
                    placeholder="Input Variation Name"
                    value={variation.name}
                    fill="solid"
                    onIonChange={({detail}) => hanldeVariationChange("name", detail.value!)}
                ></IonInput>
                {/* { JSON.stringify(variation.options) } */}
                {variation.options.map((option, optionIndex) => (
                    <VariationOption 
                        key={`variation-option-${optionIndex}`} 
                        option={option} 
                        index={optionIndex}
                        onOptionRemove={(optionIndex) => handleOptionRemove(option.id)}
                        onChange={(option, index) => handleVariationOptionChange(option, index)}
                    />
                ))}
                <IonButton fill="clear" expand="block" onClick={onOptionAdd}>Add More Option</IonButton>
            </IonCardContent>
        </IonCard>
    )
}

export default VariationForm;