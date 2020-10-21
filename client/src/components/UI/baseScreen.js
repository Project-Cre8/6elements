import React, { useEffect } from 'react';
import { MetaMaskBox } from "./metaMaskBox.js";
import { Light } from "./elementPanels/light";
import { Earth } from "./elementPanels/earth";
import { Fire } from "./elementPanels/fire";
import { Water } from "./elementPanels/water";
import { Wind } from "./elementPanels/wind";
import { Dark } from "./elementPanels/dark";






import "../../CSS/mainScreen.css"

export function BaseScreen({ enable, hasMeta, 
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
        <div className="basePane">
            <div className="topBar">
                <div className="logoBar">
                    <div className="logoImg" />
                </div>
                <MetaMaskBox 
                    maskAddress={maskAddress}
                    web3={web3}
                    network={network}
                />
            </div>
            <div className="topMidBar">

            </div>
            <div className="midBar">
                <Light 
                    maskAddress={maskAddress}
                    web3={web3}
                    network={network}
                />
                <Earth 
                    maskAddress={maskAddress}
                    web3={web3}
                    network={network}
                />
                <Fire 
                    maskAddress={maskAddress}
                    web3={web3}
                    network={network}
                />
                <Water 
                    maskAddress={maskAddress}
                    web3={web3}
                    network={network}
                />
                <Wind 
                    maskAddress={maskAddress}
                    web3={web3}
                    network={network}
                />
                <Dark 
                    maskAddress={maskAddress}
                    web3={web3}
                    network={network}
                />
            </div>
            <div className="bottomMidBar">

            </div>
            <div className="bottomBar">

            </div>
        </div>
    )
}
export default BaseScreen