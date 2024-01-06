import useStoreOrder from "../../../hooks/order/useStoreOrder";

export const inTransitOrders: React.FC = () => {

    const { inTransit } = useStoreOrder();

    return (
        <div id="inTransit-orders">
            inTransit Orders
        </div>
    )
}

export default inTransitOrders;