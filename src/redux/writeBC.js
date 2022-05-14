import { store } from "../store";
import { connectBC } from "./readBC";


export const mintToken = async (Transaction, dispatch) => {

    const web3 = store.getState().data.web3;
    const contract = store.getState().data.contract;
    const acc = store.getState().data.account;
    const tokens = web3.utils.toWei(Transaction.Tokens, 'ether');

    try {
        if (acc && contract) {
            await contract.methods
                .minting(Transaction.Account, tokens)
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



export const transferToken = async (Transaction, dispatch) => {
    const web3 = store.getState().data.web3;
    const contract = store.getState().data.contract;
    const acc = store.getState().data.account;
    const tokens = web3.utils.toWei(Transaction.Tokens, 'ether');

    try {
        if (acc && contract) {
            await contract.methods
                .transfer(Transaction.Account, tokens)
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
        console.log('Error Transfer Token:', error)
    }
}


export const approveToken = async (Transaction, dispatch) => {
    const web3 = store.getState().data.web3;
    const contract = store.getState().data.contract;
    const acc = store.getState().data.account;
    const tokens = web3.utils.toWei(Transaction.Tokens, 'ether');

    try {
        if (acc && contract) {
            await contract.methods
                .approve(Transaction.Spender, tokens)
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



export const transferFromToken = async (Transaction, dispatch) => {
    const web3 = store.getState().data.web3;
    const contract = store.getState().data.contract;
    const acc = store.getState().data.account;
    const tokens = web3.utils.toWei(Transaction.Tokens, 'ether');

    try {
        if (acc && contract) {
            await contract.methods
                .transferFrom(Transaction.Owner, Transaction.Receiver, tokens)
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
        console.log('Error Transfer Token:', error)
    }
}