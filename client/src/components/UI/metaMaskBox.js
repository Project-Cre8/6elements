import React, { useEffect } from 'react';
import "../../CSS/mainScreen.css"

const formatter = require("../../utility/utilityFunctions.js");


export function MetaMaskBox({ enable, hasMeta, 
    maskAddress, category, 
    network, web3}) {
    
    const [hasAddress, setHasAddress] = React.useState(false)
    

    
    useEffect(() => {
        console.log(network)
        if (network !== "3" && typeof web3.eth && maskAddress === "") {
            setHasAddress(false)
        } else {
            setHasAddress(true);
        }
    }, [network, maskAddress, web3])
    

    const unlockMask = () => {
        console.log(maskAddress)
        window.ethereum.enable();
    }

    const addressOrEnable = () => {
        if (!hasAddress) {
            return (
                
                <button onClick={unlockMask} className="enableBtn">
                    Unlock
                </button>
                
            )
        } else {
            return (
                
                <button  disabled={true} className="enableBtn1">
                    {formatter.formatAddress(maskAddress)}
                </button>
                
            )
            
        }
    }

    

    return (
        <div className="metaMaskBar">
            <div className="foxImg" />
            <div className="enableFrame">
                {addressOrEnable()}
            </div>
            
        </div>
    )
}
export default MetaMaskBox