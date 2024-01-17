import { HTTP_API } from "../helpers/http";


export interface iTransaction {
    _id: string,
    amount: number,
    currency: string,  
    type: string,
    description: string,
    createdAt: string
}


export const getUserTransactionsFromAPI = async () => {
    return HTTP_API().get<Promise<iTransaction[]>>("/transaction/get-user-transactions")
        .then(response => response.data)
        .catch(error => Promise.reject(error));
}