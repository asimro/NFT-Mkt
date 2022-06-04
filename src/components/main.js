import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTokenData } from '../redux/readBC';
import { ETHERSCAN_LINK, ACCOUNT_LINK, CONTRACT_ADDRESS } from "../contract/config";
import 'bootstrap/dist/css/bootstrap.css'
import '../App.css'



export const Main = () => {
    const dispatch = useDispatch();
    let data = useSelector((state) => state.data);
    const Balance = Number(data.balance).toFixed().toString();



    useEffect(async () => {
        if (data.account) {
            await getTokenData(dispatch);
        }
    }, [data.account])


    return (
        <div >
            <div >
                {data.contract && data.web3 ?
                    <>
                        <br />
                        <div class="main">
                            Contract Address :
                            <a href={ETHERSCAN_LINK + CONTRACT_ADDRESS + "#balances"}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Click here to view token holders">
                                {data.account ? CONTRACT_ADDRESS : ""}
                            </a><br />
                        </div>
                        <br />
                        <div class="main">
                            <h6 > Account : &emsp; &emsp;
                                <a href={ACCOUNT_LINK + CONTRACT_ADDRESS + "?a=" + data.account}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Click here to check your account history">
                                    {data.account > 0 ? (data.account.substr(0, 5)) + "********" + (data.account.substr(39, 3)) : " "}
                                </a>
                            </h6>
                        </div>

                        <div class="main">
                            <h6 > Balance :&emsp;&emsp;
                                {Balance > 0 ? Balance.toLocaleString() : ""}
                            </h6>
                        </div>

                        <div class="main">
                            Name: &emsp; &emsp;{data.name}<br />
                            Symbol: &emsp; &emsp;{data.symbol}<br />
                            Total Supply: &emsp; &emsp;{data.totalSupply}<br />
                            Max Supply: &emsp; &emsp;{data.maxSupply}<br />
                        </div>
                    </>
                    : ""
                }
            </div>
            <div>
                {data.contract && data.account ?
                    <>
                        {data.metaData ?
                            data.metaData.map((result) => <>
                                <div className="column">
                                    <div className="card">
                                        <img className="pet-img-size" src={result.url} />
                                        <h5> {result.name} </h5>
                                        <p> ID: {result.id} </p>
                                        <p> Owner: {result.nftOwner ?
                                            (result.nftOwner.substr(0, 5)) + "********" + (result.nftOwner.substr(39, 3))
                                            : " "} </p>
                                        <p> {result.listing ?
                                            <> Price: {result.price / (10 ** 18)} </>
                                            : <br />} </p>
                                        <p> {result.listing
                                            ? <button type="button" class="btn btn-success">
                                                Listed
                                            </button>
                                            : <button type="button" class="btn btn-primary">
                                                Unlisted
                                            </button>} </p>
                                    </div>
                                </div>
                            </>
                            )
                            : ""
                        }
                    </>
                    : <>
                        Please --- Connect Your Wallet
                        < br />  This is Main Page
                    </>
                }
            </div>

            
        </div>
    )
}


















// const connectHandler = () => {
//     try {
//         if (!acc) {
//             dispatch(connectBC());
//         }
//         else {
//             dispatch(disconnectBC())
//         }
//     } catch (error) {
//         console.log('error connecting', error)
//     }
// }




{/* <div class="main" >
                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button type="button" class="btn btn-primary "
                        onClick={(e) => {
                            e.preventDefault();
                            connectHandler();
                        }}>
                        {!acc && !data.readLoading && "Connect"}
                        {!acc && data.readLoading && "Connecting"}
                        {acc && !data.readLoading &&
                            <>
                                <button type="button" class="btn btn-danger btn-sm ">X</button>
                                &emsp;
                                ACC***{data.account > 0 ? (acc.substr(0, 5)) + "*****" + (acc.substr(39, 3)) : " "}
                            </>
                        }
                    </button>
                    {acc && !data.readLoading ?
                        <button type="button" class="btn btn-danger btn-sm "
                            onClick={(e) => {
                                e.preventDefault();
                                addToken(dispatch);
                            }}>
                            Add {data.symbol}
                        </button>
                        : ""}
                </div>
            </div> */}