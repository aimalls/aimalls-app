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
        return await HTTP_API().get("/auth/me")
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