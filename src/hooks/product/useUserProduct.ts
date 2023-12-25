import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getUserProductsFromAPI, iProduct } from "../../requests/product.request"

export const useUserProduct = () => {
    const { data: userProducts, isLoading: isUserProductsLoading, refetch} = useQuery<iProduct[]>(["user-products-query"], () => getUserProductsFromAPI("Live"))

    return {
        userProducts,
        isUserProductsLoading,
        refetch
    }
}