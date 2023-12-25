import { HTTP_API } from "../helpers/http";

export interface iProduct {
    _id: string;
    user: string;
    productName: string;
    productDescription: string;
    category: Category;
    price?: number;
    stock?: number;
    variants: Variant[];
    weight: number;
    width: number;
    length: number;
    height: number;
    otherProductInfo: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    files: File[];
    wholeSalePriceTier?: WholeSalePriceTier[];
    status?: string;
}

interface WholeSalePriceTier {
    _id: string;
    minimumQuantity: number;
    maximumQuantity: number;
    price: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface File {
    _id: string;
    user: string;
    origin: string;
    origin_id: string;
    file_group: string;
    file_location: string;
    thumbnail_location: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface Variant {
    _id: string;
    variant: string;
    options: Option[];
    __v: number;
}

interface Option {
    _id: string;
    optionName: string;
    price: number;
    stock: number;
    sku: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface Category {
    specifications: any[];
    _id: string;
    name: string;
    createdBy: string;
    parent: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface iSearchSuggestion {
    name: string,
    objectID: string
}

export const saveNewProductToAPI = (product: any) => {
    const headers = { 'Content-Type': 'multipart/form-data' };
    return HTTP_API({ headers }).post("/product/save-new-product", product)
        .then(response => response.data)
        .catch(err => Promise.reject(err))
}

export const getUserProductsFromAPI = (status: string) => {
    return HTTP_API().get("/product/get-user-products", { params: { status } })
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}


export const getProductInfoFromAPI = (productId: iProduct["_id"]): Promise<iProduct> => {
    return HTTP_API().get("/product/get-product-info-by-id/", { params: {productId} })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
            return Promise.reject(err)
        })
}

export const getSearchSuggestionsFromAPI = (search_string: string): Promise<iSearchSuggestion[]> => {
    return HTTP_API().get("/product/get-search-suggestions", { params: { search_string } })
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

export const searchProductFromAPI = (search_string: string): Promise<iProduct[]> => {
    return HTTP_API().get("/product/search-product", { params: { search_string } })
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}