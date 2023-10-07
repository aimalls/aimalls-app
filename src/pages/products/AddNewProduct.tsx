import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react";
import { FC, useMemo, useState } from "react";
import "../../styles/v1/pages/products/AddNewProduct.scss"
import { arrowDown, chevronDown, image } from "ionicons/icons";
import ImageUpload from "../../components/ImageUpload";
import useProductCategory, { iProductCategoryExtended } from "../../hooks/product/useProductCategories";
import ProductCategoryPicker from "../../components/ProductCategoryPicker";
import { iProductCategory } from "../../requests/product-category.request";
import ProductSpecificationSetter from "../../components/ProductSpecificationSetter";
import { SalesInformation, iProductWholeSalePriceTier, iVariation } from "./components/SalesInformation";
import { ShippingInfo } from "./components/ShippingInfo";
import { OtherProductInfo } from "./components/OtherProductInfo";

export interface iProductImages {
    images: File[],
    thumbs: File[]
}
type spec = { [key: string]: string }

export interface iProductSalesInfo {
    price: string,
    stock: string,
    variations: iVariation[] | undefined,
    productWholeSalePriceTiers: iProductWholeSalePriceTier[] | undefined
}

export const AddNewProduct: FC = () => {

    const { productCategories, parentCategories } = useProductCategory();

    const [productImages, setProductImages] = useState<iProductImages>()
    const [selectedCategory, setSelectedCategory] = useState<iProductCategory | iProductCategoryExtended>()
    const [productSpecification, setProductSpecification] = useState<spec>({})
    const [productSalesInfo, setProductSalesInfo] = useState<iProductSalesInfo>()
    

    const handleAddNewProduct = () => {
        let params = {
            images: productImages,
            selectedCategory,
            productSpecification,
            productSalesInfo
        }

        console.log(params)
        // console.log(selectedCategoryHistory)
    }

    const handleSalesInfoDone = (salesInfo: iProductSalesInfo) => {
        console.log(salesInfo)
        setProductSalesInfo(salesInfo)
    }

    return (
        <IonPage id="add-new-product">
            <IonHeader>
                <IonToolbar>
                    <IonButtons style={{ position: 'fixed', top: '0', left: '0', height: '100%' }}>
                        <IonBackButton defaultHref="/products"></IonBackButton>
                    </IonButtons>
                    <IonTitle className="ion-text-center">Add New Product</IonTitle>

                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard className="form ion-padding">
                    <IonCardTitle>Product Image ({ productImages?.images.length }/8)</IonCardTitle>
                    <div style={{ marginTop: '10px' }}>
                    <ImageUpload onChange={(images, thumbs) => setProductImages({images, thumbs})} min={1} max={8} />
                    </div>
                </IonCard>
                <IonCard style={{ padding: '0px 20px' }}>
                    <IonInput 
                        type="text" 
                        label="Product Name" 
                        labelPlacement="floating" 
                        placeholder="Input Product Name"
                        maxlength={255}
                    ></IonInput>
                </IonCard>
                <IonCard style={{ padding: '0px 20px' }}>
                    <IonInput 
                        type="text" 
                        label="Description" 
                        labelPlacement="floating" 
                        placeholder="Input product description"
                        maxlength={255}
                    ></IonInput>
                </IonCard>
                <IonCard>
                    <ProductCategoryPicker onSelect={(category) => setSelectedCategory(category)} selectedCategory={selectedCategory} />
                </IonCard>
                <IonCard>
                    <ProductSpecificationSetter onChange={(spec) => setProductSpecification(spec)} productCategory={selectedCategory} />
                </IonCard>
                <IonCard>
                    <SalesInformation onDone={(price, stock, variations, productWholeSalePriceTiers) => handleSalesInfoDone({
                        price, stock, variations, productWholeSalePriceTiers
                    })} />
                </IonCard>
                <IonCard>
                    <ShippingInfo />
                </IonCard>
                <IonCard>
                    <OtherProductInfo />
                </IonCard>

                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            <IonButton expand="block" onClick={() => handleAddNewProduct()}>Add</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}