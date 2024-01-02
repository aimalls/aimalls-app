import { useQuery } from "@tanstack/react-query";
import { getBoxPrices } from "../../requests/delivery-option.request";

export const useDeliveryOption = () => {
    const { data: boxPrices, isLoading: isBoxPricesLoading, refetch } = useQuery(["box-prices-query"], () => getBoxPrices());

    return {
        boxPrices,
        isBoxPricesLoading,
        refetch
    }
}


export default useDeliveryOption;