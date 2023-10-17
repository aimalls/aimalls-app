import { FC } from "react";
import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, useIonAlert, useIonLoading } from "@ionic/react";
import { useHistory } from "react-router";
export interface iProps { }
import "../../styles/v1/pages/dashboard/Dashboard.scss"

import logoRobot from "../../assets/images/logo-robot.png"
import { add, addCircle, addCircleOutline, apps, basket, buildOutline, card, chevronForward, list, location, megaphone, megaphoneOutline, notifications, pencil, settings, walletOutline } from "ionicons/icons";
import { useAccountProfile } from "../../hooks/account-profile/useAccountProfile";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
export const Dashboard: FC<iProps> = (props): JSX.Element => {
    const navigation = useHistory();
    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();

    const accountProfile = useAccountProfile();

    const { name } = useSelector((state: RootState) => state.accountProfileStore)
    
    return (
        <IonPage id="dashboard">
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <IonMenuButton autoHide={false}></IonMenuButton>
                            <IonButton fill="clear" size="default" color={"light"}>
                                <IonIcon icon={notifications} size="default"></IonIcon>
                            </IonButton>
                        </IonCol>
                        <IonCol size="12">
                            <IonCard>
                                <IonCardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <IonAvatar>
                                            <img src={logoRobot} />
                                        </IonAvatar>
                                        <div style={{ padding: '0px 10px' }}>
                                            
                                            <div className="shop-name" style={{ fontWeight: 'bold' }}>{ name.first_name }'s Shop</div>
                                            {/* <div style={{ fontSize: '12px' }}>Followers: 10.2M</div> */}
                                        </div>
                                    </div>

                                    <div>
                                        <IonButton color={"dark"} size="small" fill="clear" routerLink="account-settings/profile">
                                            <IonLabel slot="start" style={{ fontWeight: 'bold' }}>Edit Profile</IonLabel>
                                            <IonIcon slot="end" size="small" icon={pencil}></IonIcon>
                                        </IonButton>
                                    </div>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                        {/* <IonCol size="12">
                            <IonCard>
                                <IonCardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <IonIcon color={"primary"} icon={location} size="large"></IonIcon>
                                        <IonLabel>Add pick-up Address</IonLabel>
                                    </div>
                                    <div>
                                        <IonButton slot="end">
                                            <IonIcon icon={add} color="light"></IonIcon>
                                        </IonButton>
                                    </div>
                                </IonCardContent>
                            </IonCard>
                            <IonCard>
                                <IonCardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <IonIcon color={"primary"} icon={card} size="large"></IonIcon>
                                        <IonLabel>Add Bank Details</IonLabel>
                                    </div>
                                    <div>
                                        <IonButton slot="end">
                                            <IonIcon icon={add} color="light"></IonIcon>
                                        </IonButton>
                                    </div>
                                </IonCardContent>
                            </IonCard>
                        </IonCol> */}
                        <IonCol size="12">
                            <IonCard className="ion-padding orders-card">
                                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                                    <div style={{ display: 'inline-flex' }}>
                                        <IonIcon icon={basket} color="primary"></IonIcon>
                                        <div style={{ marginLeft: '5px' }}>Orders</div>
                                    </div>
                                    <div>
                                        <IonIcon icon={chevronForward}></IonIcon>
                                    </div>
                                </div>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size="3">
                                            <div className="value">0</div>
                                            <div className="label">To Process</div>
                                        </IonCol>
                                        <IonCol size="3">
                                            <div className="value">0</div>
                                            <div className="label">To Ship</div>
                                        </IonCol>
                                        <IonCol size="3">
                                            <div className="value">0</div>
                                            <div className="label">Pending Returns</div>
                                        </IonCol>
                                        <IonCol size="3">
                                            <div className="value">0</div>
                                            <div className="label">Reviews</div>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonCard>
                            <IonCard className="ion-padding orders-card">
                                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                                    <div style={{ display: 'inline-flex' }}>
                                        <IonIcon icon={list} color="primary"></IonIcon>
                                        <div style={{ marginLeft: '5px' }}>Products</div>
                                    </div>
                                    <div>
                                        <IonIcon icon={chevronForward}></IonIcon>
                                    </div>
                                </div>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size="3">
                                            <div className="value">0</div>
                                            <div className="label">Active</div>
                                        </IonCol>
                                        <IonCol size="3">
                                            <div className="value">0</div>
                                            <div className="label">Stock</div>
                                        </IonCol>
                                        <IonCol size="3">
                                            <div className="value">0</div>
                                            <div className="label">Draft</div>
                                        </IonCol>
                                        <IonCol size="3">
                                            <div className="value">0</div>
                                            <div className="label">Pending</div>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol size="12">
                                            <div style={{ background: '#F0F0F0', height: '1px' }}></div>
                                            <IonButton fill="clear" size="small" routerLink="/products/new">
                                                <IonIcon slot="start" icon={addCircleOutline}></IonIcon>
                                                <IonLabel>Add Products</IonLabel>
                                            </IonButton>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonCard>
                        </IonCol>
                        <IonCol size="12">
                            <IonCard>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <IonButton fill="clear">
                                        <IonIcon slot="start" icon={buildOutline} color="primary"></IonIcon>
                                        <IonLabel slot="end" color={"dark"} style={{ textTransform: "capitalize" }}>Tools</IonLabel>
                                    </IonButton>
                                    <IonButton fill="clear">
                                        <IonIcon icon={chevronForward} color="dark" size="small"></IonIcon>
                                    </IonButton>
                                </div>
                            </IonCard>
                            <IonCard>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <IonButton fill="clear">
                                        <IonIcon slot="start" icon={walletOutline} color="primary"></IonIcon>
                                        <IonLabel slot="end" color={"dark"} style={{ textTransform: "capitalize" }}>Balance</IonLabel>
                                    </IonButton>
                                    <IonButton fill="clear">
                                        <IonIcon icon={chevronForward} color="dark" size="small"></IonIcon>
                                    </IonButton>
                                </div>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};
export default Dashboard;