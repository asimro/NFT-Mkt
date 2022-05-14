import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { transferFromToken } from '../redux/writeBC'
import { getTokenData } from '../redux/readBC';
import 'bootstrap/dist/css/bootstrap.css'

export const TransferFromTrax = () => {
    const [token, setToken] = useState();
    const [owner, setOwner] = useState();
    const [receiver, setReceiver] = useState();
    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const Transaction = {
                Owner: owner,
                Receiver: receiver,
                Tokens: token
            }
            console.log('Transaction', Transaction);
            await transferFromToken(Transaction, dispatch);
            await getTokenData(dispatch);
            setToken("");
            setReceiver("");
            setOwner("");
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
                    <label htmlFor="owner" class="form-label">
                        Owner Address
                    </label><br />
                    <input class="form-control"
                        type="text"
                        id="owner"
                        value={owner}
                        onChange={(e) => { setOwner(e.target.value) }}
                        placeholder="Owner Address"
                        required="required"
                    />
                </div>

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
                    <button type="submit" class="btn btn-warning">
                        Transfer From Tokens
                    </button>
                </div>
            </form>
        </div>
    )
}
