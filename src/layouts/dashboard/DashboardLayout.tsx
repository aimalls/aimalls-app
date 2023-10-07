import { FC } from "react";
import { IonAvatar, IonButton, IonCol, IonContent, IonFooter, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonPage, IonRouterOutlet, IonRow, IonSplitPane, IonTabBar, IonTabButton, useIonAlert, useIonLoading } from "@ionic/react";
import { useHistory } from "react-router";
import DashboardRoutes from "../../routes/DashboardRoutes";
import { home, statsChart, timerOutline, personCircleOutline, bagHandleOutline, heartOutline, homeOutline, logOutOutline, peopleOutline, receiptOutline } from "ionicons/icons";

import avatar from '../../assets/images/attractive-cheerful-silly-blond-asian-girl-pointing-down-index-finger-look-camera-happy-optimistic-smile-propose-good-recommendation-standing-white-wall.jpg'
import { processLogoutToAPI } from "../../requests/auth.request";

import "../../styles/v1/layouts/dashboard/DashboardLayout.scss"
import { Sidebar } from "./Sidebar";

export interface iProps {}


export const DashboardLayout: FC<iProps> = (props): JSX.Element => {
    const navigation = useHistory();
    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();



    const processLogout = async () => {
        try {
            const logoutRequest = await processLogoutToAPI()
            localStorage.removeItem("authToken")
            navigation.push("/login")

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <IonSplitPane  when="md" contentId="dashboard-content" id="dashboard-layout">
            <Sidebar />
            <IonPage id="dashboard-content">
                <IonContent>
                    <IonRouterOutlet>
                        <DashboardRoutes />
                    </IonRouterOutlet>
                </IonContent>
                <IonFooter id="dashboard-tab-menu">
                    <IonTabBar slot="bottom" >
                        <IonTabButton tab="dashboard" href="/dashboard" style={{ background: 'transparent' }}>
                            <IonIcon icon={home} size="large" />
                            <div className="d1"></div>
                            <div className="d2"></div>
                        </IonTabButton>

                        <IonTabButton tab="stats" href="/stats" style={{ background: 'transparent' }}>
                            <IonIcon icon={statsChart} size="large" />
                        </IonTabButton>

                        <IonTabButton tab="transactions" href="/transactions" style={{ background: 'transparent' }}>
                            <IonIcon icon={timerOutline} size="large" />
                        </IonTabButton>
                        <IonTabButton tab="account" href="/account" style={{ background: 'transparent' }}>
                            <IonIcon icon={personCircleOutline} size="large" />
                        </IonTabButton>
                    </IonTabBar>
                </IonFooter>
            </IonPage>
        </IonSplitPane>
    )
};
export default DashboardLayout;