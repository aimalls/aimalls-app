import { useQuery } from "@tanstack/react-query"
import { getAccountProfileFromAPI } from "../../requests/account-profile.request"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { SET_SHOP_NAME,
    SET_SHOP_DESCRIPTION,
    SET_IS_VERIFIED,
    SET_VERIFICATION_STATUS } from "../../store/shop-profile"
import axios from "axios"
import { getShopProfileFromAPI } from "../../requests/shop-profile.request"

export const useShopProfile = () => {
    const dispatch = useDispatch();

    const { data: ShopProfile, isLoading: ShopProfileIsLoading } = useQuery(['shop-profile'], () => getShopProfileFromAPI())

    useEffect(() => {
        if (ShopProfile) {
            dispatch(SET_SHOP_NAME(ShopProfile.shopName))
            dispatch(SET_SHOP_DESCRIPTION(ShopProfile.shopDescription))

            dispatch(SET_IS_VERIFIED(ShopProfile.isVerified))
            dispatch(SET_VERIFICATION_STATUS(ShopProfile.verificationStatus))
            

        }
    }, [ShopProfile])

    return {
        ShopProfile,
        ShopProfileIsLoading
    }
}