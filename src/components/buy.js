import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { buyToken } from '../redux/writeBC'
import { getTokenData } from '../redux/readBC';
import 'bootstrap/dist/css/bootstrap.css'

export const Buy = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.data);
    const mSupply = data.maxSupply;
    const [tokenID, setTokenID] = useState();
    const [price, setPrice] = useState();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const buyTransaction = {
                ID: tokenID,
                Amount: (price * 10 ** 18).toFixed(0).toString(),
            }
            console.log('Transaction', buyTransaction);
            await buyToken(buyTransaction, dispatch);
            await getTokenData(dispatch);
            setTokenID("");
            setPrice("");
        }
        catch (error) {
            console.log('Submit MintTokne Error:', error)
        }
    }

    useEffect(async () => {
        if (mSupply) {
            await getTokenData(dispatch);
        }
    }, [mSupply])

    return (
        <div>
            <br />
            <div className="App">
                <div className="fmcontrol">
                    {
                        data.contract && data.account
                            ? <>

                                <form onSubmit={onSubmit}>
                                    <div class="mb-3">
                                        <label htmlFor="tokenID">
                                            Token-ID
                                        </label><br />
                                        <input class="form-control"
                                            type="number"
                                            id="tokenID"
                                            value={tokenID}
                                            onChange={(e) => { setTokenID(e.target.value) }}
                                            placeholder="ID of NFT"
                                            required="required"
                                        />
                                    </div>
                                    <div class="mb-3">
                                        <label htmlFor="price" class="form-label">
                                            NFT Sale Price
                                        </label><br />
                                        <input class="form-control"
                                            type="text"
                                            id="price"
                                            value={price}
                                            onChange={(e) => { setPrice(e.target.value) }}
                                            placeholder="NFT Price in ETH"
                                            required="required"
                                        />
                                    </div>

                                    <div class="d-grid gap-2 mx-auto">
                                        <button type="submit" class="btn btn-warning">
                                            Buy Token
                                        </button>
                                    </div>
                                </form>
                            </>
                            : ""
                    }
                </div>
            </div>

            <div>
                {data.contract && data.account ?
                    <>
                        {data.metaData ?
                            data.metaData.map((result) => <>
                                {result.listing ?
                                    <div className="column">
                                        <div className="card">
                                            <img className="pet-img-size" src={result.url} />
                                            <h5> {result.name} </h5>
                                            <p> ID: {result.id} </p>
                                            <p> Owner: {result.nftOwner ?
                                                (result.nftOwner.substr(0, 5)) + "********" + (result.nftOwner.substr(39, 3))
                                                : " "}
                                            </p>
                                            <p>Price: {result.price / (10 ** 18)}</p>
                                            <p>
                                                <button type="button" class="btn btn-success"
                                                > Buy-Me
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                    : ""
                                }
                            </>
                            )
                            : ""
                        }
                    </>
                    : <>
                        Please-- - Connect Your Wallet
                        < br />  Buying Page
                    </>
                }
            </div>

        </div>
    )
}
