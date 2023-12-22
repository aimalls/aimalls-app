import { HTTP_API } from "../helpers/http";

export const getOTPFromAPI = async (email: string, use: string) => {
    return HTTP_API().get("/otp/generate", { params: {email, use} })
        .then(response => response)
        .catch(error => Promise.reject(error))
}