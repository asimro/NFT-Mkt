import Web3 from 'web3';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider"
import { ABI, CONTRACT_ADDRESS, INFURA_ID, NETWORK } from '../contract/config';
import * as actions from "./action";
import { store } from "../store";


let web3Modal = null;
let provider = null;

const init = () => {
    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                infuraId: INFURA_ID
            }
        }
    };
    web3Modal = new Web3Modal({
        cacheProvider: false,
        theme: "dark",
        providerOptions,
    });
}

export const connectBC = () => {
    init();
    return async (dispatch) => {
        dispatch(actions.readLoading(true));

        try {
            provider = await web3Modal.connect();
            console.log('provider', provider);

            let web3 = new Web3(provider);
            try {
                const accounts = await web3.eth.getAccounts();
                const networkId = await web3.eth.getChainId()
                if (networkId === NETWORK.ID) {
                    const contract = new web3.eth.Contract(
                        ABI,
                        CONTRACT_ADDRESS
                    );
                    dispatch(actions.web3(web3));
                    dispatch(actions.account(accounts[0]));
                    dispatch(actions.contract(contract));

                    provider.on("accountsChanged", (accounts) => {
                        dispatch(actions.account(accounts[0]));
                    });
                    dispatch(actions.readLoading(false));

                } else {
                    try {
                        await provider.request({
                            method: 'wallet_switchEthereumChain',
                            params: [
                                {
                                    chainId: '0x4'
                                }
                            ]
                        })
                        dispatch(connectBC());
                        dispatch(actions.readLoading(false))

                    }
                    catch (error) {
                        if (error.code === 4902) {
                            await provider.request({
                                method: 'wallet_addEthereumChain',
                                params: [
                                    {
                                        chainId: '0x4',
                                        chainName: "Rinkeby Test Network",
                                        nativeCurrency: {
                                            name: "ETH",
                                            symbol: "ETH",
                                            decimals: 18
                                        },
                                        blockExplorerUrls: [
                                            "https://rinkeby.etherscan.io"
                                        ],
                                        rpcUrls: ["https://rinkeby.infura.io/v3/"]
                                    }
                                ]
                            })
                        }
                        dispatch(actions.readError(`Change network to ${NETWORK.NAME}.`));
                    }
                }
            } catch (err) {
                console.log(err)
                dispatch(actions.readError(err.message));
            }
        } catch (error) {
            console.log('error connectBC', error)
        }
    }
}



export const disconnectBC = () => {
    return async (dispatch) => {
        if (provider.close) {
            await provider.close();
            await web3Modal.clearCachedProvider();
            provider = null
        }
        dispatch(actions.initialState());
    }
}




export const getTokenData = async (dispatch) => {
    const web3 = store.getState().data.web3;
    const contract = store.getState().data.contract;
    const acc = store.getState().data.account;

    try {
        if (acc && contract) {
            const name = await contract.methods.name().call();
            dispatch(actions.name(name));

            const symbol = await contract.methods.symbol().call();
            dispatch(actions.symbol(symbol));

            const decimal = 0;
            dispatch(actions.decimal(decimal));

            const price = await contract.methods.getNFTPrice().call();
            const nftPrice = web3.utils.fromWei(price, "ether")
            dispatch(actions.nftPrice(nftPrice));

            const tSupply = await contract.methods.totalSupply().call();
            dispatch(actions.totalSupply(tSupply));

            const mSupply = await contract.methods._maxSupply().call();
            dispatch(actions.maxSupply(mSupply));

            let owners = [{
                ownerAddress: null,
                tokenID: null
            }]
            owners.pop();
            for (let i = 0; i <= tSupply - 1; i++) {
                let tid = await contract.methods.tokenByIndex(i).call();
                let ownerof = await contract.methods.ownerOf(tid).call();
                
                owners.push({
                    ownerAddress: ownerof,
                    tokenID: tid
                })
            }
            dispatch(actions.updateOwners(owners));
            console.log('owners', owners)


            const bal = await contract.methods
                .balanceOf(acc)
                .call();
            dispatch(actions.balance(bal));
        }
        else {
            return "Wallet not connected"
        }

    } catch (error) {
        console.log('error get token data', error)
    }
}




export const addToken = async () => {
    const tokenAddress = CONTRACT_ADDRESS;
    const tokenSymbol = store.getState().data.symbol;
    const tokenDecimal = store.getState().data.decimal
    const tokenLogo = 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Cryptocurrency_Logo.svg';

    try {
        const addingToken = await provider.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20',
                options: {
                    address: tokenAddress,
                    symbol: tokenSymbol,
                    decimals: tokenDecimal,
                    image: tokenLogo,
                }
            }
        });

        if (addingToken) {
            console.log("Token is already added")
        }
        else {
            console.log('Token need to be added')
        }
    }
    catch (error) {
        console.log('add token handler error ', error)
    }
}



