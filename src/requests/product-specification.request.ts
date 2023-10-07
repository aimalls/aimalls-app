import { HTTP_API } from "../helpers/http";
import { iProductCategory } from "./product-category.request";


export interface iProductSpecification {
  _id: string;
  name: string;
  fieldType: string;
  fieldOptions: string[];
  __v: number;
  attributes?: string[];
  lastModifiedBy?: string;
}

export const getProductSpecificationByCategory = (productCategoryId: iProductCategory['_id']) => {
    return HTTP_API().get("/product-specification/get-product-specification-by-category", { params: {productCategoryId} })
        .then(response => response.data)
        .catch(err => Promise.reject(err))
}