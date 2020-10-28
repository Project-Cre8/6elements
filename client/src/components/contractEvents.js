import React, { useEffect } from 'react'

import { ContractData } from "./contractData.js"
import { LoadingScreen } from "./loading/loading";



export function ContractEvents({ 
    web3, ready, maskAddress, elements, link,
    etherBalance, enable, hasMeta, network}) {

    const [loaded, setLoaded] = React.useState(false);

    const [eventListElements, setEventListElements] = React.useState({list: []});
    const [elementsEventChange, setElementsEventChange] = React.useState({});

    //Event Listeners
    

    // NOVA
    useEffect(() => {
        setLoaded(false);
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
                setLoaded(true);
                
                subscriptionNova = elements.events.allEvents({
                    fromBlock: currentBlock 
                }, (errs, resi) => {
                    setLoaded(true);
                })
                .on("data", (item) => {
                    
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
            setLoaded(true);
            return;
        }
    }, [elements, ready, maskAddress, network]);

    if (loaded) {
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
    } else {
        return (<LoadingScreen mark={3}/>)
    }
    
}
export default ContractEvents;