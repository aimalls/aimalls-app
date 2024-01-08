import { HTTP_API } from "../helpers/http";

export interface iChatMessage {
  _id: string;
  room: string;
  sender: string;
  type: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface iChatUser {
  _id: string;
  email: string;
  isAdmin: boolean;
  isVerified: boolean;
  verificationLink: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  deactivated: boolean;
  roles: string[];
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
  last_name: string;
  middle_name: string;
  phone: string;
  suffix: string;
  updatedAt: string;
  verificationStatus: string;
  isVerified: boolean;
}

export const getChatMessagesFromAPI = (chatroom: string) => {
    return HTTP_API().get("/chat/get-chat-messages", { params: { chatroom } })
        .then(response => response.data)
        .catch(error => {
            return Promise.reject(error)
        })
}