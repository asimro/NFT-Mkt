import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { transferToken } from '../redux/writeBC'
import { getTokenData } from '../redux/readBC';
import 'bootstrap/dist/css/bootstrap.css'

export const TransferTrax = () => {
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
            await transferToken(Transaction, dispatch);
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
            <br /> <br /> <br />
            <form onSubmit={onSubmit}>
                <div class="mb-3">
                    <label htmlFor="receiver" class="form-label">
                        Receiver Address
                    </label><br />
                    <input class="form-control"
                        type="text"
                        id="receiver"
                        value={receiver}
                        onChange={(e) => { setReceiver(e.target.value) }}
                        placeholder="Recipient Address"
                        required="required"
                    />
                </div>

                <div class="mb-3">
                    <label htmlFor="token">
                        Tokens
                    </label><br />
                    <input class="form-control"
                        type="number"
                        id="token"
                        value={token}
                        onChange={(e) => { setToken(e.target.value) }}
                        placeholder="Amount of Tokens"
                        required="required"
                    />
                </div>

                <div class="d-grid gap-2 mx-auto">
                    <button type="submit" class="btn btn-info">
                        Transfer Tokens
                    </button>
                </div>
            </form>
        </div>
    )
}
