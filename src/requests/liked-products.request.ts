import { HTTP_API } from "../helpers/http";
import { iProduct } from "./product.request";

export interface iLikedProduct {
  _id: string;
  product: iProduct;
  user: string;
  __v: number;
  createdAt: string;
  isLiked: boolean;
  updatedAt: string;
}



export const getUserLikedProductsFromAPI = () => {
    return HTTP_API().get("/product-like/get-user-liked-products")
        .then(response => response.data)
        .catch(err => {
            return Promise.reject(err)
        })
}

export const saveUserLikeProductToAPI = (productId: string) => {
    return HTTP_API().post("/product-like/save-user-product-like", { productId })
        .then(response => response.data)
        .catch(err => {
            return Promise.reject(err)
        })
}