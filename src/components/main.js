import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { connectBC, disconnectBC, getTokenData, addToken } from '../redux/readBC';
import { ETHERSCAN_LINK, ACCOUNT_LINK, CONTRACT_ADDRESS } from "../contract/config";
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect } from 'react';
import '../App.css'


export const Connection = () => {
    const dispatch = useDispatch();

    const data = useSelector((state) => state.data);
    const acc = data.account > 0 ? data.account : "";
    const contract = data.contract;
    const Balance = Number(data.balance).toFixed().toString();

    const connectHandler = () => {
        try {
            if (!acc) {
                dispatch(connectBC());
            }
            else {
                dispatch(disconnectBC())
            }
        } catch (error) {
            console.log('error connecting', error)
        }
    }


    useEffect(() => {
        if (acc && contract) {
            getTokenData(dispatch);
        }
    }, [acc, contract])


    return (
        <div >
            <br /> <br />
            <div class="main" >
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
            </div>

            <div class="main">
                <h6 > Account : &emsp; &emsp;
                    <a href={ACCOUNT_LINK + CONTRACT_ADDRESS + "?a=" + acc}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to check your account history">
                        {data.account > 0 ? (acc.substr(0, 5)) + "********" + (acc.substr(39, 3)) : " "}
                    </a>
                </h6>
            </div>

            <div class="main">

                <h6 > Balance :&emsp;&emsp; &emsp;
                    {Balance > 0 ? Balance.toLocaleString() : ""}
                </h6>
            </div>

            <div class="main">
                Contract Address :
                <a href={ETHERSCAN_LINK + CONTRACT_ADDRESS + "#balances"}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Click here to view token holders">
                    {acc ? CONTRACT_ADDRESS : ""}
                </a><br />
            </div>

            <div class="main">
                {data.contract && data.web3 ?
                    <>
                        Name: {data.name}<br />
                        Symbol: {data.symbol}<br />
                        NFT-Price: {data.nftPrice} Ether <br />
                        Total Supply: {data.totalSupply}<br />
                        Max Supply: {data.maxSupply}<br />
                        {/* OWNERS: {data.owners.map((item) => {
                            return (
                                <>
                                    NFT-ID: {item.tokenID}&emsp;
                                    Owner: {item.ownerAddress}
                                    <br />
                                </>)
                        })}<br /> */}
                    </>
                    : ""}
            </div>
        </div>
    )
}
