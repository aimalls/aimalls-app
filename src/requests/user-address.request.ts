import { HTTP_API } from "../helpers/http"

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
  __v: number;
}

interface Barangay {
  code: string;
  name: string;
  oldName: string;
  subMunicipalityCode: boolean;
  cityCode: boolean;
  municipalityCode: string;
  districtCode: boolean;
  provinceCode: string;
  regionCode: string;
  islandGroupCode: string;
  psgc10DigitCode: string;
}

interface City {
  code: string;
  name: string;
  oldName: string;
  isCapital: boolean;
  isCity: boolean;
  isMunicipality: boolean;
  provinceCode: string;
  districtCode: boolean;
  regionCode: string;
  islandGroupCode: string;
  psgc10DigitCode: string;
}

interface Province {
  code: string;
  name: string;
  regionCode: string;
  islandGroupCode: string;
  psgc10DigitCode: string;
}

interface Region {
  code: string;
  name: string;
  regionName: string;
  islandGroupCode: string;
  psgc10DigitCode: string;
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