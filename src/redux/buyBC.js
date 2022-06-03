import { store } from "../store";
import { connectBC } from "./readBC";


export const buyNFT = async (Transaction, dispatch) => {

    const contract = store.getState().data.contract;
    const acc = store.getState().data.account;

    try {
        if (acc && contract) {
            await contract.methods
                .mint(Transaction.Tokens)
                .send({ from: acc, value: Transaction.Amount })
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


