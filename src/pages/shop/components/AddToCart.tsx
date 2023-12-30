import { IonButton, IonButtons, IonChip, IonCol, IonContent, IonFooter, IonGrid, IonIcon, IonImg, IonItemDivider, IonModal, IonRow, IonToolbar, useIonAlert, useIonLoading, useIonToast } from "@ionic/react"
import { iProduct } from "../../../requests/product.request"
import { useEffect, useMemo, useRef, useState } from "react"

import "../../../styles/v1/pages/shop/components/AddToCart.scss"
import { addOutline, close, navigateSharp, removeOutline } from "ionicons/icons"
import { saveCartToAPI } from "../../../requests/user-cart.request"

interface iProductWithRating extends iProduct {
    avgRating: null | number
}

type AddToCartProp = {
    product: iProductWithRating
}

type selectedVariantAndOption = {
    variant: string,
    option: string
}

export const AddToCart: React.FC<AddToCartProp> = ({ product }) => {

    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();
    const [presentToast] = useIonToast();
    
    const addToCartDialog = useRef<HTMLIonModalElement>(null)

    const [selectedVariantAndOptions, setSelectedVariantAndOptions] = useState<selectedVariantAndOption[]>([])
    const [selectedOptionPrice, setSelectOptionPrice] = useState<number>(0);
    const [selectOptionStock, setSelectOptionStock] = useState<number>(0);

    
    const [quantity, setQuantity] = useState("1")

    useEffect(() => {
        if (product.variants.length == 0) {
            // setSelectedVariantAndOptions(product.variants.map((variant) => ({ variant: variant._id, option: variant.options[0]._id })))
            setSelectOptionPrice(product.price!)
            setSelectOptionStock(product.stock!)
        }
    }, [product])

    const handleQuantityChange = (value: string) => {
        if (selectOptionStock <= Number(quantity)) return
        if (!Number.isNaN(Number(value))) {
            setQuantity(value)
        }
    }

    const handleOnQuantityBlur = (value: string) => {
        if (selectOptionStock <= Number(value)) setQuantity(selectOptionStock.toString())
        if (value === "" || Number.isNaN(Number(value))) {
            setQuantity("1")
        }
    }

    const handleIncrementQuantity = () => {
        if (selectOptionStock <= Number(quantity)) return
        setQuantity((prevQuantity) => {
            const newQuantity = Number(prevQuantity) + 1
            return newQuantity.toString()
        })
    }

    const handleDecrementQuantity = () => {
        setQuantity((prevQuantity) => {
            const newQuantity = Number(prevQuantity) - 1
            if (newQuantity <= 0) {
                return "1"
            }
            return newQuantity.toString()
        })
    }

    const handleSelectVariantAndOption = (variant: string, option: string) => {
        const variantAndOption = selectedVariantAndOptions.find((selectedVariantAndOption) => selectedVariantAndOption.variant === variant)
        if (variantAndOption) {
            variantAndOption.option = option
            
            setSelectedVariantAndOptions([...selectedVariantAndOptions])
        } else {
            setSelectedVariantAndOptions([...selectedVariantAndOptions, { variant, option }])
        }
        setSelectOptionPrice(product.variants?.find((_variant) => _variant._id === variant)?.options.find((_option) => _option._id === option)?.price || 0)
        setSelectOptionStock(product.variants?.find((_variant) => _variant._id === variant)?.options.find((_option) => _option._id === option)?.stock || 0)
    }

    const isOptionSelected = (variant: string, option: string) => {
        const variantAndOption = selectedVariantAndOptions.find((selectedVariantAndOption) => selectedVariantAndOption.variant === variant)
        if (variantAndOption) {
            return variantAndOption.option === option
        }
        return false
    }

    const isIncrementable = useMemo(() => {
        if (product.variants.length > 0) {
            if (selectedVariantAndOptions.length !== product.variants.length) {
                return false
            }
            return true
        }
        return true
    }, [product, selectedVariantAndOptions, quantity])

    const isCartable = useMemo(() => {
        if (product.variants && product.variants.length !== 0) {
            if (selectedVariantAndOptions.length !== product.variants.length) {
                return false
            }
            return true
        }
        return true
    }, [selectedVariantAndOptions, quantity, product])


    const handleAddToCart = async () => {
        if (isCartable) {
            try {
                let params = {
                    productId: product._id,
                    quantity: parseInt(quantity),
                    variantsAndOptions: selectedVariantAndOptions
                }
                await present();
                const result = await saveCartToAPI(params);
                await presentToast(result.message, 3000)
            } catch (err: any) {
                presentAlert(err.response.data.message)
            } finally {
                await dismiss();
                addToCartDialog.current?.dismiss()
            }
        }
    }

    return (
        <>
            <IonButton fill="outline" id="add-to-cart-dialog-trigger" onClick={() => addToCartDialog.current?.present()}>Add to Cart</IonButton>

            <IonModal 
                ref={addToCartDialog} 
                trigger="add-to-cart-dialog-trigger"
                breakpoints={[0.1, 0.7,0.9]}
                initialBreakpoint={0.7}
                id="add-to-cart-dialog"
            >
                <IonContent>
                    <IonGrid style={{ marginTop: "10px" }}>
                        <IonRow>
                            <IonCol size="12" class="ion-sales-info-details">
                                <IonButton fill="clear" className="close-button" onClick={() => addToCartDialog.current?.dismiss()}>
                                    <IonIcon icon={ close }></IonIcon>
                                </IonButton>
                                <IonImg src={ product.files && product.files.length !== 0 ? product.files[0].thumbnail_location : "" }></IonImg>
                                <div className="sales-info">
                                    <div className="price">₱{isCartable && selectedOptionPrice !== 0 ? selectedOptionPrice : product.priceRange}</div>
                                    <div className="stock">Stock: {isCartable && selectOptionStock !== 0 ? selectOptionStock : product.totalStocks}</div>
                                </div>
                            </IonCol>
                        </IonRow>
                        <IonItemDivider></IonItemDivider>
                        { product.variants && product.variants.length !== 0 ? product.variants.map((variant) => (
                            <IonRow key={`variant-${variant._id}`}>
                                <IonCol size="12">
                                    { variant.variant }
                                </IonCol>
                                <IonCol size="12">
                                    { variant.options.map((option) => (
                                        <IonChip 
                                            outline={ isOptionSelected(variant._id, option._id) } 
                                            color={ isOptionSelected(variant._id, option._id) ? "primary" : "dark" } 
                                            key={`variant-option-${option._id}`} 
                                            onClick={() => handleSelectVariantAndOption(variant._id, option._id)}>
                                            { option.optionName }
                                        </IonChip>
                                    )) }
                                </IonCol>
                            </IonRow>
                        )): null }
                        <IonItemDivider></IonItemDivider>
                        <IonRow class="quantity-setter-wrapper">
                            <IonCol size="12">
                                <div>
                                    Quantity
                                </div>
                                <div className="quantity-setter">
                                    <button onClick={handleDecrementQuantity} disabled={ !isIncrementable }>
                                        <IonIcon icon={ removeOutline }></IonIcon>
                                    </button>
                                    <input type="text" 
                                        value={quantity} 
                                        onChange={(e) => handleQuantityChange(e.target.value)}
                                        onBlur={(e) => handleOnQuantityBlur(e.target.value)}
                                        disabled={ !isIncrementable }
                                    ></input>
                                    <button onClick={handleIncrementQuantity} disabled={ !isIncrementable }>
                                        <IonIcon icon={ addOutline }></IonIcon>
                                    </button>
                                </div>
                            </IonCol>
                        </IonRow>
                        <IonItemDivider></IonItemDivider>
                        <IonRow>
                            <IonCol size="12">
                                <IonButton disabled={!isCartable} expand="block" onClick={() => handleAddToCart()}>Add to Cart</IonButton>
                            </IonCol>
                        </IonRow>

                    </IonGrid>
                </IonContent>
                
            </IonModal>
        </>
    )
}

export default AddToCart;