import { useEffect, useState } from "react";
import axios from "axios";
import { useIonAlert, useIonLoading } from "@ionic/react";

export interface iRegion {
  id: number,
  name: string
}

export interface iProvince {
  id: number,
  name: string
}

export interface iCity {
    id: number,
    name: string
}

export interface iBarangay {
  id: number,
  name: string
}


export const useAddressSelector = () => {
    const [regionOptions, setRegionOptions] = useState([]);
    const [provinceOptions, setProvinceOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    const [barangayOptions, setBarangayOptions] = useState([]);

    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert()

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        present("Loading Regions...")
        setIsLoading(loading => {
            return loading = true
        });
        if (isLoading) return;
        axios.get("https://philex-api-staging-app-9so4o.ondigitalocean.app/api/v1/regions?serviceable=true")
            .then(response => {
                setRegionOptions(prev => {
                    return response.data.results;
                })
            })
            .catch(err => {
                presentAlert("Failed to load Regions, Please try again later.")
            })
            .finally(async () => {
                await dismiss();
                setIsLoading(false);
            })
    }, [])

    const loadProvinces = (region: number) => {
        present("Loading Provinces...")
        setIsLoading(true)
        if (isLoading) return;

        axios.get(`https://philex-api-staging-app-9so4o.ondigitalocean.app/api/v1/provinces?region_id=${region}&serviceable=true`)
            .then(response => {
                setProvinceOptions(prev => {
                    return response.data.results;
                })
            })
            .catch(err => {
                presentAlert("Failed to load Provinces, Please try again later.")
            })
            .finally(async () => {
                await dismiss();
                setIsLoading(false);
            })
    }

    const loadCities = (province: number) => {
        present("Loading Cities...")
        setIsLoading(true);
        if (isLoading) return;
        axios.get(`https://philex-api-staging-app-9so4o.ondigitalocean.app/api/v1/municipalities?province_id=${province}&serviceable=true`)
            .then(response => {
                setCityOptions(prev => {
                    return response.data.results;
                })
            })
            .catch(err => {
                presentAlert("Failed to load Cities, Please try again later.")
            })
            .finally(async () => {
                await dismiss();
                setIsLoading(false);
            });
    }

    const loadBarangays = (city_municipality: number) => {
        present("Loading Barangays...")
        setIsLoading(true);
        if (isLoading) return;
        axios.get(`https://philex-api-staging-app-9so4o.ondigitalocean.app/api/v1/barangays?municipality_id=${city_municipality}&serviceable=true`)
            .then(response => {
                setBarangayOptions(prev => {
                    return response.data.results;
                })
            })
            .catch(err => {
                presentAlert("Failed to load Barangays, Please try again later.")
            })
            .finally(async () => {
                await dismiss();
                setIsLoading(false);
            });
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