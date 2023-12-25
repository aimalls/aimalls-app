import { useQuery } from "@tanstack/react-query";
import { getProductCategoriesFromAPI, iProductCategory } from "../../requests/product-category.request";
import { useMemo } from "react";


export interface iProductCategoryExtended extends iProductCategory {
    hasChild?: boolean
}

export const useProductCategory = () => {
    const { data: productCategories, isLoading: isProductCategoriesLoading, refetch } = useQuery(
        ["product-categories-query"], () => getProductCategoriesFromAPI()
    )

    const parentCategories = useMemo(() => {
        if (productCategories) {
            const categories = productCategories as iProductCategory[];

            let filteredCategories = categories.filter(category => {
                return category.parent == null || category.parent == undefined
            })

            return filteredCategories.map(category => {
                const hasChild = categories.find(val => val.parent === category._id);
                return {
                    ...category,
                    hasChild: !!hasChild
                }
            })
        }
        return []
    }, [productCategories]) as iProductCategoryExtended[]

    return {
        productCategories,
        isProductCategoriesLoading,
        parentCategories,
        refetch
    }
}

export default useProductCategory;