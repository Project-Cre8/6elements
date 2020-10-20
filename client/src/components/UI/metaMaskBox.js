import React, { useEffect } from 'react';

import "../../CSS/mainScreen.css"

export function MetaMaskBox({ enable, hasMeta, 
    maskAddress, category, 
    network, web3, unlockMask}) {
    
    

    // TEST DATA REMAINING ON LOG-OFF
    // useEffect(() => {
    //     if (network !== "3" && typeof web3.eth && maskAddress === "") {
    //         setAcctOn(false)
    //     } else {
    //         setAcctOn(true);
    //     }
    // }, [network, maskAddress, web3])
    // TEST DATA REMAINING ON LOG-OFF

    const addressOrEnable = () => {
        if (maskAddress == "") {
            return (
                <div className="enableFrame">
                    <button className="enableBtn">
                        Unlock
                    </button>
                </div>
            )
        } else {
            return (
                <div className="enableFrame">
                    <div className="addressBar">
                        <p className="addressLetters">
                            address
                        </p>
                    </div>
                </div>
            )
            
        }
    }

    

    return (
        <div className="metaMaskBar">
            <div className="foxImg" />
            {addressOrEnable()}
        </div>
    )
}
export default MetaMaskBox