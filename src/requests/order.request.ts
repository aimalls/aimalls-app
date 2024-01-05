import { HTTP_API } from "../helpers/http";
import { iUserAddress } from "./user-address.request";
import { iUserCart } from "./user-cart.request";

export interface iOrderData {
  message: string;
  data: Data;
}

interface Data {
  _id: string;
  user: string;
  status: string;
  orderDetail: OrderDetail[];
  paymentMethod: string;
  deliveryAddress: SellerDefaultAddress;
  createdAt: string;
  __v: number;
  orderPayment: Payment[];
  orderTotal: number;
}

interface OrderDetail {
  cartDueWithShipping: number;
  payment: Payment;
  shipping?: any;
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
  weight: string;
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
  status: string;
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
  productSpecifications?: ProductSpecifications;
}

interface ProductSpecifications {
  Package: string;
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
  roles: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Payment {
  _id: string;
  order: string;
  orderDetailId: string;
  paymentMethod: string;
  paymentReference: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export const processPlaceOrderToAPI = async (selectedCarts: iUserCart[], selectedDeliveryAddress: iUserAddress) => {
    return HTTP_API().post<iOrderData>("order/place-order", { selectedCarts, selectedDeliveryAddress })
        .then(response => response.data)
        .catch(error => {
            return Promise.reject(error);
        })
}

export const getOrderByIDFromAPI = async (orderID: string) => {
    return HTTP_API().get(`order/get-order-by-id/`, { params: {orderID} })
        .then(response => response.data)
        .catch(error => {
            return Promise.reject(error);
        })
}

export const processCancelOrderToAPI = (orderID: string) => {
    return HTTP_API().post(`order/cancel-order`, { orderID })
        .then(response => response.data)
        .catch(error => {
            return Promise.reject(error);
        })
}