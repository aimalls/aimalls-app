import { FC, useEffect, useMemo, useState } from "react";
import useProductCategory, { iProductCategoryExtended } from "../hooks/product/useProductCategories";
import { IonButton, IonCheckbox, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import { checkmark, chevronDown, chevronForward } from "ionicons/icons";

import "../styles/v1/components/ProductCategoryPicker.scss"
import { iProductCategory } from "../requests/product-category.request";

interface iProductCategoryPickerProps {
    // isOpen: boolean
    onSelect?: (category: iProductCategory | iProductCategoryExtended) => void,
    selectedCategory?: iProductCategory | iProductCategoryExtended
}

export const ProductCategoryPicker: FC<iProductCategoryPickerProps> = ({onSelect, selectedCategory}) => {
    const { parentCategories, productCategories } = useProductCategory();

    const [isPickerOpen, setIsPickerOpen] = useState(false);

    const [currentCategories, setCurrentCategories] = useState<iProductCategoryExtended[]>([])
    
    useEffect(() => {
        if (parentCategories) {
            setCurrentCategories(parentCategories)
        }
    }, [parentCategories])

    const handleCategoryPickDone = () => {
        setIsPickerOpen(false)
    }

    const handleCategorySelect = (category: iProductCategoryExtended | iProductCategory) => {
        const categories = productCategories.filter((val: iProductCategoryExtended) => val.parent ===  category._id) as iProductCategoryExtended[]

        if (categories.length === 0) {
            if (!onSelect) return
            onSelect(category)
            handleCategoryPickDone()
            return
        }

        const mappedCategories = categories.map(zcategory => {

            const hasChild = productCategories.find((val: iProductCategoryExtended)  => val.parent == zcategory._id);

            return {
                ...zcategory,
                hasChild: !!hasChild
            }
        })

        setCurrentCategories(mappedCategories)
    }

    const handleBackCategory = () => {

        const theParent = productCategories.find((val: iProductCategoryExtended) => val._id == currentCategories[0].parent) as iProductCategory;

        if (!theParent) return

        const categories = productCategories.filter((val: iProductCategoryExtended) => val.parent ===  theParent.parent) as iProductCategoryExtended[]

        const mappedCategories = categories.map(zcategory => {

            const hasChild = productCategories.find((val: iProductCategoryExtended)  => val.parent == zcategory._id);

            return {
                ...zcategory,
                hasChild: !!hasChild
            }
        })
        setCurrentCategories(mappedCategories)
    }

    const isSelected = (category: iProductCategory | iProductCategoryExtended) => {
        if (selectedCategory) {
            return category._id === selectedCategory._id
        }
        return false
    }

    const selectedCategoryHistory = useMemo(() => {
        
            if (!selectedCategory) {
                return []
            }

            const categories = productCategories as iProductCategory[] | iProductCategoryExtended[];

            let currentParent = selectedCategory.parent;

            let currentHistory = [];

            if (selectedCategory?.parent) {
                let finished = false;
                do {
                    const foundParent = categories.find(v => v._id == currentParent)

                    if (foundParent) {
                        currentHistory.unshift(foundParent)
                        currentParent = foundParent.parent
                    } else {
                        finished = true;
                    }
                } while (finished == false)
            }

            currentHistory.push(selectedCategory)

            return currentHistory;

        }, [selectedCategory])

    return (
        <div id="product-category-picker">
            <IonButton fill="clear" className="activator" expand="block" onClick={() => setIsPickerOpen(true)}>
                <IonLabel slot="start" style={{ display: 'flex', alignItems: 'center' }}>
                    { !selectedCategory ? `Product Category` : (
                        <>
                            { selectedCategoryHistory.length !== 0 ? (
                                selectedCategoryHistory.map((cat, index) => (
                                    <div key={cat._id} style={{ display: 'flex', alignItems: 'center' }}>
                                        <IonLabel>
                                            { `${cat.name}` }
                                        </IonLabel>
                                        { selectedCategoryHistory.length - 2 >= index ? (
                                            <IonIcon icon={ chevronForward }></IonIcon>
                                        ): null }
                                    </div>
                                ))
                            ): null }
                        </>
                    )}
                </IonLabel>
                <IonIcon icon={ chevronDown } size="small" slot="end"></IonIcon>
            </IonButton>
            <IonModal isOpen={isPickerOpen}>
                <IonHeader style={{ boxShadow: 'none' }}>
                    <IonToolbar>
                        <IonButton slot="start" fill="clear" onClick={() =>  handleBackCategory()}>Back</IonButton>
                        <IonTitle>Select Category</IonTitle>
                        <IonButton slot="end" fill="clear" onClick={() => setIsPickerOpen(false)}>Cancel</IonButton>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    { productCategories ? (
                    <IonList>
                        { currentCategories.map((category) => (
                            <IonItem key={`category-${category._id}`} button detail={ category.hasChild } onClick={() => handleCategorySelect(category)}>
                                { !category.hasChild && isSelected(category) ? (
                                    <IonIcon slot="end" icon={ checkmark }></IonIcon>
                                ): null}
                                { category.name }
                            </IonItem>
                        )) }
                    </IonList>
                    ): null }
                </IonContent>
            </IonModal>
        </div>
    )
}

export default ProductCategoryPicker;