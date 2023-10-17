import { useQuery } from "@tanstack/react-query"
import { getProductInfoFromAPI } from "../../requests/product.request"

export const useProduct = (productId?: string) => {
    const { data: ProductInfo, isLoading: isProductInfoLoading } = useQuery(["product-query"], () => getProductInfoFromAPI(productId!), {
        enabled: !!productId
    })

    return {
        ProductInfo,
        isProductInfoLoading
    }

}