import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonAlert, useIonLoading, useIonToast } from "@ionic/react";
import { FC, useEffect, useMemo, useState } from "react";
import "../../styles/v1/pages/products/AddNewProduct.scss"
import ImageUpload from "../../components/ImageUpload";
import useProductCategory, { iProductCategoryExtended } from "../../hooks/product/useProductCategories";
import ProductCategoryPicker from "../../components/ProductCategoryPicker";
import { iProductCategory } from "../../requests/product-category.request";
import ProductSpecificationSetter from "../../components/ProductSpecificationSetter";
import { SalesInformation, iProductWholeSalePriceTier, iVariation } from "./components/SalesInformation";
import { ShippingInfo } from "./components/ShippingInfo";
import { OtherProductInfo } from "./components/OtherProductInfo";
import { saveNewProductToAPI } from "../../requests/product.request";
import { useParams } from "react-router";
import { useProduct } from "../../hooks/product/useProduct";
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

export const UpdateProduct: FC = () => {

    const { productCategories, parentCategories } = useProductCategory();

    const { id } : { id: string } = useParams();

    const { ProductInfo, isProductInfoLoading } = useProduct(id)

    const [presentAlert] = useIonAlert();
    const [present, dismiss] = useIonLoading();
    const [presentToast] = useIonToast();

    const [productImages, setProductImages] = useState<iProductImages>()

    const [productName, setProductName] = useState(ProductInfo?.productName ?? "");
    
    const [productDescription, setProductDescription] = useState(ProductInfo?.productDescription ?? "");
    
    const [selectedCategory, setSelectedCategory] = useState<iProductCategory | iProductCategoryExtended>(ProductInfo?.category!)
    const [productSpecification, setProductSpecification] = useState<spec>(ProductInfo?.productSpecifications ?? {})
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

        } catch (err: any) {
            presentAlert(err.response.data.message)
        } finally {
            await dismiss();
        }
    }

    const handleSalesInfoDone = (salesInfo: iProductSalesInfo) => {
        setProductSalesInfo(salesInfo)
    }

    useEffect(() => {
        if (ProductInfo?.category) {
            setSelectedCategory(ProductInfo.category);
        }
        if (ProductInfo?.productSpecifications) {
            setProductSpecification(ProductInfo.productSpecifications)
        }
        if (ProductInfo) {
            let variations = ProductInfo.variants.map<iVariation>((variant: any) => {
                return {
                    id: variant._id,
                    name: variant.variant,
                    options: variant.options
                }
            })


            let wholeSaleTier = ProductInfo.wholeSalePriceTier!.map<iProductWholeSalePriceTier>((ws: any) => {
                return {
                    id: ws._id,
                    minQty: ws.minimumQuantity,
                    maxQty: ws.maximumQuantity,
                    price: ws.price
                }
            })

            const params: iProductSalesInfo = {
                price: "",
                stock: "",
                variations,
                productWholeSalePriceTiers: wholeSaleTier
                
            }

            setProductSalesInfo(params)
        }
    }, [ProductInfo])
    

    return (
        <IonPage id="add-new-product">
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/products"></IonBackButton>
                    </IonButtons>Update Product

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
                    <ProductNameForm onDone={(value) => setProductName(value)} productName={ProductInfo?.productName!} />
                </IonCard>
                <IonCard>
                    <ProductDescriptionForm onDone={(value) => setProductDescription(value)} productDescription={ProductInfo?.productDescription!} />
                </IonCard>
                <IonCard>
                    <ProductCategoryPicker onSelect={(category) => setSelectedCategory(category)} selectedCategory={selectedCategory} />
                </IonCard>
                <IonCard>
                    <ProductSpecificationSetter onChange={(spec) => setProductSpecification(spec)} productSpecification={productSpecification} productCategory={ProductInfo?.category!} />
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
                            <IonButton expand="block" onClick={() => handleAddNewProduct()}>Update</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}