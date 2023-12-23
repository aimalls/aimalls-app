import { HTTP_API } from "../helpers/http";
import { iAccountProfile } from "../store/account-profile";

export const saveAccountProfileToAPI = (profile: iAccountProfile) => {
    const headers = { 'Content-Type': 'multipart/form-data' };
    return HTTP_API({ headers }).post("/account-profile/save-profile", profile)
        .then(response => response.data)
        .catch(err => Promise.reject(err))
}

export const getAccountProfileFromAPI = () => {
    return HTTP_API().get("/account-profile/get-profile")
        .then(response => response.data)
        .catch(err => Promise.reject(err))
}