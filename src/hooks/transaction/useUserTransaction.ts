import { useQuery } from "@tanstack/react-query";
import { getUserTransactionsFromAPI } from "../../requests/transaction.request";

export const useUserTransaction = () => {
    const { data: userTransactions, isLoading: isUserTransactionsLoading, refetch } = useQuery(["user-transaction-query"], () => getUserTransactionsFromAPI());

    return {
        userTransactions,
        isUserTransactionsLoading,
        refetch
    }
}