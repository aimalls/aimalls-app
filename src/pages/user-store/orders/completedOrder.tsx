import useStoreOrder from "../../../hooks/order/useStoreOrder";

export const completedOrders: React.FC = () => {

    const { completed } = useStoreOrder();

    return (
        <div id="completed-orders">
            completed Orders
        </div>
    )
}

export default completedOrders;