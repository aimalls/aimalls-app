import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonList, IonItem, IonLabel, IonNote, IonIcon, IonFooter, IonTextarea, IonButton } from "@ionic/react"
import { chevronForward, paperPlaneOutline } from "ionicons/icons"
import { useContext, useEffect, useMemo, useRef, useState } from "react"
import {SocketContext} from '../../contexts/SocketContext';
import { useParams } from 'react-router';
import { useChatMessages } from "../../hooks/chat/useChatMessages";
import { iChatMessage, iChatUser } from "../../requests/chat.request";
import { UserContext } from "../../contexts/UserContext";

interface iMessage {
  _id: string;
  room: string;
  sender: string;
  type: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isMe: boolean;
  user: User;
}

interface User {
  _id: string;
  email: string;
  isAdmin: boolean;
  isVerified: boolean;
  verificationLink: string;
  deactivated: boolean;
  roles: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  accountprofile: Accountprofile;
}

interface Accountprofile {
  _id: string;
  user: string;
  __v: number;
  createdAt: string;
  dob: string;
  first_name: string;
  gender: string;
  isVerified: boolean;
  last_name: string;
  middle_name: string;
  phone: string;
  suffix: string;
  updatedAt: string;
  verificationStatus: string;
  supportingDocumentType: string;
}

export const ChatBox: React.FC = () => {

    const socket = useContext(SocketContext);
    const user = useContext(UserContext)

    const { chatroom } = useParams<{ chatroom: string }>();

    const { ChatMessages, isChatMessagesLoading, refetchChatMessages } = useChatMessages(chatroom);

    const [socketMessages, setSocketMessages] = useState<iChatMessage[]>([]);

    const [message, setMessage] = useState("");

    const messages: iMessage[] = useMemo(() => {
        if (ChatMessages && user.user) {

            const messages: iChatMessage[] = [];

            for (let message of ChatMessages.messages) {
                if (messages.find((m: iChatMessage) => m._id === message._id)) continue;
                messages.push(message)
            }

            for (let message of socketMessages) {
                if (messages.find((m: iChatMessage) => m._id === message._id)) continue;
                messages.push(message);
            }
            
            return messages.map((message: iChatMessage, index: number) => {

                return {
                    ...message,
                    isMe: message.sender === user.user._id,
                    user: ChatMessages.users.find((user: iChatUser) => user._id === message.sender) ?? undefined,
                }
            })
        } else {
            return []
        }
    }, [ChatMessages, socketMessages, user])


    const ionContentRef = useRef<HTMLIonContentElement>(null);

    useEffect(() => {
        
        if (ionContentRef.current && !isChatMessagesLoading) {
            ionContentRef.current.scrollToBottom(300);
        }
    }, [messages, isChatMessagesLoading])

   
    

    useEffect(() => {
        
        // socket.on("connect", () => {
        //     console.log("connected")
        socket.emit("join-chat-room", {chatroom});

        socket.on("chat-message", (message: any) => {
            console.log(message)
        })

        socket.on("new-message", (message: any) => {
            setSocketMessages((prev) => [...prev, message])
        })

        // })

        

        return () => {
            socket.off("new-message");
            socket.off("chat-message")
            socket.disconnect()
        }

    }, [])

    const handleSendMessage = () => {
        socket.emit("send-message", {chatroom, message})
        setMessage("")
    }

    const chattingWith = useMemo(() => {
        if (ChatMessages && user.user) {
            // const user = ChatMessages.users.find((chatRoomUser: iChatUser) => chatRoomUser._id !== user.user._id);
            const chat = ChatMessages.users.find((chatRoomUSer: iChatUser) => chatRoomUSer._id !== user.user._id);
            if (chat) {
                return chat.accountprofile ? `${chat.accountprofile.first_name} ${chat.accountprofile.last_name}` : chat.email
            } else {
                return ""
            }
        }
        return ""
    
    }, [user, ChatMessages])

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/shop'></IonBackButton>
                    </IonButtons>
                    <div>
                        <IonLabel>
                            <strong>{ chattingWith }</strong>
                            <br />
                            <IonNote color="medium" className="ion-text-wrap">
                               Active 2 minutes ago
                            </IonNote>
                        </IonLabel>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent ref={ionContentRef}>
                
                { isChatMessagesLoading ? <div>Loading Messages...</div> : (
                    <IonList>
                        { messages.map((message, index) => (
                            <IonItem key={message._id}>
                                <IonLabel slot={ message.isMe ? "end" : "start" }>
                                    <h2>{ message.user.accountprofile ? `${message.user.accountprofile.first_name} ${message.user.accountprofile.last_name }` : message.user.email }</h2>
                                    <p>
                                        { message.message }
                                    </p>
                                </IonLabel>
                            </IonItem>
                        ))}
                        
                        
                    </IonList>
                )}
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <IonItem lines='none'>
                        <IonTextarea
                            value={message}
                            onIonInput={(e) => setMessage(e.detail.value!)}
                            placeholder="Type a message"
                            rows={1}
                            autoGrow={true}
                            style={{borderRadius: "25px", padding: "10px"}}
                            className="ion-no-padding"
                            maxlength={150}
                        ></IonTextarea>
                        <IonButtons slot='end'>
                            <IonButton onClick={handleSendMessage}>
                                <IonIcon icon={paperPlaneOutline} slot='end'></IonIcon>
                            </IonButton>
                        </IonButtons>
                    </IonItem>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    )
}