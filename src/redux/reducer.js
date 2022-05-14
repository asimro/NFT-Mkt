const initialState = {
    web3: "",
    contract: "",
    account: null,
    name: null,
    symbol: null,
    decimal: null,
    balance: 0,
    totalSupply: null,
    readLoading: false,
    readError: "",
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
