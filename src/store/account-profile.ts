import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface iAccountProfile {
    name: name,
    gender: string,
    dob: string,
    phone: string,
    supportingDocumentsType: string,
    supportingDocumentImage: supportDocuments | undefined;
    files?: file[],
    isVerified?: boolean,
    verificationStatus?: string | null
}

interface file {
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

export type supportDocuments = {
    images: File[],
    thumbs: File[]
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
    phone: "",
    supportingDocumentsType: "",
    supportingDocumentImage: undefined,
    files: [],
    verificationStatus: null,
    isVerified: false
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
    SET_SUPPORTING_DOCUMENTS_TYPE: (state: iAccountProfile, { payload }: PayloadAction<iAccountProfile['supportingDocumentsType']>) => {
        state.supportingDocumentsType = payload
    },

    SET_SUPPORTING_DOCUMENTS: (state: iAccountProfile, { payload }: PayloadAction<iAccountProfile['files']>) => {
        state.files = payload
    },

    SET_IS_VERIFIED: (state: iAccountProfile, { payload }: PayloadAction<iAccountProfile['isVerified']>) => {
        state.isVerified = payload
    },

    SET_VERIFICATION_STATUS: (state: iAccountProfile, { payload }: PayloadAction<iAccountProfile['verificationStatus']>) => {
        state.verificationStatus = payload
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
    SET_PHONE,
    SET_SUPPORTING_DOCUMENTS_TYPE,
    SET_SUPPORTING_DOCUMENTS,
    SET_IS_VERIFIED,
    SET_VERIFICATION_STATUS
} = accountProfileStore.actions

export default accountProfileStore.reducer