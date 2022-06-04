import { store } from "../store";
import { connectBC } from "./readBC";


export const mintToken = async (Transaction, dispatch) => {
    const contract = store.getState().data.contract;
    const acc = store.getState().data.account;
    try {
        if (acc && contract) {
            await contract.methods
                .mint(
                    Transaction.Name,
                    Transaction.TokenID,
                    Transaction.NFTURL
                )
                .send({ from: acc })
                .once("error", (err) => {
                    console.log('error', err)
                })
                .then((receipt) => {
                    console.log('receipt', receipt)
                })
        }
        else {
            dispatch(connectBC());
        }

    } catch (error) {
        console.log('Error Mint Tokens', error)

    }
}


export const listToken = async (listTransaction, dispatch) => {
    const contract = store.getState().data.contract;
    const acc = store.getState().data.account;

    try {
        if (acc && contract) {
            await contract.methods
                .list(listTransaction.NFTID,
                    listTransaction.Price)
                .send({ from: acc })
                .once("error", (err) => {
                    console.log('error', err)
                })
                .then((receipt) => {
                    console.log('receipt', receipt)
                })
        }
        else {
            dispatch(connectBC());
        }
    } catch (error) {
        console.log('Error Approve Token:', error)
    }
}



export const buyToken = async (buyTransaction, dispatch) => {
    const contract = store.getState().data.contract;
    const acc = store.getState().data.account;

    try {
        if (acc && contract) {
            await contract.methods
                .buy(buyTransaction.ID)
                .send({ from: acc, value: buyTransaction.Amount })
                .once("error", (err) => {
                    console.log('error', err)
                })
                .then((receipt) => {
                    console.log('receipt', receipt)
                })
        }
        else {
            dispatch(connectBC());
        }
    } catch (error) {
        console.log('Error Transfer Token:', error)
    }
}