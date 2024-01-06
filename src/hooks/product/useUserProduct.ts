import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getUserProductsCountFromAPI, getUserProductsFromAPI, iProduct, statusesCount } from "../../requests/product.request"

export const useUserProduct = () => {
    const { data: userProducts, isLoading: isUserProductsLoading, refetch} = useQuery<iProduct[]>(["user-products-query"], () => getUserProductsFromAPI("Live"));

    const { data: userProductsCount, isLoading: isUserProductsCountLoading, refetch: refetchUserProductsCount } = useQuery<statusesCount>(["user-products-count-query"], () => getUserProductsCountFromAPI());



    return {
        userProducts,
        isUserProductsLoading,
        refetch,

        userProductsCount: userProductsCount,
        isUserProductsCountLoading,
        refetchUserProductsCount
    }
}