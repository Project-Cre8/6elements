import React, { useEffect } from 'react'
import { ContractEvents } from "./contractEvents.js"


import Web3 from "web3";

const ethers = require('ethers');



export function Web3Base({maskAddress, network, hasMeta, enable}) {
    const [loaded, setLoaded] = React.useState(false);
    const [etherBalance, setEtherBalance] = React.useState(0);

    const [web3Obj, setWeb3Obj] = React.useState({});
    // const [rift1, setRift1] = React.useState({});
    const [ready, setReady] = React.useState(false);

    useEffect(() => {
        if (hasMeta === true && network === "3" && maskAddress !== "") {
            // create web3 and contract objects
            const web3 = new Web3(window.web3.currentProvider);
            // const Nova = new web3.eth.Contract(nova.abi);
            

            // assign correct address to contract objects
            // Nova.options.address = nova.networks[network].address;
            

            web3.eth.getBalance(maskAddress, (err, res) => {
                let etherBal = ethers.utils.formatEther(res);
                setEtherBalance(parseFloat(etherBal).toFixed(3));
                setWeb3Obj(web3);
                // setRift1(Nova);
                
                setReady(true);
                setLoaded(true);
              }); 
        } else {
            setReady(false);
            setLoaded(true);
        }
    }, [hasMeta, network, maskAddress])

    if(loaded) {
        return (
            
            <ContractEvents
                web3={web3Obj} 
                
                ready={ready}
                maskAddress={maskAddress}
                etherBalance={etherBalance}
                enable={enable}
                hasMeta={hasMeta}
                network={network}
            />
        )
    } else {
        return (<div>Loading2</div>)
    }
    
}
export default Web3Base;
