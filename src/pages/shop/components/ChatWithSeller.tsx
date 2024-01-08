import { IonButton, IonIcon, useIonAlert, useIonLoading, useIonToast } from "@ionic/react";
import { chatboxEllipses } from "ionicons/icons";
import { initializeChatRoomToAPI } from "../../../requests/chat-room.request";
import { useHistory } from "react-router";

type ChatWithSellerProps = {
    receiverId: string;
}

export const ChatWithSeller: React.FC<ChatWithSellerProps> = ({ receiverId }) => {
    
    const navigation = useHistory();

    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();
    const [presentToast] = useIonToast();  

    const handleMakeChatWithSeller = async () => {
        try {
            await present();
            const result = await initializeChatRoomToAPI(receiverId);
            if (result) {
                navigation.push(`/chat/${result._id}/messages`)
            }
        } catch (err: any) {
            presentAlert(err.response.data.message ?? err.message)
        } finally {
            await dismiss();
        }
    }

    return (
        <IonButton fill='clear' size='small' onClick={() => handleMakeChatWithSeller()}>
            <IonIcon slot='icon-only' size='small' icon={ chatboxEllipses }></IonIcon>
        </IonButton>
    )
}