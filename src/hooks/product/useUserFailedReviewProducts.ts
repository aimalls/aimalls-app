import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getUserProductsFromAPI, iProduct } from "../../requests/product.request"

export const useUserFailedReviewProducts = () => {
    const { data: userFailedReviewProducts, isLoading: isUserFailedReviewProductsLoading, refetch} = useQuery<iProduct[]>(["user-failed-review-products-query"], () => getUserProductsFromAPI("Failed"))

    return {
        userFailedReviewProducts,
        isUserFailedReviewProductsLoading,
        refetch
    }
}