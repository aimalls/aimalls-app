import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface iShopProfile {
    shopName: string,
    shopDescription: string,
    isVerified: boolean,
    verificationStatus: string
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


const initialState: iShopProfile = {
    shopName: "",
    shopDescription: "",
    verificationStatus: "",
    isVerified: false
}

const mutations = {
    SET_SHOP_NAME: (state: iShopProfile, {payload}: PayloadAction<iShopProfile['shopName']>) => {
        state.shopName = payload
    },
    SET_SHOP_DESCRIPTION: (state: iShopProfile, { payload }: PayloadAction<iShopProfile['shopDescription']>) => {
        state.shopDescription = payload
    },

    SET_IS_VERIFIED: (state: iShopProfile, { payload }: PayloadAction<iShopProfile['isVerified']>) => {
        state.isVerified = payload
    },

    SET_VERIFICATION_STATUS: (state: iShopProfile, { payload }: PayloadAction<iShopProfile['verificationStatus']>) => {
        state.verificationStatus = payload
    },
}

export const shopProfileStore = createSlice({
    name: "shop-profile-store",
    initialState,
    reducers: mutations
})

export const { 
    SET_SHOP_NAME,
    SET_SHOP_DESCRIPTION,
    SET_IS_VERIFIED,
    SET_VERIFICATION_STATUS
} = shopProfileStore.actions

export default shopProfileStore.reducer