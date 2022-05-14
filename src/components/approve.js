import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { approveToken } from '../redux/writeBC'
import { getTokenData } from '../redux/readBC';
import 'bootstrap/dist/css/bootstrap.css'

export const ApproveTrax = () => {
    const [token, setToken] = useState();
    const [spender, setSpender] = useState();
    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const Transaction = {
                Spender: spender,
                Tokens: token
            }
            console.log('Transaction', Transaction);
            await approveToken(Transaction, dispatch);
            await getTokenData(dispatch);
            setToken("");
            setSpender("");
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
                    <label htmlFor="spender" class="form-label">
                        Spender Address
                    </label><br />
                    <input class="form-control"
                        type="text"
                        id="spender"
                        value={spender}
                        onChange={(e) => { setSpender(e.target.value) }}
                        placeholder="Spender Address"
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
                    <button type="submit" class="btn btn-danger">
                        Approve Tokens
                    </button>
                </div>
            </form>
        </div>
    )
}
