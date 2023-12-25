import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getUserProductsFromAPI, iProduct } from "../../requests/product.request"

export const useUserLiveProducts = () => {
    const { data: userLiveProducts, isLoading: isUserLiveProductsLoading, refetch} = useQuery<iProduct[]>(["user-live-products-query"], () => getUserProductsFromAPI("Live"))

    return {
        userLiveProducts,
        isUserLiveProductsLoading,
        refetch
    }
}