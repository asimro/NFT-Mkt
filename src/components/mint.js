import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mintToken } from '../redux/writeBC'
import { getTokenData } from '../redux/readBC';
import { ACCOUNT_LINK, CONTRACT_ADDRESS } from "../contract/config";
import { Listing } from "./Listing";
import 'bootstrap/dist/css/bootstrap.css'
import '../App.css';

export const Mint = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.data);
    const Balance = Number(data.balance).toFixed().toString();
    const mSupply = data.maxSupply;
    const [name, setName] = useState();
    const [tokenID, setTokenID] = useState();
    const [URL, setURL] = useState();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const Transaction = {
                Name: name,
                TokenID: tokenID,
                NFTURL: URL
            }
            console.log('Transaction', Transaction);
            await mintToken(Transaction, dispatch);
            await getTokenData(dispatch);
            setName("");
            setTokenID("");
            setURL("");
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
        <div >
            <br />
            <div className="App">
                <div className="fmcontrol">
                    {data.contract && data.account ?
                        <>
                            <form onSubmit={onSubmit}>
                                <div class="mb-3">
                                    <label htmlFor="name" class="form-label">
                                        NFT Name
                                    </label><br />
                                    <input class="form-control"
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => { setName(e.target.value) }}
                                        placeholder="NFT Name"
                                        required="required"
                                    />
                                </div>
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
                                    <label htmlFor="URL" class="form-label">
                                        URL of NFT
                                    </label><br />
                                    <input class="form-control"
                                        type="text"
                                        id="URL"
                                        value={URL}
                                        onChange={(e) => { setURL(e.target.value) }}
                                        placeholder="URL of NFT Token"
                                        required="required"
                                    />
                                </div>

                                <div class="d-grid gap-2 mx-auto">
                                    <button type="submit" class="btn btn-warning">
                                        Mint NFT
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
                        <div>
                            <br />
                            <h1>Your NFT Status</h1>
                            <div class="main">
                                <h4 > Account : &emsp; &emsp;
                                    <a href={ACCOUNT_LINK + CONTRACT_ADDRESS + "?a=" + data.account}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Click here to check your account history">
                                        {data.account > 0 ? (data.account.substr(0, 5)) + "********" + (data.account.substr(39, 3)) : " "}
                                    </a>
                                </h4>
                            </div>
                            <div class="main">
                                <h4 > Balance :&emsp;&emsp;&emsp;
                                    {Balance > 0 ? Balance.toLocaleString() : ""}
                                </h4>
                            </div>
                        </div>
                        <div>
                            {data.metaData ?
                                data.metaData.map((result) => <>
                                    {result.nftOwner === data.account ?
                                        <div className="column">
                                            <div className="card">
                                                <img className="pet-img-size" src={result.url} />
                                                <h5> {result.name} </h5>
                                                <p> ID: {result.id} </p>
                                                <p> Owner: {result.nftOwner ?
                                                    (result.nftOwner.substr(0, 5)) + "********" + (result.nftOwner.substr(39, 3))
                                                    : " "}
                                                </p>
                                                <p>
                                                    {result.listing
                                                        ? <button type="button" class="btn btn-success">
                                                            Listed
                                                        </button>
                                                        : <button type="button" class="btn btn-primary">
                                                            Unlisted
                                                        </button>}
                                                </p>
                                            </div>
                                        </div>
                                        : ""
                                    }
                                </>
                                )
                                : ""
                            }
                        </div>
                    </>
                    : <>
                        Please --- Connect Your Wallet
                        < br />  You are on Minting Page
                    </>
                }
            </div>


            {/* <div>
                {data.metaData ?
                    <>
                        {
                            data.metaData.filter(
                                (result) => true
                                    ? (result.listing === true)
                                    : result)
                                .map((result) => {
                                    return (
                                        <Listing data={result} />
                                    )
                                })
                        }
                    </>
                    : ""
                }

            </div> */}

        </div >
    )
}
