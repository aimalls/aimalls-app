import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonNote, IonPage, IonRefresher, IonRefresherContent, IonToolbar, RefresherEventDetail, useIonAlert, useIonLoading } from "@ionic/react";
import { useUserTransaction } from "../../hooks/transaction/useUserTransaction";
import "../../styles/v1/pages/transaction/Transaction.scss"
export const Transaction: React.FC = () => {

    const { userTransactions, isUserTransactionsLoading, refetch } = useUserTransaction();

    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();

    const handleUserTransactionRefresh = async (e: CustomEvent<RefresherEventDetail>) => {
        try {
            await present();
            await refetch();
        } catch (err: any) {
            presentAlert(err)
        } finally {
            await dismiss();
            e.detail.complete()
        }
    }

    return (
        <IonPage id="transaction">
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/user-store/home"></IonBackButton>
                    </IonButtons>
                    Transactions
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonRefresher slot="fixed" onIonRefresh={handleUserTransactionRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                { userTransactions && userTransactions.length !== 0 ? (
                    <IonList>
                        {userTransactions.map(transaction => (
                            <IonItem key={transaction._id}>
                                <IonLabel>
                                    <h2>{transaction.type}</h2>
                                    <p>{transaction.createdAt}</p>
                                </IonLabel>
                                <IonNote slot="end">
                                    {transaction.amount}
                                </IonNote>
                            </IonItem>
                        ))}
                    </IonList>
                
                ): isUserTransactionsLoading ? (
                    <div className="preload">Loading...</div>
                ): (
                    <div className="preload">No Transactions</div>
                ) }
            </IonContent>
        </IonPage>
    )
}

export default Transaction;