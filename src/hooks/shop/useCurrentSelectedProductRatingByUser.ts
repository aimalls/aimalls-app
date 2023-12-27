import { useQuery } from "@tanstack/react-query"
import { getCurrentUserRatingForTheProduct } from "../../requests/product-rating.request"

export const useCurrentSelectedProductRatingByUser = (productId?: string) => {
    const { data: CurrentUserRating, isLoading: isCurrentUserRatingLoading, refetch } = useQuery(["current-user-rating"], () => getCurrentUserRatingForTheProduct(productId!), {
        enabled: !!productId
    })

    return {
        CurrentUserRating,
        isCurrentUserRatingLoading,
        refetch
    }
}