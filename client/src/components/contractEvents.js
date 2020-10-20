import React, { useEffect } from 'react'

import { ContractData } from "./contractData.js"



export function ContractEvents({ 
    web3, ready, maskAddress, 
    etherBalance, enable, hasMeta, network, unlockMask }) {

    

    // const [eventListNova, setEventListNova] = React.useState({list: []});
    // const [novaEventChange, setNovaEventChange] = React.useState({});

    //Event Listeners
    

    // NOVA
    // useEffect(() => {
    //     if (ready) {
    //         let dataListNova = []
    //         let subscriptionNova;
    //         nova.getPastEvents("allEvents", {fromBlock: 0}, (err, res) => {
    //             let currentBlock; 
    //             if (res.length === 0) {
    //                 currentBlock = 0;
    //             } else {
    //                 currentBlock = res[res.length - 1].blockNumber;
    //             }
    //             res.forEach(item => {
    //                 if (item.event === "Play" || item.event === "Burned" || item.event === "Bonus" || item.event === "SellOut") {
    //                     if (item.returnValues.user.toUpperCase() === maskAddress.toUpperCase()) {
    //                         dataListNova.push(item);
    //                     }
    //                 } else if (item.event === "Transfer") {
    //                     if (item.returnValues.from.toUpperCase() === maskAddress.toUpperCase() || item.returnValues.to.toUpperCase() === maskAddress.toUpperCase()) {
    //                         dataListNova.push(item);
    //                     }
    //                 }
                    
    //             });
    //             setEventListNova({list: dataListNova})
    //             subscriptionNova = nova.events.allEvents({
    //                 fromBlock: currentBlock + 1
    //             }, (err, res) => {
    //                 console.log(res);
    //             })
    //             .on("data", (item) => {
    //                 setNovaEventChange(item);
    //                 while (dataListNova.length > 19) {
    //                     dataListNova.shift();
    //                 }
    //                 if (item.event === "Play" || item.event === "Burned" || item.event === "Bonus" || item.event === "SellOut") {
    //                     if (item.returnValues.user.toUpperCase() === maskAddress.toUpperCase()) {
    //                         dataListNova.push(item);
    //                     }
    //                 } else if (item.event === "Transfer") {
    //                     if (item.returnValues.from.toUpperCase() === maskAddress.toUpperCase() || item.returnValues.to.toUpperCase() === maskAddress.toUpperCase()) {
    //                         dataListNova.push(item);
    //                     }
    //                 }
                    
                    
                    
    //             })
    //             return () => subscriptionNova.unsubscribe(() => {});
    //         });
    //     } else {
    //         return;
    //     }
    // }, [nova, ready, maskAddress, network]);

    return (
        
        
            
                
        <ContractData 
            
            network={network} 
            enable={enable} 
            hasMeta={hasMeta} 
            maskAddress={maskAddress} 
            
            web3={web3}

            unlockMask={unlockMask}
            
        />
           

        
    )
}
export default ContractEvents;