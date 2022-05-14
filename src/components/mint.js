import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { mintToken } from '../redux/writeBC'
import { getTokenData } from '../redux/readBC';
import 'bootstrap/dist/css/bootstrap.css'

export const MintTrax = () => {
    const [token, setToken] = useState();
    const [receiver, setReceiver] = useState();
    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const Transaction = {
                Account: receiver,
                Tokens: token
            }
            console.log('Transaction', Transaction);
            await mintToken(Transaction, dispatch);
            await getTokenData(dispatch);
            setToken("");
            setReceiver("");
        }
        catch (error) {
            console.log('Submit MintTokne Error:', error)
        }
    }

    return (
        <div>
            <br />
            <form onSubmit={onSubmit}>
                <div class="row">
                    <label htmlFor="receiver" class="col-sm-2 col-form-label">
                        Receiver Address
                    </label>
                    <div class="col-sm-10">
                        <input class="form-control"
                            type="text"
                            id="receiver"
                            value={receiver}
                            onChange={(e) => { setReceiver(e.target.value) }}
                            placeholder="Enter Receiver Address"
                            required="required"
                        /></div>
                </div>

                <div class="row">
                    <label htmlFor="token" class="col-sm-2 col-form-label">
                        Tokens
                    </label>
                    <div class="col-sm-10">
                        <input class="form-control"
                            type="number"
                            id="token"
                            value={token}
                            onChange={(e) => { setToken(e.target.value) }}
                            placeholder="Enter No of Tokens"
                            required="required"
                        /></div>
                </div><br />

                <div class="d-grid gap-2 mx-auto">
                    <button type="submit" class="btn btn-success">
                        Mint New Tokens
                    </button>
                </div>
            </form>
        </div>
    )
}
