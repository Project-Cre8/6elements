import React, { useEffect, useCallback } from 'react'
import { BaseScreen } from "./UI/baseScreen.js"


const ethers = require("ethers");

export function ContractData({ enable, hasMeta, maskAddress, network, web3, unlockMask }) {
    
    const [loaded, setLoaded] = React.useState(false);
    
    useEffect(() => {
        
        if (maskAddress !== "" && network === "3" && typeof nova !== "undefined") {
            
            // let Obj = {};
            // nova.methods.getAllInfo().call((err, res) => {
            //     Obj.regular = ethers.utils.formatUnits(res.regular, 6);
            //     Obj.stakingPot = ethers.utils.formatUnits(res.stakingPot, 18);
            //     Obj.stakeFee = ethers.utils.formatUnits(res.stakingFee, 6);
            //     Obj.timer = res.timeToEnd;
            //     Obj.exitPot = ethers.utils.formatUnits(res.exitPot, 18);
            //     Obj.timerPot = ethers.utils.formatUnits(res.timerPot, 18);
            //     nova.methods.getUserInfo(maskAddress).call((error, resul) => {
            //         Obj.lastBlock = resul.lastTime;
            //         Obj.balance = ethers.utils.formatUnits(resul.userBalance, 6);
            //         Obj.sellOutCost = ethers.utils.formatUnits(resul.sellOutCost, 6);
            //         setNovaData(Obj);
            //         setLoaded(true);
                    
            //     })
                
            // })
            setLoaded(true); // <----- REMOVE THIS!!!!
        } else {
            setLoaded(true);
        }
            
        
    }, [maskAddress, network]);

    

    if (loaded) {
        return (
            
    
                
            <BaseScreen
                enable={enable} 
                hasMeta={hasMeta}
                maskAddress={maskAddress}
                network={network}
                
                web3={web3}
                
                unlockMask={unlockMask}
            />
                
    
                
        )
    } else {
        return(<div> Loading </div>)
    }
    
}
export default ContractData;