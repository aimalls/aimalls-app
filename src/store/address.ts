import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { iBarangay, iCity, iProvince, iRegion } from '../hooks/address/useAddressSelector'

export type iSelectedAddress = {
    _id: string,
    contactName: string,
    contactNumber: string,
    region: iRegion,
    province: iProvince,
    city: iCity,
    barangay: iBarangay,
    postalCode: string,
    streetBuildingHouse: string
    label: string,
    default: boolean,
}


export interface iAddressStoreState {
    selectedAddress: iSelectedAddress
}

const initialState: iAddressStoreState = {
    selectedAddress: {
        _id: "",
        contactName: "",
        contactNumber: "",
        region: {} as iRegion,
        province: {} as iProvince,
        city: {} as iCity,
        barangay: {} as iBarangay,
        postalCode: "",
        streetBuildingHouse: "",
        label: "",
        default: false,
    }
}

const mutations = {
    SET_SELECTED_ADDRESS(state: iAddressStoreState, {payload}: PayloadAction<iSelectedAddress>) {
        state.selectedAddress = payload
    },

    RESET_SELECTED_ADDRESS (state: iAddressStoreState) {
        state.selectedAddress = {...initialState.selectedAddress}
    }
}

export const addressSlice = createSlice({
    name: 'address-store',
    initialState,
    reducers: mutations
})

export const {
    SET_SELECTED_ADDRESS
} = addressSlice.actions;

export default addressSlice.reducer;