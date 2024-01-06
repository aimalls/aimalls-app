import useStoreOrder from "../../../hooks/order/useStoreOrder";

export const awaitingCollectionOrder: React.FC = () => {

    const { awaitingCollection } = useStoreOrder();

    return (
        <div id="awaiting-collection-orders">
            Awaiting Collection order
        </div>
    )
}

export default awaitingCollectionOrder;