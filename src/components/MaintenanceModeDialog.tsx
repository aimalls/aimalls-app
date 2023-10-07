import { IonCardHeader, IonCol, IonGrid, IonHeader, IonModal, IonRow } from "@ionic/react";
import { FC } from "react";
import "../styles/v1/components/MaintenanceModeDialog.scss"
interface iMaintenanceModeDialogProps {
    isOpen: boolean
}
export const MaintenanceModeDialog: FC<iMaintenanceModeDialogProps> = ({ isOpen }) => {
    return (
        <IonModal isOpen={isOpen} id="maintenance-mode-dialog" canDismiss={false}>
            <IonGrid>
                <IonRow>
                    <IonCol size="12" className="ion-padding ion-text-justify">
                        Dear valued seller,<br /><br />

                        We're sorry, but our app is currently undergoing essential maintenance to enhance your experience and ensure smooth functionality. This maintenance is crucial to bring you the best possible service.<br /><br />
                        
                        Please come back later.<br /><br />

                        Thank you.

                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonModal>
    )
}

export default MaintenanceModeDialog;