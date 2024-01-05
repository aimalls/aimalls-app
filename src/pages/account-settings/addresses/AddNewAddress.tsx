import { FC, useEffect, useState } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow, useIonAlert, useIonLoading, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonList, IonListHeader, IonItem, IonInput, IonSelect, IonSelectOption, IonLabel, IonToggle, useIonToast } from "@ionic/react";
import { useHistory, useParams } from "react-router";
import useAddressSelector, { iBarangay, iCity, iProvince, iRegion } from "../../../hooks/address/useAddressSelector";
import { saveNewUserAddress } from "../../../requests/user-address.request";
import { useUserAddress } from "../../../hooks/user-address/useUserAddress";
export interface iProps {}
export const AddNewAddress: FC<iProps> = (props): JSX.Element => {
    const navigation = useHistory();
    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();
    const [presentToast] = useIonToast();

    const { as } = useParams<{ as: string }>();

    const { 
        regionOptions, loadProvinces,
        provinceOptions, loadCities,
        cityOptions, loadBarangays,
        barangayOptions
    } = useAddressSelector();


    const [contact, setContact] = useState({
        contactName: "",
        contactNumber: ""
    })

    interface iAddress {
        region: iRegion,
        province: iProvince,
        city: iCity,
        barangay: iBarangay,
        postalCode: string,
        streetBuildingHouse: string
    }
    const [address, setAddress] = useState<iAddress>({
        region: {} as iRegion,
        province: {} as iProvince,
        city: {} as iCity,
        barangay: {} as iBarangay,
        postalCode: "",
        streetBuildingHouse: ""
    })

    const [settings, setSettings] = useState({
        label: as ? as : "Delivery",
        setAsDefault: false
    })


    const handleContactChange = (key: string, value: string) => {
        setContact(prev => {
            const current = {...prev};
            current[key as keyof typeof current] = value
            return current;
        })
    }

    const { userAddresses, userAddressesLoading, refetchAddresses } = useUserAddress();

    const handleAddressChange = <Key extends keyof iAddress>(key: Key, value: iAddress[Key]) => {
        if (!value) return;
        
        setAddress(prev => {
            const current = {...prev};
            current[key] = value
            return current;
        })
        
        

        if (key == "region") {
            let selectedRegion = value as iRegion;
            setAddress(prev => {
                const current = {...prev};
                current["province"] = {} as iProvince;
                current["city"] = {} as iCity;
                current["barangay"] = {} as iBarangay;
                return current;
            })
            loadProvinces(selectedRegion.id);

        }

        if (key == "province") {
            let selectedProvince = value as iProvince;
            setAddress(prev => {
                const current = {...prev};
                current["city"] = {} as iCity;
                current["barangay"] = {} as iBarangay;
                return current;
            })
            loadCities(selectedProvince.id);
        }

        if (key == "city") {
            let selectedCity = value as iCity;
            setAddress(prev => {
                const current = {...prev};
                current["barangay"] = {} as iBarangay;
                return current;
            })
            loadBarangays(selectedCity.id);
        }
    }

    const handleAddressLabelChange = (label: string) => {
        setSettings(prev => {
            let curr = {...prev};
            curr.label = label;
            return curr;
        })
    }

    const handleSetAsDefaultChange = (value: boolean) => {
        setSettings(prev => {
            let curr = {...prev};
            curr.setAsDefault = value;
            return curr;
        })
    }

    const handleAddressSave = async () => {
        let params = {
            contact,
            address,
            settings
        }

        try {
            await present();
            const result = await saveNewUserAddress(params);
            await presentToast(result.message, 4000)
            await refetchAddresses()
            navigation.replace("/account-settings/addresses")
        } catch (err: any) {
            presentAlert(err.response.data.message)
        } finally {
            await dismiss();
        }

        
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/account-settings/addresses"></IonBackButton>
                    </IonButtons>
                    <IonTitle className="ion-text-center">Add New Address</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={handleAddressSave}>Save</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList lines="full">
                    <IonListHeader>Contact</IonListHeader>
                    <IonItem>
                        <IonInput
                            type="text"
                            placeholder="Input Full Name"
                            label="Full Name"
                            value={contact.contactName}
                            labelPlacement="floating"
                            onIonInput={(e) => handleContactChange("contactName", e.detail.value!)}
                        />
                    </IonItem>
                    <IonItem>
                        <IonInput
                            type="text"
                            placeholder="Phone Number"
                            label="Phone Number"
                            value={contact.contactNumber}
                            labelPlacement="floating"
                            onIonInput={(e) => handleContactChange("contactNumber", e.detail.value!)}
                        />
                    </IonItem>
                    <IonListHeader>Address</IonListHeader>
                    <IonItem>
                        <IonSelect
                            placeholder="Select Region"
                            labelPlacement="floating"
                            label="Region"
                            value={address.region}
                            onIonChange={(e) => handleAddressChange("region", e.detail.value!)}
                        >
                            { regionOptions.map((region: iRegion) => (
                                <IonSelectOption value={region} key={`region-${region.id}`}>
                                    { `${region.name}` }
                                </IonSelectOption>
                            )) }
                        </IonSelect>
                    </IonItem>
                    <IonItem>
                        <IonSelect
                            placeholder="Select Province"
                            labelPlacement="floating"
                            label="Province"
                            value={address.province}
                            onIonChange={(e) => handleAddressChange("province", e.detail.value!)}
                        >
                            { provinceOptions.map((province: iProvince) => (
                                <IonSelectOption value={province} key={`province-${province.id}`}>
                                    { `${province.name}` }
                                </IonSelectOption>
                            )) }
                        </IonSelect>
                    </IonItem>
                    <IonItem>
                        <IonSelect
                            placeholder="Select City"
                            labelPlacement="floating"
                            label="City"
                            value={address.city}
                            onIonChange={(e) => handleAddressChange("city", e.detail.value!)}
                        >
                            { cityOptions.map((city: iCity) => (
                                <IonSelectOption value={city} key={`city-${city.id}`}>
                                    { `${city.name}` }
                                </IonSelectOption>
                            )) }
                        </IonSelect>
                    </IonItem>
                    <IonItem>
                        <IonSelect
                            placeholder="Select Barangay"
                            labelPlacement="floating"
                            label="Barangay"
                            value={address.barangay}
                            onIonChange={(e) => handleAddressChange("barangay", e.detail.value!)}
                        >
                            { barangayOptions.map((barangay: iBarangay) => (
                                <IonSelectOption value={barangay} key={`barangay-${barangay.id}`}>
                                    { `${barangay.name}` }
                                </IonSelectOption>
                            )) }
                        </IonSelect>
                    </IonItem>
                    <IonItem>
                        <IonInput
                            type="number"
                            placeholder="Postal Code"
                            label="Postal Code"
                            labelPlacement="floating"
                            value={address.postalCode}
                            onIonInput={(e) => handleAddressChange("postalCode", e.detail.value!)}
                        />
                    </IonItem>
                    <IonItem>
                        <IonInput
                            type="text"
                            placeholder="Stree Name, Bldg., House #."
                            label="Stree Name, Bldg., House #."
                            labelPlacement="floating"
                            value={address.streetBuildingHouse}
                            onIonInput={(e) => handleAddressChange("streetBuildingHouse", e.detail.value!)}
                        />
                    </IonItem>
                </IonList>
                <IonList lines="full">
                    <IonListHeader>Settings</IonListHeader>
                    <IonItem>
                        <IonLabel>Label As</IonLabel>
                        <IonButton onClick={() => handleAddressLabelChange("Delivery")} color={settings.label === "Delivery" ? "primary" : "light"}>Delivery</IonButton>
                        <IonButton onClick={() => handleAddressLabelChange("Pick-up")} color={settings.label === "Pick-up" ? "primary" : "light"}>Pick-up</IonButton>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Set as Default</IonLabel>
                        <IonToggle checked={settings.setAsDefault} onIonChange={(e) => handleSetAsDefaultChange(e.detail.checked)}>Set as Default</IonToggle>
                    </IonItem>
                </IonList>
            </IonContent>

        </IonPage>
    )
};
export default AddNewAddress;