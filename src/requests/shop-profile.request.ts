import { HTTP_API } from "../helpers/http";
import { iShopProfile } from "../store/shop-profile";

export type shopProfileParams = Omit<iShopProfile, "verificationStatus" | "isVerified">

export const getShopProfileFromAPI = () => {
    return HTTP_API().get<iShopProfile>("/shop-profile/get-shop-profile")
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

export const saveShopProfileToAPI = (shopProfile: shopProfileParams) => {
    return HTTP_API().post("/shop-profile/save-shop-profile", shopProfile)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}