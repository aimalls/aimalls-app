import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getUserProductsFromAPI, iProduct } from "../../requests/product.request"

export const useUserDelistedProducts = () => {
    const { data: userDelistedProducts, isLoading: isUserDelistedProductsLoading, refetch} = useQuery<iProduct[]>(["user-delisted-products-query"], () => getUserProductsFromAPI("Delisted"))

    return {
        userDelistedProducts,
        isUserDelistedProductsLoading,
        refetch
    }
}