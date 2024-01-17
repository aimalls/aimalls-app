import { HTTP_API } from "../helpers/http";


export interface iNotification {
  status: string;
  _id: string;
  notificationReceiptId: string;
  title: string;
  message: string;
  link?: string;
  recipients: Recipient[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

interface Recipient {
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
  accountName: string;
  id: string;
}

export const getUserNotificationsFromAPI = () => {
    return HTTP_API().get<Promise<iNotification[]>>('/notification/get-user-notifications')
        .then(response => response.data)
        .catch(error => {
            return Promise.reject(error);
        })
}