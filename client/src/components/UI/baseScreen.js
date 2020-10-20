import React, { useEffect } from 'react';
import { MetaMaskBox } from "./metaMaskBox.js";




import "../../CSS/mainScreen.css"

export function BaseScreen({ enable, hasMeta, 
    maskAddress, category, 
    network, web3, unlockMask}) {
    
    const [acctOn, setAcctOn] = React.useState(true);

    // TEST DATA REMAINING ON LOG-OFF
    useEffect(() => {
        if (network !== "3" && typeof web3.eth && maskAddress === "") {
            setAcctOn(false)
        } else {
            setAcctOn(true);
        }
    }, [network, maskAddress, web3])
    // TEST DATA REMAINING ON LOG-OFF

   

    

    return (
        <div className="basePane">
            <div className="topBar">
                <div className="logoBar">
                    <div className="logoImg" />
                </div>
                <MetaMaskBox unlockMask={unlockMask}/>
            </div>
            <div className="topMidBar">

            </div>
            <div className="midBar">

            </div>
            <div className="bottomMidBar">

            </div>
            <div className="bottomBar">

            </div>
        </div>
    )
}
export default BaseScreen