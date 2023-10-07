import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { iProductCategory } from "../../requests/product-category.request";
import { getProductSpecificationByCategory } from "../../requests/product-specification.request";


export const useProductSpecification = (productCategory: iProductCategory) => {

    const { data: productSpecificationByCategory, isLoading: productSpecificationByCategoryIsLoading, refetch } = useQuery(
        ["product-specification-by-category-query"], () => getProductSpecificationByCategory(productCategory._id), {
            enabled: !!productCategory
        }
    )

    return {
        productSpecificationByCategory,
        productSpecificationByCategoryIsLoading,
        refetchSpecifications: refetch
    }
}

export default useProductSpecification;