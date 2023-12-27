import { IonButton, IonIcon, IonModal, IonContent, IonList, IonItem, IonGrid, IonRow, IonCol, useIonAlert, useIonLoading, useIonToast, IonFooter, IonToolbar } from "@ionic/react"
import { starOutline, star } from "ionicons/icons"
import { useEffect, useMemo, useRef, useState } from "react"
import { submitProductRatingToAPI } from "../../../requests/product-rating.request"
import { useCurrentSelectedProductRatingByUser } from "../../../hooks/shop/useCurrentSelectedProductRatingByUser"
import { iProduct } from "../../../requests/product.request"


const ratingValues = [
    { rate: 1, satisfaction: "Very Dissatisfied" },
    { rate: 2, satisfaction: "Dissatisfied" },
    { rate: 3, satisfaction: "Neutral" },
    { rate: 4, satisfaction: "Satisfied" },
    { rate: 5, satisfaction: "Very Satisfied" }
];


interface iProductWithRating extends iProduct {
    avgRating: null | number
}

type ProductRatingProps = {
    product: iProductWithRating,
    onRatingSuccess: () => void
}

const ProductRating: React.FC<ProductRatingProps> = ({ product, onRatingSuccess }) => {

    const [currentRatingSelect, setCurrentRatingSelected] = useState({ rate: 5, satisfaction: "Very Satisfied" })

    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();
    const [presentToast] = useIonToast();

    const { CurrentUserRating, isCurrentUserRatingLoading, refetch } = useCurrentSelectedProductRatingByUser(product?._id)

    

    const ratingDialog = useRef<HTMLIonModalElement>(null)

    useEffect(() => {
        if (CurrentUserRating) {
            const rating = ratingValues.find((rating) => rating.rate == CurrentUserRating.rating)
            if (rating) {
                setCurrentRatingSelected(rating)
            }
        }
    }, [CurrentUserRating])


    const handleRatingDialog = () => {
        ratingDialog.current?.present()
    }

    const handleSelectRating = (rating: { rate: number; satisfaction: string; }) => {
        setCurrentRatingSelected(rating)
    }

    const submitRating = async () => {
        try {
            await present();
            const result = await submitProductRatingToAPI(currentRatingSelect.rate, product._id)
            onRatingSuccess()
            await presentToast(result.message, 3000)
        } catch (err: any) {
            presentAlert(err)
        } finally {
            await dismiss();
        }
        ratingDialog.current?.dismiss()
    }

    const averageRating = useMemo(() => {
        if (product?.avgRating) {
            return product.avgRating
        }
        return 0;
    }, [product?.avgRating])

    return (
        <>
        
            <IonButton fill='clear' id='open-modal' className='rating-button' onClick={() => handleRatingDialog()}>
            {
                Array.from(Array(Math.round(averageRating)).keys()).map((index) => (
                    <IonIcon slot='icon-only' size='small' color={"primary"} icon={ star } key={index}></IonIcon>
                ))

                
            }
            {
                Array.from(Array(5 - Math.round(averageRating)).keys()).map((index) => (
                    <IonIcon slot='icon-only' size='small' color={"primary"} icon={ starOutline } key={`non-rating-${index}`}></IonIcon>
                ))
            }
            </IonButton>
            <IonModal
                trigger='open-modal'
                ref={ratingDialog}
                breakpoints={[0.1, 0.5,0.9]}
                initialBreakpoint={0.5}
            >
                <IonContent>
                    <IonList lines='full' >
                        { ratingValues.map((rating, index) => (
                            <IonItem button key={`rate-${index}`} onClick={() => handleSelectRating(rating)}>
                                {
                                    Array.from(Array(rating.rate).keys()).map((index) => (
                                        <IonIcon size='small' color={"primary"} icon={ currentRatingSelect.rate == rating.rate ? star : starOutline } key={`rate-${index}`}></IonIcon>
                                    ))
                                }
                            </IonItem>
                        )) }
                    </IonList>
                    <IonGrid>
                        <IonRow>
                            <IonCol size='6'>
                                <IonButton fill='outline' expand='block' onClick={() => ratingDialog.current?.dismiss()}>Close</IonButton>
                            </IonCol>
                            <IonCol size='6'>
                                <IonButton fill='solid' expand='block' onClick={() => submitRating()}>Submit</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    
                </IonContent>
                
            </IonModal>

        </>
    )
}

export default ProductRating