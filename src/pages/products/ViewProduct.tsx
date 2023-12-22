import { IonAvatar, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonPage, IonRow } from "@ionic/react";
import { useParams } from "react-router"
import { useProduct } from "../../hooks/product/useProduct";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import '@ionic/react/css/ionic-swiper.css';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

import "../../styles/v1/pages/products/ViewProduct.scss"
import { useEffect, useState } from "react";

export const ViewProduct: React.FC = () => {
    const {id: product_id} = useParams<{id: string}>();

    const { ProductInfo } = useProduct(product_id);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    useEffect(() => {
        console.log(thumbsSwiper)
    }, [thumbsSwiper])
    
    return (
        <IonPage id="view-product">
            
            <IonContent fullscreen>
                {
                    ProductInfo?.files ? (
                        
                        <Swiper
                            loop={true}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[Thumbs]}
                        >
                            {
                            ProductInfo?.files.map(file => (
                                <SwiperSlide key={file._id} style={{ height: "250px" }}>
                                    <IonImg src={ file.file_location } style={{ height: "100%" }} />
                                </SwiperSlide>
                            ))
                            }
                        </Swiper>

                    ) : 
                    (
                        <></>
                    )
                }
                
                           <Swiper
                                onSwiper={() => setThumbsSwiper}
                                loop={true}
                                spaceBetween={10}
                                slidesPerView={1}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                           >

{
                            ProductInfo?.files.map(file => (
                                <SwiperSlide key={file._id} style={{ height: "50px" }}>
                                    <IonImg src={ file.thumbnail_location } style={{ height: "100%" }} />
                                </SwiperSlide>
                            ))
                            }
                           </Swiper>
            </IonContent>
        </IonPage>
    )
}