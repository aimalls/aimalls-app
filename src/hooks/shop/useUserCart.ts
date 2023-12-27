import { useQuery } from "@tanstack/react-query";
import { getUserCartFromAPI } from "../../requests/user-cart.request";

export const useUserCart = () => {
    const { data: UserCart, isLoading: isUserCartLoading, refetch } = useQuery(["user-cart"], () => getUserCartFromAPI());

    return {
        UserCart,
        isUserCartLoading,
        refetch
    }
}