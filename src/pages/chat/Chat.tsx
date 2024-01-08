import React, { useContext, useEffect, useMemo } from 'react';

import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonNote, IonPage, IonText, IonToolbar } from '@ionic/react';
import { chevronForward } from 'ionicons/icons';
import { useChatRooms } from '../../hooks/chat/useChatRooms';
import { iChatRoom } from '../../requests/chat-room.request';
import moment from "moment"





export const Chat: React.FC = () => {

    const { ChatRooms, isChatRoomsLoading, refetchChatRooms } = useChatRooms();


    const momentedChatRooms: iChatRoom[] = useMemo(() => {
        if (ChatRooms) {
            let rooms: iChatRoom[] = [];
            for (let room of ChatRooms) {
                room.lastMessage.moment = moment(room.lastMessage.createdAt, "YYYY-MM-DD HH:mm").fromNow();
                rooms.push(room)
            }
            return rooms;
        } else {
            return []
        }
    }, [ChatRooms])

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/shop'></IonBackButton>
                    </IonButtons>
                    Chats
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                { ChatRooms ? (
                <IonList lines='full'>
                    { momentedChatRooms.map((chatroom: iChatRoom, index: number) => (
                    <IonItem button detail={false} key={chatroom._id} routerLink={`/chat/${chatroom._id}/messages`}>
                        <div className="unread-indicator-wrapper" slot="start">
                        <div className="unread-indicator"></div>
                        </div>
                        <IonLabel>
                        <strong>{ chatroom.chattingWith.accountprofile ? `${chatroom.chattingWith.accountprofile.first_name} ${chatroom.chattingWith.accountprofile.last_name}` : chatroom.chattingWith.email }</strong>
                        <br />
                        <IonNote color="medium" className="ion-text-wrap">
                            { chatroom.lastMessage.message }
                        </IonNote>
                        </IonLabel>
                        <div className="metadata-end-wrapper" slot="end">
                        <IonNote color="medium">
                            { chatroom.lastMessage.moment }
                        </IonNote>
                        <IonIcon color="medium" icon={chevronForward}></IonIcon>
                        </div>
                    </IonItem>
                    ) )}
                </IonList>
                ) : null }
            </IonContent>
        </IonPage>
    )
}

export default Chat;