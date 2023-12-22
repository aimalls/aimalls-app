import { IonContent, IonFooter, IonIcon, IonPage, IonRouterOutlet, IonSplitPane, IonTabBar, IonTabButton } from "@ionic/react";
import { home, statsChart, timerOutline, personCircleOutline } from "ionicons/icons";
import DashboardRoutes from "../../routes/DashboardRoutes";
import { useHistory } from "react-router";
import { Sidebar } from "./Sidebar";

export const DashboardLayout: React.FC = () => {
    const navigation = useHistory();
    
    return (
        <IonSplitPane when="md" contentId="dashboard-content" id="dashboard-layout">
            <Sidebar />
            <IonPage id="dashboard-content">
                {/* <IonContent>
                    <IonRouterOutlet>
                        <DashboardRoutes />
                    </IonRouterOutlet>
                </IonContent> */}
                <IonContent fullscreen>
                    
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
                        <IonTabButton tab="account" onClick={() => navigation.push("/account-settings/profile")} style={{ background: 'transparent' }}>
                            <IonIcon icon={personCircleOutline} size="large" />
                        </IonTabButton>
                    </IonTabBar>
                </IonFooter>
            </IonPage>
        </IonSplitPane>
    )
}

export default DashboardLayout;