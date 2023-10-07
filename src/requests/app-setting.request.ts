import { HTTP_API } from "../helpers/http"

export interface iAppSetting {
    _id?: string,
    name: string,
    value: Object | string | number | boolean
}

export const getAllAppSettingsFromAPI = () => {
    return HTTP_API().get("/app-setting/get-all-shopper-app-settings")
        .then(response => response.data)
        .catch(err => Promise.reject(err.response))
}