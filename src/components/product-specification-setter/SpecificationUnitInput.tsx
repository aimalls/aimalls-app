import { IonCol, IonGrid, IonInput, IonRow, IonSelect, IonSelectOption } from "@ionic/react";
import { FC, useEffect, useMemo, useState } from "react";
import { iProductSpecification } from "../../requests/product-specification.request";

import "../../styles/v1/components/product-specification-setter/SpecificationUnitInput.scss"

interface iSpecificationUnitInputProps {
    specification: iProductSpecification,
    value: string,
    onChange: (value: string) => void
}

export const SpecificationUnitInput: FC<iSpecificationUnitInputProps> = ({ specification, onChange, value }) => {

 

    const [unitValue, setUnitValue] = useState("");
    const [unit, setUnit] = useState("");


    useEffect(() => {
        if (value !== "") {
            const explodedValue = value.split(" ")
            setUnitValue(explodedValue[0]);
            setUnit(explodedValue[1])
        }
    }, [])

    useEffect(() => {
        if (unitValue !== "" &&  unit !== "") {
            onChange(`${unitValue} ${unit}`)
        }
    }, [unitValue, unit])

    const handleChangeValue = (unitValue: string) => {
        setUnitValue(unitValue)
    }

    const handleChangeUnit = (unit: string) => {
        setUnit(unit)
    }

    return (
        <div id="specification-unit-input">
            <IonInput
                type="number"
                placeholder="Please input"
                label={specification.name}
                labelPlacement="floating"
                fill="solid"
                value={unitValue}
                onIonInput={({detail}) => handleChangeValue(detail.value!)}
            ></IonInput>
            <IonSelect
                labelPlacement="floating"
                label="Select Unit"
                className="col-2"
                value={unit}
                onIonChange={({ detail }) => handleChangeUnit(detail.value)}
            >
                { specification.fieldOptions.map((option, index) => 
                    <IonSelectOption 
                        key={`${specification._id}-specification-unit-option-${index}`} 
                        value={option}
                    >
                        { option }
                    </IonSelectOption>
                )}
            </IonSelect>
        </div>
    )
}