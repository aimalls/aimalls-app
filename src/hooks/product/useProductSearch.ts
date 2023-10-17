import { useQuery } from "@tanstack/react-query"
import { searchProductFromAPI } from "../../requests/product.request"

export const useProductSearch = (search_string?: string) => {
    
    const { data: productSearchResult, isLoading: isProductSearchResultLoading } = useQuery(["product-search-query"], () => searchProductFromAPI(search_string!), { enabled: !!search_string })
    
    return {
        productSearchResult,
        isProductSearchResultLoading
    }
}