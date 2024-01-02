import { HTTP_API } from "../helpers/http"
import { iSelectedAddress } from "../store/address";

export interface iUserAddress {
  _id: string;
  user: string;
  region: Region;
  province: Province;
  city: City;
  barangay: Barangay;
  postalCode: string;
  streetBuildingHouse: string;
  contactName: string;
  contactNumber: string;
  label: string;
  default: boolean;
  isDeleted: boolean,
  __v: number;
}

interface Barangay {
  id: number,
  name: string
}

interface City {
  id: number,
  name: string
}

interface Province {
  id: number,
  name: string
}

interface Region {
  id: number,
  name: string
}

export const saveNewUserAddress = (params: any) => {
    return HTTP_API().post("/user-address/add-new-user-address", params)
    .then(response => response.data)
    .catch(err => Promise.reject(err))
}

export const getUserAddresses = () => {
    return HTTP_API().get("/user-address/get-user-addresses")
    .then(response => response.data)
    .catch(err => Promise.reject(err))
}

export const processAddressDeleteToAPI = (addressId: iUserAddress['_id']) => {
    return HTTP_API().post("/user-address/delete-address", { addressId })
    .then(response => response.data)
    .catch(err => Promise.reject(err))
}

export const saveUserAddressUpdateToAPI = (address: iSelectedAddress) => {
  return HTTP_API().post("/user-address/update-address", address)
    .then(response => response.data)
    .catch(err => Promise.reject(err))
}