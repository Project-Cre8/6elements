import React, { useEffect } from 'react'

import { ContractData } from "./contractData.js"



export function ContractEvents({ 
    web3, ready, maskAddress, elements, link,
    etherBalance, enable, hasMeta, network}) {

    

    const [eventListElements, setEventListElements] = React.useState({list: []});
    const [elementsEventChange, setElementsEventChange] = React.useState({});

    //Event Listeners
    

    // NOVA
    useEffect(() => {
        if (ready) {
            let dataListNova = []
            let subscriptionNova;
            elements.getPastEvents("allEvents", {fromBlock: 0}, (err, res) => {
                let currentBlock; 
                if (res.length === 0) {
                    currentBlock = 0;
                } else {
                    currentBlock = res[res.length - 1].blockNumber;
                }
                res.forEach(item => {
                    if (item.event === "Receive") {
                        // if (item.returnValues.user.toUpperCase() === maskAddress.toUpperCase()) {
                        //     dataListNova.push(item);
                        // }
                    } else if (item.event === "Redeem") {
                        // if (item.returnValues.from.toUpperCase() === maskAddress.toUpperCase() || item.returnValues.to.toUpperCase() === maskAddress.toUpperCase()) {
                        //     dataListNova.push(item);
                        // }
                    }
                    
                });
                setEventListElements({list: dataListNova})
                subscriptionNova = elements.events.allEvents({
                    fromBlock: currentBlock + 1
                }, (err, res) => {
                    console.log(res);
                })
                .on("data", (item) => {
                    console.log(item);
                    setElementsEventChange(item);
                    while (dataListNova.length > 19) {
                        dataListNova.shift();
                    }
                    if (item.event === "Receive") {
                        // if (item.returnValues.user.toUpperCase() === maskAddress.toUpperCase()) {
                        //     dataListNova.push(item);
                        // }
                    } else if (item.event === "Redeem") {
                        // if (item.returnValues.from.toUpperCase() === maskAddress.toUpperCase() || item.returnValues.to.toUpperCase() === maskAddress.toUpperCase()) {
                        //     dataListNova.push(item);
                        // }
                    }
                    
                    
                    
                })
                return () => subscriptionNova.unsubscribe(() => {});
            });
        } else {
            return;
        }
    }, [elements, ready, maskAddress, network]);

    return (
        
        
            
                
        <ContractData 
            
            network={network} 
            enable={enable} 
            hasMeta={hasMeta} 
            maskAddress={maskAddress} 
            elements={elements}
            link={link}
            web3={web3}
            elementsEventChange={elementsEventChange}

            
            
        />
           

        
    )
}
export default ContractEvents;