import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mintToken } from '../redux/writeBC'
import { getTokenData } from '../redux/readBC';
import 'bootstrap/dist/css/bootstrap.css'

export const MintTrax = () => {
    const data = useSelector((state) => state.data);
    const perNFTPrice = data.nftPrice;
    const [token, setToken] = useState();
    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const Transaction = {
                Tokens: token,
                Amount: (token * perNFTPrice * 10 ** 18)
                    .toFixed(0)
                    .toString(),
            }
            console.log('Transaction', Transaction);
            await mintToken(Transaction, dispatch);
            await getTokenData(dispatch);
            setToken("");
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
                    <label htmlFor="token" class="col-sm-2 col-form-label">
                        {data.name}
                    </label>
                    <div class="col-sm-10">
                        <input class="form-control"
                            type="number"
                            id="token"
                            value={token || ""}
                            onChange={(e) => { setToken(e.target.value) }}
                            placeholder="Enter No of Tokens"
                            required="required"
                        /></div>
                </div><br />

                <div class="d-grid gap-2 mx-auto">
                    <button type="submit" class="btn btn-success">
                        Mint New NFT
                    </button>
                </div>
            </form>
        </div>
    )
}
