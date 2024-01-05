import React, { useEffect, useMemo, useRef, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonImg, IonGrid, IonRow, IonCol, IonIcon, IonButton, IonModal, IonList, IonItem, IonFooter, useIonLoading, useIonAlert, useIonToast } from '@ionic/react';
import { useParams } from 'react-router';
import { useProduct } from '../../hooks/product/useProduct';

import '../../styles/v1/pages/shop/ViewShopProduct.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';

// Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { cartOutline, star, starOutline } from 'ionicons/icons';
import { iProduct } from '../../requests/product.request';
import { getCurrentUserRatingForTheProduct, submitProductRatingToAPI } from '../../requests/product-rating.request';
import { useCurrentSelectedProductRatingByUser } from '../../hooks/shop/useCurrentSelectedProductRatingByUser';
import ProductRating from './components/ProductRating';
import AddToCart from './components/AddToCart';
import BuyNow from './components/BuyNow';


interface iProductWithRating extends iProduct {
    avgRating: null | number
}



const ViewShopProduct: React.FC = () => {

    const { id }: { id: string } = useParams();
    const { ProductInfo, isProductInfoLoading: isProductLoading, refetch: refetchProductInfo } = useProduct(id)

    const product = ProductInfo as iProductWithRating;
    
    return (
        <IonPage id='view-shop-product'>
            <IonHeader>
                <IonToolbar className="header-buttons">
                    <IonButtons slot='start'>
                    <IonBackButton defaultHref='/shop'></IonBackButton>
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonButton routerLink="/shop/cart">
                            <IonIcon icon={ cartOutline } />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
                
            </IonHeader>
            <IonContent fullscreen>
                <Swiper
                    // install Swiper modules
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    // onSwiper={(swiper) => console.log(swiper)}
                    // onSlideChange={() => console.log('slide change')}
                >
                    { product && product?.files.map((file) => (
                        <SwiperSlide key={file._id}>
                            <IonImg src={ file.file_location }></IonImg>
                        </SwiperSlide>
                    )) }
                </Swiper>
                <IonGrid>
                    <IonRow className='product-details'>
                        <IonCol size='12' className='product-name'>
                            { product?.productName }
                        </IonCol>
                        <IonCol size='12' className='product-price'>
                            ₱{ product?.priceRange }
                        </IonCol>
                    </IonRow>
                    <IonRow class='product-action-buttons'>
                        <IonCol size='6'>
                            { product ? (
                                <ProductRating product={product} onRatingSuccess={() => refetchProductInfo()} />
                            ) : null }
                        </IonCol>
                        <IonCol size='6'></IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size='12'>
                            { product?.productDescription }
                        </IonCol>
                    </IonRow>
                </IonGrid>
                
            </IonContent>
            { product ? (
                <IonFooter>
                    <IonToolbar>
                        <IonGrid>
                            <IonRow class='ion-justify-content-end'>
                                <IonCol size='12' style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <AddToCart product={product} />
                                    <BuyNow product={product} />
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonToolbar>
                </IonFooter>
            ): null }
        </IonPage>
    );
};

export default ViewShopProduct;
