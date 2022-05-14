import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { connectBC, disconnectBC, getTokenData, addToken } from '../redux/readBC';
import { ETHERSCAN_LINK, ACCOUNT_LINK, CONTRACT_ADDRESS } from "../contract/config";
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect } from 'react';


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
        <div>
            <br /> <br />
            <div class="d-grid gap-2 mx-auto">
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
                        <br />
                    </button>
                    {acc && !data.readLoading ?
                        <button type="button" class="btn btn-danger btn-sm "
                            onClick={(e) => {
                                e.preventDefault();
                                addToken(dispatch);
                            }}>
                            Add Token
                        </button>
                        : ""}
                </div>
            </div>

            <br />
            <h4 > Account : &emsp; &emsp;
                <a href={ACCOUNT_LINK + CONTRACT_ADDRESS + "?a=" + acc}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Click here to check your account history">
                    {data.account > 0 ? (acc.substr(0, 5)) + "********" + (acc.substr(39, 3)) : " "}
                </a>
            </h4>
            <h4 > Balance :&emsp;&emsp; &emsp;
                {Balance > 0 ? Balance.toLocaleString() : ""}
            </h4>
            <br /> <br />

            Contract Address :
            <a href={ETHERSCAN_LINK + CONTRACT_ADDRESS + "#balances"}
                target="_blank"
                rel="noopener noreferrer"
                title="Click here to view token holders">
                {acc ? CONTRACT_ADDRESS : ""}
            </a><br />
            Name: {data.name}<br />
            Symbol: {data.symbol}<br />
            Decimals: {data.decimal}<br />
            Total Supply: {data.totalSupply}<br />

            <br />
        </div>
    )
}
