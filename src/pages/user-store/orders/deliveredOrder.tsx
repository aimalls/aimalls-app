import useStoreOrder from "../../../hooks/order/useStoreOrder";

export const deliveredOrders: React.FC = () => {

    const { delivered } = useStoreOrder();

    return (
        <div id="delivered-orders">
            delivered Orders
        </div>
    )
}

export default deliveredOrders;