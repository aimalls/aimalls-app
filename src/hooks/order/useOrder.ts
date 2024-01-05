import { useQuery } from "@tanstack/react-query";
import { getOrderByIDFromAPI } from "../../requests/order.request";

export const useOrder = (orderID?: string) => {
    const { data: Order, isLoading: isOrderLoading, refetch } = useQuery(["order"], () => getOrderByIDFromAPI(orderID!), { enabled: !!orderID });

    return {
        Order,
        isOrderLoading,
        refetch
    }
}