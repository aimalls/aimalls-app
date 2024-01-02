import { HTTP_API } from "../helpers/http";

export interface iBoxPrice {
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

export const getBoxPrices = async () => {
    try {
        const result = await HTTP_API().get<iBoxPrice[]>("/delivery-option/get-box-prices");
        return result.data;
    } catch (error) {
        return Promise.reject(error)
    }
}