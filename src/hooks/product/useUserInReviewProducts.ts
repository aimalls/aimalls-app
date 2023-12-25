import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getUserProductsFromAPI, iProduct } from "../../requests/product.request"

export const useUserInReviewProducts = () => {
    const { data: userInReviewProducts, isLoading: isUserInReviewProductsLoading, refetch} = useQuery<iProduct[]>(["user-in-review-products-query"], () => getUserProductsFromAPI("In Review"))

    return {
        userInReviewProducts,
        isUserInReviewProductsLoading,
        refetch
    }
}