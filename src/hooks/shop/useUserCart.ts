import { useQuery } from "@tanstack/react-query";
import { getComputedUserCartGroupedBySellerFromAPI, getUserCartGroupedBySellerFromAPI, iUserCart } from "../../requests/user-cart.request";
import { iUserAddress } from "../../requests/user-address.request";

export const useUserCart = (selectedCart?: iUserCart[], selectedDeliveryAddress?: iUserAddress) => {
    const { data: UserCartGroupedBySeller, isLoading: isUserCartGroupedBySellerLoading, refetch } = useQuery(["user-cart-grouped-by-seller"], () => getUserCartGroupedBySellerFromAPI());

    const { data: ComputedUserCartGroupedBySeller, isLoading: isComputedUserCartGroupedBySellerLoading, refetch: refetchComputedUserCartGroupedBySeller } = useQuery(["computed-user-cart-grouped-by-seller"], () => getComputedUserCartGroupedBySellerFromAPI(selectedCart!, selectedDeliveryAddress!), {
        enabled: !!selectedCart && !!selectedDeliveryAddress!._id
    });  

    return {
        UserCartGroupedBySeller,
        isUserCartGroupedBySellerLoading,
        refetch,
        ComputedUserCartGroupedBySeller,
        isComputedUserCartGroupedBySellerLoading,
        refetchComputedUserCartGroupedBySeller
    }
}