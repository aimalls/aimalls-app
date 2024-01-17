import { IonBackButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonNote, IonPage, IonRefresher, IonRefresherContent, IonRow, IonText, IonTitle, IonToolbar, RefresherEventDetail, useIonAlert, useIonLoading, useIonToast } from "@ionic/react";
import useUserNotifications from "../../hooks/notification/useUserNotifications";
import "../../styles/v1/pages/notifications/UserNotifications.scss"
import { iNotification } from "../../requests/notification.request";
import { useMemo } from "react";
import moment from "moment";
import { chevronForward } from "ionicons/icons";

export const UserNotifications: React.FC = () => {

    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();
    const [presentToast] = useIonToast();

    const { userNotifications, isUserNotificationsLoading, refetch: refetchUserNotifications } = useUserNotifications()

    const momentedNotifications: iNotification[] = useMemo(() => {
        
        let notifications: iNotification[] = [];
        if (userNotifications) {
            for (let notification of userNotifications) {
                notification.createdAt = moment(notification.createdAt, "YYYY-MM-DD HH:mm").fromNow();
                notifications.push(notification)
            }
        }
        return notifications;
    }, [userNotifications])

    const handleRefetchUserNotifications = async (e: CustomEvent<RefresherEventDetail>) => {
        try {
            await present();
            await refetchUserNotifications();
        } catch (err: any) {
            presentAlert(err)
        } finally {
            await dismiss();
            e.detail.complete()
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/shop"></IonBackButton>
                    </IonButtons>
                    Notifications
                </IonToolbar>
            </IonHeader>
            <IonContent id="user-notifications" fullscreen>
                <IonRefresher slot="fixed" onIonRefresh={handleRefetchUserNotifications}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            <IonList>
                                { userNotifications && userNotifications.length !==0  && !isUserNotificationsLoading ? 
                                    momentedNotifications.map(notification => (
                                        <IonItem button={!!notification.link} detail={false} routerLink={notification.link}>
                                            <div className="unread-indicator-wrapper" slot="start">
                                                <div className="unread-indicator"></div>
                                            </div>
                                            <IonLabel>
                                            <strong>{ notification.title }</strong>
                                            <br />
                                            <IonNote color="medium" className="ion-text-wrap">
                                                { notification.message }
                                            </IonNote>
                                            </IonLabel>
                                            <div className="metadata-end-wrapper" slot="end">
                                                <IonNote color="medium">{ notification.createdAt }</IonNote>
                                                <IonIcon color="medium" icon={chevronForward}></IonIcon>
                                            </div>
                                        </IonItem>
                                    )) 
                                : isUserNotificationsLoading ? (
                                    <IonItem>Loading Notifications...</IonItem>
                                ) : userNotifications?.length === 0 ? (
                                    <IonItem>No notifications found.</IonItem>
                                ) : null  }
                            </IonList>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default UserNotifications;