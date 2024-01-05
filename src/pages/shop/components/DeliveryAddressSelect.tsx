import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonModal, IonRadio, IonToolbar } from "@ionic/react"
import { useEffect, useMemo, useRef, useState } from "react"
import { useUserAddress } from "../../../hooks/user-address/useUserAddress"
import { iUserAddress } from "../../../requests/user-address.request"

import "../../../styles/v1/pages/shop/components/DeliveryAddressSelect.scss"
import { arrowBack } from "ionicons/icons"

type DeliveryAddressSelectProps = {
    value: iUserAddress
    onChange?: (address: iUserAddress) => void
}

export const DeliverAddressSelect: React.FC<DeliveryAddressSelectProps> = ({ onChange, value: defaultAddress }) => {

    const { userAddresses, userAddressesLoading, refetchAddresses } = useUserAddress();


    const defaultDeliveryAddress = useMemo<iUserAddress>(() => {
        if (userAddresses) {
            return userAddresses.find((address: iUserAddress) =>{
                return address.default && !address.isDeleted && address.label === "Delivery"
            })
        }
     }, [userAddresses])

    const activeAddresses = useMemo<iUserAddress[]>(() => {
        if (userAddresses) {
            return userAddresses.filter((address: iUserAddress) => !address.isDeleted)
        }
    }, [userAddresses]);

    useEffect(() => {
        if (defaultDeliveryAddress && onChange) {
            // setCurrentDeliveryAddress(defaultDeliveryAddress._id)
            onChange(defaultDeliveryAddress)
        }
    }, [defaultDeliveryAddress])

    const addressChangeModalRef = useRef<HTMLIonModalElement>(null);

    const handleChangeDeliverAddress = (address: iUserAddress) => {
        if (onChange) onChange(address)

        addressChangeModalRef.current?.dismiss()
    }

    return (
        <>
            { defaultAddress._id ? (
                <div className="current-delivery-address">
                    <div className="address-type">
                        <div className="type">
                           Address
                        </div>
                        { onChange ? (
                        <div className="change-button">
                            <IonButton fill="clear" size="small" id="delivery-address-change-button">Change</IonButton>
                        </div>
                        ): null }
                    </div>
                    <div className="contact-info">
                        { `${defaultAddress.contactName} | ${defaultAddress.contactNumber}` }
                    </div>
                
                    <div className="full-address">
                        { 
                            `${defaultAddress.streetBuildingHouse} 
                            ${defaultAddress.barangay.name} ,
                            ${defaultAddress.city.name} ,
                            ${defaultAddress.province.name} ,
                            ${defaultAddress.region.name} ,
                            ${defaultAddress.postalCode}
                            ` }
                    </div>
                    <div className="default">
                        { defaultAddress.default ? (
                            <IonChip color={"primary"}>Default { `${defaultAddress.label} Address` }</IonChip>
                        ) : null }
                    </div>
                    
                </div>
            ): null }
            { defaultAddress._id && onChange ? (
                <IonModal
                    ref={ addressChangeModalRef }
                    trigger="delivery-address-change-button"
                    id="delivery-address-modal"
                >
                    <IonHeader>
                        <IonToolbar>
                            <IonButtons slot="start">
                                <IonButton onClick={() => addressChangeModalRef.current?.dismiss()}>
                                    <IonIcon slot="icon-only" icon={ arrowBack }></IonIcon>
                                </IonButton>
                            </IonButtons>
                            Select Address
                            
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <IonList lines="full">
                            { activeAddresses && activeAddresses.length !== 0 ? activeAddresses.map((address: iUserAddress) => (
                                <IonItem key={address._id} button onClick={() => handleChangeDeliverAddress(address)}>
                                    <IonLabel>
                                        <div className="address-type">
                                            { `${address.label} Address` }
                                        </div>
                                        <div className="contact-info">
                                            { `${address.contactName} | ${address.contactNumber}` }
                                        </div>
                                    
                                        <div className="full-address">
                                            { 
                                                `${address.streetBuildingHouse} 
                                                ${address.barangay.name} ,
                                                ${address.city.name} ,
                                                ${address.province.name} ,
                                                ${address.region.name} ,
                                                ${address.postalCode}
                                                ` }
                                        </div>
                                        <div className="default">
                                            { address.default ? (
                                                <IonChip color={"primary"}>Default</IonChip>
                                            ) : null }
                                        </div>
                                    </IonLabel>
                                </IonItem>
                            )) : null }
                        </IonList>
                    </IonContent>
                </IonModal>
            ) : null}
            
        </>
    )
}

export default DeliverAddressSelect;