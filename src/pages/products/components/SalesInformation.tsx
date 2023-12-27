import { FC, useCallback, useEffect, useState } from "react"
import "../../../styles/v1/pages/products/components/SalesInformation.scss"
import { IonButton, IonLabel, IonIcon, IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, IonItem, IonToggle, IonInput } from "@ionic/react"
import { chevronDown } from "ionicons/icons"
import VariationForm from "./ProductVariationForm"
import { ProductWholesalePriceTierForm } from "./ProductWholesalePriceTierForm"
import { iProductSalesInfo } from "../AddNewProduct"


interface iSalesInformationProps {
    productSalesInfo?: iProductSalesInfo,
    onDone: (price: string, stock: string, variations: iVariation[], productWholeSalePriceTiers?: iProductWholeSalePriceTier[] ) => void
}

export interface iVariation {
    id: string,
    name: string,
    options: iVariationOption[],
}

export interface iVariationOption {
    id: string,
    name: string
    image: File | null,
    price: string | null,
    stock: string | null,
    sku: string
}

export interface iProductWholeSalePriceTier {
    id: string,
    minQty: string | null,
    maxQty: string | null,
    price: string | null
}


export const SalesInformation: FC<iSalesInformationProps> = ({ onDone, productSalesInfo }) => {

    const [isSalesInfoDialogOpen, setIsSalesInfoDialogOpen] = useState(false);
    const [variationsEnabled, setVariationsEnabled] = useState(false);
    const [wholeSalePriceEnabled, setWholeSalePriceEnabled] = useState(false);

    const [variations, setVariations] = useState<iVariation[]>(productSalesInfo!.variations)

    const [productPrice, setProductPrice] = useState<string>(productSalesInfo!.price)
    const [productStock, setProductStock] = useState<string>(productSalesInfo!.stock)

    useEffect(() => {
        if (productSalesInfo && productSalesInfo?.variations.length > 0) {
            setVariationsEnabled(true)
            console.log(productSalesInfo?.variations)
            setVariations(current => {
                return [...productSalesInfo?.variations]
                
            })
        }
    },  [productSalesInfo])

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
        if (variationsEnabled) {
            setVariations(current => {
                return [
                    variationDefault
                ];
            })
        } else {
            setVariations([])
            setProductPrice("")
            setProductStock("")
        }
    }, [variationsEnabled])


    const handleAddMoreVariation = () => {
        setVariations(current => {
            return [...current, variationDefault]
            
        })
    }

    const handleRemoveVariation = (variationIndex: number) => {
        const newVariation = variations.filter((v, i) => i !== variationIndex);
        setVariations((current) => {
            if (newVariation.length !== 0) {
                return newVariation;
            } else {
                return [variationDefault]
            }
        })
    }

    


    const handleVariationOptionAdd = useCallback((index: number) => {
        setVariations((current) => {
            let curr = [...current];
            let currentOptions = current[index].options;
            const newOption = {
                    id: makeid(7),
                    name: '',
                    image: null,
                    price: null,
                    stock: null,
                    sku: ''
            }
            let newOptions = [...currentOptions, newOption]
            
            curr[index].options = newOptions;
            return curr;
        })
    }, []);

    const handleVariationOptionRemove = (variationIndex: number, optionId: string) => {

        if (variations[variationIndex].options.length <= 1) {
            const newOption = {
                id: makeid(7),
                name: '',
                image: null,
                price: null,
                stock: null,
                sku: ''
            }
            setVariations((current) => {
                let curr = [...current ];
                let newOptions = [newOption]
                curr[variationIndex].options = newOptions;
                return curr;
            })
            return
        }

        

        let newOptions = variations[variationIndex].options.filter((v, i) => v.id !== optionId)
        setVariations(current => {
            let curr = [...current ];
            curr[variationIndex].options = newOptions;
            return curr;
        })
    }

    const handleVariationChange = (variation: iVariation, variationIndex: number) => {
        setVariations((current) => {
            let curr = [...current];
            curr[variationIndex] = variation;
            return curr;
        })
    }

    const handleVariationReset = () => {
        setVariations([variationDefault])
        setProductWholesalePriceTiers([{
            id: makeid(5),
            minQty: null,
            maxQty: null,
            price: null
        }])
        setVariationsEnabled(false)
        setWholeSalePriceEnabled(false)
    }




    const productWholesaleTierDefault = {
        id: makeid(5),
        minQty: null,
        maxQty: null,
        price: null
    }

    useEffect(() => {
        if (!wholeSalePriceEnabled) {
            setProductWholesalePriceTiers([])
        }
    }, [wholeSalePriceEnabled])

    const [productWholesalePriceTiers, setProductWholesalePriceTiers] = useState<iProductWholeSalePriceTier[]>([productWholesaleTierDefault])


    const handleAddMoreWholesaleTier = () => {
        setProductWholesalePriceTiers([
            ...productWholesalePriceTiers,
            {
                id: makeid(5),
                minQty: null,
                maxQty: null,
                price: null
            }
        ])
    }

    const handleProductWholesaleTierRemove = (id: string) => {
        
        if (productWholesalePriceTiers.length <= 1) {
            setProductWholesalePriceTiers([
                {
                    id: makeid(5),
                    minQty: null,
                    maxQty: null,
                    price: null
                }
            ])
            return
        }

        const newProductWholesaleTiers = productWholesalePriceTiers.filter(v => v.id !== id);
        setProductWholesalePriceTiers(newProductWholesaleTiers)
    }

    const handleProductWholeSaleTier = (productWholeSaleTier: iProductWholeSalePriceTier, index: number) => {
        setProductWholesalePriceTiers(current => {
            let curr = [...current];
            curr[index] = productWholeSaleTier;
            return curr;
        })
    }

    const handleSalesInfoDone = () => {
        onDone(productPrice, productStock, variations, productWholesalePriceTiers)
        setIsSalesInfoDialogOpen(false)
    }



    

    return (
        <div id="sales-information">
            <IonButton fill="clear" className="activator" expand="block" onClick={() => setIsSalesInfoDialogOpen(true)}>
                <IonLabel slot="start" style={{ display: 'flex', alignItems: 'center' }}>
                    Sales Info.
                </IonLabel>
                <IonIcon icon={ chevronDown } size="small" slot="end"></IonIcon>
            </IonButton>
            <IonModal isOpen={ isSalesInfoDialogOpen }>
                <IonHeader style={{ boxShadow: 'none' }}>
                    <IonToolbar>
                        <IonButton slot="start" fill="clear" onClick={() => handleVariationReset()}>Reset</IonButton>
                        <IonTitle>Set Sales Info.</IonTitle>
                        <IonButton slot="end" fill="clear" onClick={() => handleSalesInfoDone()}>Done</IonButton>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12">
                                <IonItem lines="none">
                                    <IonToggle 
                                        checked={variationsEnabled} 
                                        onIonChange={({detail}) => 
                                        setVariationsEnabled(detail.checked)}
                                    >Enable Variations
                                    </IonToggle>
                                </IonItem>
                            </IonCol>

                            
                                { variationsEnabled ? (
                                    <IonCol size="12">
                                        { variations.map((variation, index) => (
                                            <div key={`variation-${variation.id}`}>
                                                <VariationForm 
                                                    variationProp={variation} 
                                                    onVariationChange={(variation) => handleVariationChange(variation, index)} 
                                                    index={index}
                                                    onRemove={() => handleRemoveVariation(index)}
                                                    onOptionAdd={() => handleVariationOptionAdd(index)}
                                                    onOptionRemove={(optionId) => handleVariationOptionRemove(index, optionId)}
                                                />
                                            </div>
                                        )) }
                                        <IonButton fill="clear" expand="block"
                                            onClick={() => handleAddMoreVariation()}
                                        >Add More Variation</IonButton>
                                    </IonCol>
                                ): (
                                    <IonCol>
                                        <IonInput
                                            value={productPrice}
                                            type="number"
                                            label="Price *"
                                            labelPlacement="floating"
                                            fill="solid"
                                            style={{ marginBottom: '10px' }}
                                            onIonInput={({detail}) => setProductPrice(detail.value!)}
                                        ></IonInput>
                                        <IonInput
                                            value={productStock}
                                            type="number"
                                            label="Stock *"
                                            labelPlacement="floating"
                                            fill="solid"
                                            onIonInput={({detail}) => setProductStock(detail.value!)}
                                        ></IonInput>
                                    
                                    </IonCol>
                                ) }

                            <IonCol size="12">
                                <IonItem lines="none">
                                    <IonToggle checked={wholeSalePriceEnabled} onIonChange={({detail}) => setWholeSalePriceEnabled(detail.checked)}>Whole Sale Price</IonToggle>
                                </IonItem>
                            </IonCol>

                            { wholeSalePriceEnabled ? (
                                <IonCol size="12">
                                    { productWholesalePriceTiers.map((productWholeSaleTier, index) => (
                                        <ProductWholesalePriceTierForm 
                                            productWholeSaleTier={productWholeSaleTier}
                                            index={index}
                                            key={productWholeSaleTier.id}
                                            onRemove={(id) => handleProductWholesaleTierRemove(id)}
                                            onChange={(productWholeSaleTier) => handleProductWholeSaleTier(productWholeSaleTier, index)}
                                        />
                                    )) }
                                    <IonButton fill="clear" expand="block"
                                            onClick={() => handleAddMoreWholesaleTier()}
                                        >Add More Wholesale Tier</IonButton>
                                </IonCol>
                            ) : null}
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonModal>
        </div>
    )
}