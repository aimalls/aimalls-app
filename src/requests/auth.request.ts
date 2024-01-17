import { HTTP_API } from "../helpers/http"

export interface iRegistrationForm {
    email: string,
    password: string,
    confirm_password: string,
    otp: string
    referrer?: string
}

export interface iLoginForm {
    email: string,
    password: string
}


export interface iUserInfo {
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
  balances: Balance[];
  accountName: string;
  id: string;
}

interface Balance {
  _id: string;
  currency: string;
  amount: number;
  id: string;
}

export const processLegacyRegistrationToAPI = async (registrationForm: iRegistrationForm) => {
    try {
        return await HTTP_API().post("/auth/register", registrationForm)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const processLoginToAPI = async (email: string, password: string) => {
    try {
        return await HTTP_API().post("/auth/login", { email, password })
    } catch (error) {
        return Promise.reject(error)
    }
}

export const getUserInfo = async () => {
    try {
        return HTTP_API().get<Promise<iUserInfo>>("/auth/me")
            .then(res => res.data)
            .catch(err => Promise.reject(err))
    } catch (error) {
        return Promise.reject(error)
    }
}

export const processLogoutToAPI = async () => {
    try {
        return await HTTP_API().post("/auth/logout")
    } catch (error) {
        return Promise.reject(error)
    }
}

export const processResetPasswordToAPI = async (passwordForm: {password: string, confirm_password: string, otp: string}) => {
    try {
        return await HTTP_API().post("/auth/reset-password", passwordForm)
    } catch (error) {
        return Promise.reject(error)
    }
}