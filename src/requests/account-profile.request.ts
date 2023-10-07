import { HTTP_API } from "../helpers/http";
import { iAccountProfile } from "../store/account-profile";

export const saveAccountProfileToAPI = (profile: iAccountProfile) => {
    return HTTP_API().post("/account-profile/save-profile", profile)
        .then(response => response.data)
        .catch(err => Promise.reject(err))
}

export const getAccountProfileFromAPI = () => {
    return HTTP_API().get("/account-profile/get-profile")
        .then(response => response.data)
        .catch(err => Promise.reject(err))
}