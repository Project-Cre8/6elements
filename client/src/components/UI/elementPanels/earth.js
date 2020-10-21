import React, { useEffect } from 'react';


import "../../../CSS/elements.css"


export function Earth({ enable, hasMeta, 
    maskAddress, category, 
    network, web3}) {
    
    
    // TEST DATA REMAINING ON LOG-OFF
    // useEffect(() => {
    //     if (network !== "3" && typeof web3.eth && maskAddress === "") {
    //         setAcctOn(false)
    //     } else {
    //         setAcctOn(true);
    //     }
    // }, [network, maskAddress, web3])
    // TEST DATA REMAINING ON LOG-OFF

   

    

    return (
        <div className="elementPanel">
            <div className="elementTitle">
                Earth
            </div>
            <div className="elementTokenTri">
                <div className="earth1" />
                <div className="tokenInfo">
                    X 0
                </div>
            </div>
            <div className="elementTokenTri">
                <div className="earth2" />
                <div className="tokenInfo">
                    X 0
                </div>
            </div>
            <div className="elementTokenTri">
                <div className="earth3" />
                <div className="tokenInfo">
                    X 0
                </div>
            </div>
            <div className="elementButtonBox">
                <button className="redeemButton">
                    Redeem
                </button>
                
            </div>
        </div>
    )
}
export default Earth