export const initialState = (payload) => {
    return {
        type: "INITIALSTATE",
        payload: payload
    }
}
export const web3 = (payload) => {
    return {
        type: "WEB3",
        payload: payload
    }
}

export const contract = (payload) => {
    return {
        type: "CONTRACT",
        payload: payload
    }
}

export const contractWS = (payload) => {
    return {
        type: "CONTRACTWS",
        payload: payload
    }
}

export const account = (payload) => {
    return {
        type: "ACCOUNT",
        payload: payload
    }
}

export const name = (payload) => {
    return {
        type: "NAME",
        payload: payload
    }
}

export const symbol = (payload) => {
    return {
        type: "SYMBOL",
        payload: payload
    }
}

export const decimal = (payload) => {
    return {
        type: "DECIMAL",
        payload: payload
    }
}
export const nftPrice = (payload) => {
    return {
        type: "NFTPRICE",
        payload: payload
    }
}

export const balance = (payload) => {
    return {
        type: "BALANCE",
        payload: payload
    }
}

export const totalSupply = (payload) => {
    return {
        type: "TOTALSUPPLY",
        payload: payload
    }

}

export const maxSupply = (payload) => {
    return {
        type: "MAXSUPPLY",
        payload: payload
    }

}
export const updateMetaData = (payload) => {
    return {
        type: "METADATA",
        payload: payload
    }

}

export const eventMetaData = (payload) => {
    return {
        type: "EVENT",
        payload: payload
    }

}

export const readLoading = (payload) => {
    return {
        type: "READLOADING",
        payload: payload
    }
}
export const readError = (payload) => {
    return {
        type: "READERROR",
        payload: payload
    }
}
