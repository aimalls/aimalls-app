import { useEffect, useState } from "react";
import axios from "axios";

export interface iRegion {
  code: string;
  name: string;
  regionName: string;
  islandGroupCode: string;
  psgc10DigitCode: string;
}

export interface iProvince {
  code: string;
  name: string;
  regionCode: string;
  islandGroupCode: string;
  psgc10DigitCode: string;
}

export interface iCity {
  code: string;
  name: string;
  oldName: string;
  isCapital: boolean;
  provinceCode: string;
  districtCode: boolean;
  regionCode: string;
  islandGroupCode: string;
  psgc10DigitCode: string;
}

export interface iBarangay {
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


export const useAddressSelector = () => {
    const [regionOptions, setRegionOptions] = useState([]);
    const [provinceOptions, setProvinceOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    const [barangayOptions, setBarangayOptions] = useState([]);

    useEffect(() => {
        axios.get("https://psgc.gitlab.io/api/regions/")
            .then(response => {
                setRegionOptions(prev => {
                    return response.data;
                })
            })
    }, [])

    const loadProvinces = (region: string) => {
        axios.get(`https://psgc.gitlab.io/api/regions/${region}/provinces/`)
            .then(response => {
                setProvinceOptions(prev => {
                    return response.data;
                })
            })
    }

    const loadCities = (province: string) => {
        axios.get(`https://psgc.gitlab.io/api/provinces/${province}/cities-municipalities/`)
            .then(response => {
                setCityOptions(prev => {
                    return response.data;
                })
            })
    }

    const loadBarangays = (city_municipality: string) => {
        axios.get(`https://psgc.gitlab.io/api/cities-municipalities/${city_municipality}/barangays/`)
            .then(response => {
                setBarangayOptions(prev => {
                    return response.data;
                })
            })
    }

    return {
        regionOptions,
        provinceOptions,
        cityOptions,
        barangayOptions,
        loadProvinces,
        loadCities,
        loadBarangays
    }
}

export default useAddressSelector;