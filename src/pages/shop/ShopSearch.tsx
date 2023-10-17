import { FC, useState } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow, useIonAlert, useIonLoading, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonIcon, useIonToast, IonInput, IonList, IonListHeader, IonItem, IonLabel } from "@ionic/react";
import { useHistory } from "react-router";
import { searchOutline, camera, cartOutline, chatboxEllipses, search, mic } from "ionicons/icons";
import "../../styles/v1/pages/shop/ShopSearch.scss"
import { getSearchSuggestionsFromAPI, iSearchSuggestion } from "../../requests/product.request";
export interface iProps {}
export const ShopSearch: FC<iProps> = (props): JSX.Element => {
    const navigation = useHistory();
    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();

    const [presentToast] = useIonToast();

    const [searchSuggestions, setSearchSuggestions] = useState<iSearchSuggestion[]>([]);

    const [searchString, setSearchString] = useState("")

    const handleCameraSearch = async () => {
        await presentToast("Smart scan is not yet available!", 3000)
    }

    const handleSearchInput = async (value: string) => {
        setSearchString(value)
        if (value === "") {
            setSearchSuggestions([])
            return
        }
        try {
            const result = await getSearchSuggestionsFromAPI(value);
            setSearchSuggestions(result)
        } catch (err: any) {
            presentAlert(err.response.data.message)
        } finally {
            
        }
    }

    return (
        <IonPage id="shop-search">
            <IonHeader class="ion-no-border">
                <IonToolbar>
                    <IonButtons slot="start" style={{ position: "fixed" }}>
                        <IonBackButton defaultHref="/shop"></IonBackButton>
                    </IonButtons>
                    <IonTitle class="ion-text-center">Search</IonTitle>
                </IonToolbar>
                <IonToolbar>
                    <div className="search-bar-wrapper">
                        
                        <div className="search-bar">
                            <IonButton fill="clear">
                                <IonIcon icon={ camera }></IonIcon>
                            </IonButton>
                            <IonInput type="text"
                                debounce={1000}
                                value={searchString}
                                placeholder="Search Text..."
                                onIonInput={(event) => handleSearchInput(event.detail.value!)}
                            />
                            <IonButtons slot="end">
                                <IonButton fill="clear">
                                    <IonIcon slot="icon-only" icon={ mic }></IonIcon>
                                </IonButton>
                            </IonButtons>
                            <IonButtons slot="end">
                                <IonButton fill="clear" onClick={() => navigation.replace(`/shop/search/${searchString}`)}>
                                    <IonIcon slot="icon-only" icon={ search }></IonIcon>
                                </IonButton>
                            </IonButtons>
                        </div>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList lines="full">
                    <IonListHeader>Suggestions</IonListHeader>
                    { searchSuggestions && searchSuggestions.length !== 0 ? (
                        <>
                        { searchSuggestions.map(suggestion => (
                            <IonItem key={suggestion.objectID} onClick={() => navigation.push(`/shop/search/${suggestion.name}`)}>
                                <IonLabel>{ suggestion.name }</IonLabel>
                            </IonItem>

                        )) }
                        </>
                    ) : (
                        <IonItem>
                            <IonLabel>No Suggestions Found.</IonLabel>
                        </IonItem>
                    )}
                </IonList>
            </IonContent>
        </IonPage>
    )
};
export default ShopSearch;