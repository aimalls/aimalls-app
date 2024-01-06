import { useQuery } from "@tanstack/react-query";
import { Data, SellerData, getSellerOrdersFromAPI, iOrderData } from "../../requests/order.request";
import { useMemo } from "react";


export const useStoreOrder = () => {

    const { data: SellerOrders, isLoading: isSellerOrdersLoading, refetch: refetchSellerOrders } = useQuery<iOrderData<SellerData[]>>(["seller-orders-query"], () => getSellerOrdersFromAPI());

    const pending = useMemo(() => {
        if (SellerOrders) {
            return SellerOrders.data.filter(order => order.orderDetail.status === "Pending")
        } else {
            return []
        }
    }, [SellerOrders])

    const awaitingShipment = useMemo(() => {
        if (SellerOrders) {
            return SellerOrders.data.filter(order => ["To Ship", "Booked"].includes(order.orderDetail.status))
        } else {
            return []
        }
    }, [SellerOrders])

    const awaitingCollection = useMemo(() => {
        if (SellerOrders) {
            return SellerOrders.data.filter(order => order.orderDetail.status === "Awaiting Collection")
        } else {
            return []
        }
    }, [SellerOrders])

    const inTransit = useMemo(() => {
        if (SellerOrders) {
            return SellerOrders.data.filter(order => order.orderDetail.status === "In Transit")
        } else {
            return []
        }
    }, [SellerOrders])

    const delivered = useMemo(() => {
        if (SellerOrders) {
            return SellerOrders.data.filter(order => order.orderDetail.status === "Delivered")
        } else {
            return []
        }
    }, [SellerOrders])

    const completed = useMemo(() => {
        if (SellerOrders) {
            return SellerOrders.data.filter(order => order.orderDetail.status === "Completed")
        } else {
            return []
        }
    }, [SellerOrders])

    const cancelled = useMemo(() => {
        if (SellerOrders) {
            return SellerOrders.data.filter(order => order.orderDetail.status === "Cancelled")
        } else {
            return []
        }
    }, [SellerOrders])

    return {
        refetchSellerOrders,
        SellerOrders,
        pending,
        awaitingShipment,
        awaitingCollection,
        inTransit,
        delivered,
        completed,
        cancelled
    }
}

export default useStoreOrder;