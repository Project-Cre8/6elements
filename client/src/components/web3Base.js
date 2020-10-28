import React, { useEffect } from 'react'
import { ContractEvents } from "./contractEvents.js"
import { LoadingScreen } from "./loading/loading";

import Web3 from "web3";

const ethers = require('ethers');
const elements = require("../contracts/SixElements.json");
const linkAbi = require("../contracts/LinkTokenInterface.json");


export function Web3Base({maskAddress, network, hasMeta, enable}) {
    const [loaded, setLoaded] = React.useState(false);
    const [etherBalance, setEtherBalance] = React.useState(0);

    const [web3Obj, setWeb3Obj] = React.useState({});
    const [sixE, setSixE] = React.useState({});
    const [linkObj, setLinkObj] = React.useState({});
    const [ready, setReady] = React.useState(false);

    useEffect(() => {
        console.log(maskAddress)
        if (hasMeta && network === "42" && maskAddress !== "") {
            // create web3 and contract objects
            const web3 = new Web3(window.web3.currentProvider);
            const Elements = new web3.eth.Contract(elements.abi);
            const Link = new web3.eth.Contract(linkAbi.abi);
            
            // assign correct address to contract objects
            Elements.options.address = "0x08804dD66806E3F1BF3c771F52780a53C65Ec75D"; // elements.networks[network].address;
            Link.options.address = "0xa36085F69e2889c224210F603D836748e7dC0088";

            web3.eth.getBalance(maskAddress, (err, res) => {
                let etherBal = ethers.utils.formatEther(res);
                setEtherBalance(parseFloat(etherBal).toFixed(3));
                setWeb3Obj(web3);
                setSixE(Elements);
                setLinkObj(Link);
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
                elements={sixE}
                link={linkObj}
                ready={ready}
                maskAddress={maskAddress}
                etherBalance={etherBalance}
                enable={enable}
                hasMeta={hasMeta}
                network={network}
            />
        )
    } else {
        return (<LoadingScreen mark={2}/>)
    }
    
}
export default Web3Base;
