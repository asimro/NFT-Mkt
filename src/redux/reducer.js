const initialState = {
    web3: null,
    contract: null,
    account: null,
    name: null,
    symbol: null,
    decimal: null,
    nftPrice: null,
    balance: 0,
    totalSupply: 0,
    maxSupply: 0,
    metaData: [],
    readLoading: false,
    readError: null,
}




export const reducerBC = (state = initialState, action) => {
    switch (action.type) {
        case "INITIALSTATE": {
            return {
                initialState
            }
        }
        case "WEB3": {
            return {
                ...state,
                web3: action.payload
            }
        }
        case "CONTRACT": {
            return {
                ...state,
                contract: action.payload
            }
        }
        case "ACCOUNT": {
            return {
                ...state,
                account: action.payload
            }
        }
        case "NAME": {
            return {
                ...state,
                name: action.payload
            }
        }
        case "SYMBOL": {
            return {
                ...state,
                symbol: action.payload
            }
        }
        case "DECIMAL": {
            return {
                ...state,
                decimal: action.payload
            }
        }
        case "NFTPRICE": {
            return {
                ...state,
                nftPrice: action.payload
            }
        }
        case "BALANCE": {
            return {
                ...state,
                balance: action.payload
            }
        }
        case "TOTALSUPPLY": {
            return {
                ...state,
                totalSupply: action.payload
            }
        }
        case "MAXSUPPLY": {
            return {
                ...state,
                maxSupply: action.payload
            }
        }
        case "METADATA": {
            return {
                ...state,
                metaData: action.payload
            }
        }
        case "READLOADING": {
            return {
                ...state,
                readLoading: action.payload
            }
        }
        case "READERROR": {
            return {
                ...state,
                readLoadig: action.payload
            }
        }

        default:
            return state;
    }

}
