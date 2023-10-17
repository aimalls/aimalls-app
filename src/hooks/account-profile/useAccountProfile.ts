import { useQuery } from "@tanstack/react-query"
import { getAccountProfileFromAPI } from "../../requests/account-profile.request"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { SET_DOB, SET_GENDER, SET_NAME, SET_PHONE } from "../../store/account-profile"

export const useAccountProfile = () => {
    const dispatch = useDispatch();

    const { data: AccountProfile, isLoading: AccountProfileIsLoading } = useQuery(['account-profile'], () => getAccountProfileFromAPI())

    useEffect(() => {
        if (AccountProfile) {
            dispatch(SET_NAME({ 
                first_name: AccountProfile.first_name, 
                middle_name: AccountProfile.middle_name,
                last_name: AccountProfile.last_name,
                suffix: AccountProfile.suffix
            }))
            dispatch(SET_DOB(AccountProfile.dob))
            dispatch(SET_GENDER(AccountProfile.gender))
            dispatch(SET_PHONE(AccountProfile.phone))
        }
    }, [AccountProfile])

    return {
        AccountProfile,
        AccountProfileIsLoading
    }
}