import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonAlert, useIonLoading, useIonToast } from "@ionic/react";
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
import { saveNewProductToAPI } from "../../requests/product.request";
import { useHistory } from "react-router";
import { useUserProduct } from "../../hooks/product/useUserProduct";
import { ProductNameForm } from "./components/ProductNameForm";
import { ProductDescriptionForm } from "./components/ProductDescriptionForm";

export interface iProductImages {
    images: File[],
    thumbs: File[]
}
type spec = { [key: string]: string }

export interface iProductSalesInfo {
    price: string,
    stock: string,
    variations: iVariation[],
    productWholeSalePriceTiers: iProductWholeSalePriceTier[] | undefined
}

export interface iProductShippingInfo {
    weight: number,
    height: number,
    width: number,
    length: number
}

export const AddNewProduct: FC = () => {

    const navigation = useHistory();

    const { productCategories, parentCategories } = useProductCategory();
    const { userProducts, isUserProductsLoading, refetch: refetchUserProducts } = useUserProduct();

    const [presentAlert] = useIonAlert();
    const [present, dismiss] = useIonLoading();
    const [presentToast] = useIonToast();

    const [productImages, setProductImages] = useState<iProductImages>()

    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    
    const [selectedCategory, setSelectedCategory] = useState<iProductCategory | iProductCategoryExtended>()
    const [productSpecification, setProductSpecification] = useState<spec>({})
    const [productSalesInfo, setProductSalesInfo] = useState<iProductSalesInfo>({
        price: "",
        stock: "",
        variations: [],
        productWholeSalePriceTiers: []
    })
    const [otherProductInfo, setOtherProductInfo] = useState("");
    const [shippingInfo, setShippingInfo] = useState<iProductShippingInfo>({
        weight: 0,
        height: 0,
        width: 0,
        length: 0
    })
    

    const handleAddNewProduct = async () => {
        let params = {
            images: productImages,
            productSalesInfo,
            otherParams: JSON.stringify({
                productName,
                productDescription,
                selectedCategory: selectedCategory?._id,
                productSpecification,
                productSalesInfo,
                otherProductInfo,
                shippingInfo
            })        
        }

        try {
            await present();
            
            const result = await saveNewProductToAPI(params)
            
            await presentToast(result.message, 5000);
            await refetchUserProducts();
            navigation.replace("/products")

        } catch (err: any) {
            presentAlert(err.response.data.message)
        } finally {
            await dismiss();
        }
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
                <IonCard>
                    <ProductNameForm onDone={(value) => setProductName(value)} productName={productName} />
                    {/* <IonInput 
                        value={productName}
                        onIonInput={(event) => setProductName(event.detail.value!)}
                        type="text" 
                        label="Product Name" 
                        labelPlacement="floating" 
                        placeholder="Input Product Name"
                        maxlength={255}
                    ></IonInput> */}
                </IonCard>
                <IonCard>
                    <ProductDescriptionForm onDone={(value) => setProductDescription(value)} productDescription={productDescription} />
                    {/* <IonInput 
                        value={productDescription}
                        onIonInput={(event) => setProductDescription(event.detail.value!)}
                        type="text" 
                        label="Description" 
                        labelPlacement="floating" 
                        placeholder="Input product description"
                        maxlength={255}
                    ></IonInput> */}
                </IonCard>
                <IonCard>
                    <ProductCategoryPicker onSelect={(category) => setSelectedCategory(category)} selectedCategory={selectedCategory} />
                </IonCard>
                <IonCard>
                    <ProductSpecificationSetter onChange={(spec) => setProductSpecification(spec)} productCategory={selectedCategory} />
                </IonCard>
                <IonCard>
                    <SalesInformation productSalesInfo={productSalesInfo} onDone={(price, stock, variations, productWholeSalePriceTiers) => handleSalesInfoDone({
                        price, stock, variations, productWholeSalePriceTiers
                    })} />
                </IonCard>
                <IonCard>
                    <ShippingInfo shippingInfo={shippingInfo} onDone={(value) => setShippingInfo(value)} />
                </IonCard>
                <IonCard>
                    <OtherProductInfo onDone={(value) => setOtherProductInfo(value)} otherProductInfo={otherProductInfo} />
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