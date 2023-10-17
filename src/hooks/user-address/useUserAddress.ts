import { useQuery } from "@tanstack/react-query"
import { getUserAddresses } from "../../requests/user-address.request"

export const useUserAddress = () => {
    
    const { data: userAddresses, isLoading: userAddressesLoading } = useQuery(["user-addresses-query"], () => getUserAddresses())

    return {
        userAddresses,
        userAddressesLoading
    }

}