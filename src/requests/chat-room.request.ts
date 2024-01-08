import { HTTP_API } from "../helpers/http";

export interface iChatRoom {
  _id: string;
  users: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  chattingWith: ChattingWith;
  lastMessage: LastMessage;
}

export interface LastMessage {
  _id: string;
  room: string;
  sender: string;
  type: string;
  message: string;
  moment?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ChattingWith {
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
  accountprofile?: Accountprofile;
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

export const initializeChatRoomToAPI = (receiverId: string) => {
    return HTTP_API().post("/chat-room/initialize-chat-room", { receiverId })
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

export const getUserChatRoomsFromAPI = () => {
    return HTTP_API().get("/chat-room/get-chat-rooms")
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}