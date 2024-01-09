import { useQuery } from "@tanstack/react-query";
import { getUserLikedProductsFromAPI, iLikedProduct } from "../../requests/liked-products.request";
import { useMemo } from "react";


export const useLikedProduct = () => {
    const { data, isLoading: isLikedProductsLoading, refetch } = useQuery(["liked-products-query"], () => getUserLikedProductsFromAPI());

    const likedProducts: iLikedProduct[] = useMemo(() => {
        if (!data) return [];
        return data.data;
    }, [data])
    return {
        likedProducts,
        isLikedProductsLoading,
        refetch
    }
}

export default useLikedProduct;