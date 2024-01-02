import { HTTP_API } from "../helpers/http";
import { iUserAddress } from "./user-address.request";

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
  seller: Seller;
  sellerDefaultAddress: iSellerDefaultAddress,
  shopProfile: ShopProfile;
  items: iUserCartItem[];
}

interface iSellerDefaultAddress {
  _id: string;
  user: string;
  region: Region;
  province: Province;
  city: Region;
  barangay: Barangay;
  postalCode: string;
  streetBuildingHouse: string;
  contactName: string;
  contactNumber: string;
  label: string;
  default: boolean;
  isDeleted: boolean;
  __v: number;
}

interface Barangay {
  id: number;
  name: string;
  hub_id: number;
  created_at: string;
  updated_at: string;
}

interface Province {
  id: number;
  name: string;
}

interface Region {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface iUserCartItem {
  _id: string;
  user: string;
  product: Product;
  variantsAndOptions: VariantsAndOptions;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  seller: Seller;
  files: File[];
  due: number;
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

interface VariantsAndOptions {
  variant: Variant[];
  option: Option[];
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
  productSpecifications?: ProductSpecifications;
  price?: number;
  stock?: number;
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

export interface iComputedUserCart {
  selectedCarts: SelectedCart[];
  totalShippingFee: number;
  totalDue: number;
}

interface SelectedCart {
  _id: string;
  seller: Seller;
  shopProfile: ShopProfile;
  items: Item[];
  sellerDefaultAddress: SellerDefaultAddress;
  shippingFee: ShippingFee;
  cartDue: number;
  recommendedBoxPrice: RecommendedBoxPrice;
}

interface RecommendedBoxPrice {
  id: number;
  name: string;
  price: number;
  dimensions: Dimensions;
}

interface Dimensions {
  width: number;
  height: number;
  length: number;
}

interface ShippingFee {
  fees: Fees;
  prices: Prices;
}

interface Prices {
  sender: string;
  recipient: string;
  weight: number;
  rate: number;
  base_rate: number;
  valuation_charge: number;
  box_price: number;
}

interface Fees {
  pickup_charge: number;
  total_rate: number;
}

interface SellerDefaultAddress {
  _id: string;
  user: string;
  region: Region;
  province: Province;
  city: Region;
  barangay: Barangay;
  postalCode: string;
  streetBuildingHouse: string;
  contactName: string;
  contactNumber: string;
  label: string;
  default: boolean;
  isDeleted: boolean;
  __v: number;
}

interface Barangay {
  id: number;
  name: string;
  hub_id: number;
  created_at: string;
  updated_at: string;
}

interface Province {
  id: number;
  name: string;
}

interface Region {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface Item {
  _id: string;
  user: string;
  product: Product;
  variantsAndOptions: VariantsAndOptions;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  seller: Seller;
  files: File[];
  due: number;
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

interface VariantsAndOptions {
  variant: Variant[];
  option: Option[];
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
  productSpecifications?: ProductSpecifications;
  price?: number;
  stock?: number;
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



export const saveCartToAPI = (cart: Cart) => {
    return HTTP_API().post("/user-cart/save-user-cart", { ...cart })
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

export const getUserCartGroupedBySellerFromAPI = () => {
    return HTTP_API().get<iUserCart[]>("/user-cart/get-user-cart-grouped-by-seller")
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

export const getComputedUserCartGroupedBySellerFromAPI = (selectedCart: iUserCart[], selectedDeliveryAddress: iUserAddress) => {
    return HTTP_API().post<iComputedUserCart>("/user-cart/get-computed-user-cart-grouped-by-seller", { selectedCart, selectedDeliveryAddress })
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}