import { HTTP_API } from "../helpers/http";


export const submitProductRatingToAPI = (rating: number, productId: string) => {
    return HTTP_API().post("/product-rating/save-rating", { rating, productId })
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

export const getCurrentUserRatingForTheProduct = (productId: string) => {
    return HTTP_API().get("/product-rating/get-current-user-rating", { params: { productId } })    
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}