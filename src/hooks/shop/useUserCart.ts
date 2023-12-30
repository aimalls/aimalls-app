import { useQuery } from "@tanstack/react-query";
import { getUserCartGroupedBySellerFromAPI } from "../../requests/user-cart.request";

export const useUserCart = () => {
    const { data: UserCartGroupedBySeller, isLoading: isUserCartGroupedBySellerLoading, refetch } = useQuery(["user-cart-grouped-by-seller"], () => getUserCartGroupedBySellerFromAPI());

    return {
        UserCartGroupedBySeller,
        isUserCartGroupedBySellerLoading,
        refetch
    }
}