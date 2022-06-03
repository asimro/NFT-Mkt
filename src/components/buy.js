import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buyNFT } from '../redux/buyBC'
import { getTokenData } from '../redux/readBC';
import { metaData } from '../data/metadata'
import 'bootstrap/dist/css/bootstrap.css'
import '../App.css';

export const Buy = () => {
    const data = useSelector((state) => state.data);
    const perNFTPrice = data.nftPrice;
    const mSupply = data.maxSupply;
    const ownerAddr = data.owners?.map((item) => {
        return (
            item.ownerAddress
        )
    })

    const ownerID = data.owners?.map((item) => {
        return (
            item.tokenID
        )
    })
    console.log('tokenID', ownerID)

    const dispatch = useDispatch();

    const onClick = async (e) => {
        e.preventDefault();
        try {
            const Transaction = {
                Tokens: 1,
                Amount: (perNFTPrice * 10 ** 18)
                    .toFixed(0)
                    .toString(),
            }
            console.log('Transaction', Transaction);
            await buyNFT(Transaction, dispatch);
            await getTokenData(dispatch);
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
        <div className="App">
            <br />
            {data.contract && data.account ?
                metaData?.map((json, index) => <>
                    <div className="column">
                        <div className="card">
                            <img className="pet-img-size" src={json.image} />
                            <h5> {json.name} </h5>
                            <p> ID: {json.edition} </p>

                            {ownerAddr != undefined ? (
                                ownerID == json.edition
                                    ? <button class="btn btn-warning">
                                        Sold
                                    </button>
                                    : <button button type="submit" class="btn btn-success"
                                        onClick={onClick}>
                                        Buy
                                    </button>
                            ) : ""}

                        </div>
                    </div>
                </>)
                : ""
            }

        </div >
    )
}


{/* <button button type="submit" class="btn btn-success"
    onClick={onClick}>
    Buy
</button> */}

// (data.owners.map((item) => {
//     return (
//         <p> {item.tokenID} </p >
//     )
// }))