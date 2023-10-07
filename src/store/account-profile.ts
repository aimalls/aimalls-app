import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface iAccountProfile {
    name: name,
    gender: string,
    dob: string,
    phone: string
}

type name = {
    first_name: string,
    middle_name: string,
    last_name: string,
    suffix: string
}

const initialState: iAccountProfile = {
    name: {
        first_name: "",
        middle_name: "",
        last_name: "",
        suffix: ""
    },
    gender: "",
    dob: "",
    phone: ""
}

const mutations = {
    SET_NAME: (state: iAccountProfile, {payload}: PayloadAction<name>) => {
        state.name.first_name = payload.first_name
        state.name.middle_name = payload.middle_name
        state.name.last_name = payload.last_name
        state.name.suffix = payload.suffix
    },
    SET_GENDER: (state: iAccountProfile, { payload }: PayloadAction<iAccountProfile['gender']>) => {
        state.gender = payload
    },
    SET_DOB: (state: iAccountProfile, { payload }: PayloadAction<iAccountProfile['dob']>) => {
        state.dob = payload
    },
    SET_PHONE: (state: iAccountProfile, { payload }: PayloadAction<iAccountProfile['phone']>) => {
        state.phone = payload
    },
}

export const accountProfileStore = createSlice({
    name: "account-profile-store",
    initialState,
    reducers: mutations
})

export const { 
    SET_NAME,
    SET_GENDER,
    SET_DOB,
    SET_PHONE
} = accountProfileStore.actions

export default accountProfileStore.reducer