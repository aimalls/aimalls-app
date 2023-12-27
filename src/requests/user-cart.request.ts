import { HTTP_API } from "../helpers/http";

type selectedVariantAndOption = {
    variant: string,
    option: string
}

type Cart = {
    productId: string;
    quantity: number;
    variantsAndOptions: selectedVariantAndOption[];
}

export interface iUserCart {
  _id: string;
  user: string;
  product: Product;
  variantsAndOptions: VariantsAndOption[];
  quantity: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  seller: Seller;
  shopProfile: ShopProfile;
  files: File[];
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

interface ShopProfile {
  _id: string;
  user: string;
  __v: number;
  createdAt: string;
  isVerified: boolean;
  shopDescription: string;
  shopName: string;
  updatedAt: string;
  verificationStatus: string;
}

interface Seller {
  _id: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isVerified: boolean;
  verificationLink: string;
  deactivated: boolean;
  roles: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface VariantsAndOption {
  variant: Variant;
  option: Option;
  _id: string;
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

interface Variant {
  _id: string;
  variant: string;
  options: string[];
  __v: number;
}

interface Product {
  _id: string;
  user: string;
  productName: string;
  productDescription: string;
  category: string;
  productSpecifications: ProductSpecifications;
  price?: any;
  stock?: any;
  variants: string[];
  wholeSalePriceTier: any[];
  weight: number;
  width: number;
  length: number;
  height: number;
  otherProductInfo: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ProductSpecifications {
  Volume: string;
}

export const saveCartToAPI = (cart: Cart) => {
    return HTTP_API().post("/user-cart/save-user-cart", { ...cart })
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

export const getUserCartFromAPI = () => {
    return HTTP_API().get<iUserCart[]>("/user-cart/get-user-cart")
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}