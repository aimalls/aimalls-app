import { HTTP_API } from "../helpers/http"

export interface iProductCategory {
  specifications: (Specification | Specifications2)[];
  _id: string;
  name: string;
  createdBy: string;
  parent?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Specifications2 {
  specificationId: string;
}

export interface Specification {
  specificationId: string;
  attributes?: string[];
}

export const getProductCategoriesFromAPI = () => {
    return HTTP_API().get("/product-category/get-all-product-categories")
        .then(response => response.data)
        .catch(err => Promise.reject(err))
}