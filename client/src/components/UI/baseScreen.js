import React, { useEffect } from 'react';
import { MetaMaskBox } from "./metaMaskBox.js";
import { Light } from "./elementPanels/light";
import { Earth } from "./elementPanels/earth";
import { Fire } from "./elementPanels/fire";
import { Water } from "./elementPanels/water";
import { Wind } from "./elementPanels/wind";
import { Dark } from "./elementPanels/dark";

import "../../CSS/mainScreen.css"

const linkIcon = require("../../ELEMENTS/LinkLogo.png");

export function BaseScreen({ enable, hasMeta, elements, link,
    maskAddress, category, backpack, pool,
    network, web3}) {
    
    

    const buyElements = () => {
        
        let value = 10 * (10 ** 18);
        value = value.toString();
        console.log(value);
        // link.methods.approve(elements._address, value).send({ from: maskAddress }, (err, res) => {
        //     console.log(res)
        // })
        elements.methods.getElements().send({ from: maskAddress }, (err, res) => {
            console.log(res);
        })
    }

    const cre8Link = () => {
        window.open("https://projectcre8.io");
    }

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
                <div className="topPrizeBanner" />
                <div className="prizeHeader">
                    PRIZE POOL
                </div>
                <div className="prizeMain">
                    <span style={{position: "relative", top: "-17%"}} >{pool}</span> <img src={linkIcon} alt="link" className="linkIconBig" />
                </div>
                
            </div>
            <div className="midBar">
                <Light 
                    maskAddress={maskAddress}
                    web3={web3}
                    network={network}
                    inventory={backpack.light}
                    hasMeta={hasMeta}
                />
                <Earth 
                    maskAddress={maskAddress}
                    web3={web3}
                    network={network}
                    inventory={backpack.earth}
                    hasMeta={hasMeta}
                />
                <Fire 
                    maskAddress={maskAddress}
                    web3={web3}
                    network={network}
                    inventory={backpack.fire}
                    hasMeta={hasMeta}
                />
                <Water 
                    maskAddress={maskAddress}
                    web3={web3}
                    network={network}
                    inventory={backpack.water}
                    hasMeta={hasMeta}
                />
                <Wind 
                    maskAddress={maskAddress}
                    web3={web3}
                    network={network}
                    inventory={backpack.wind}
                    hasMeta={hasMeta}
                />
                <Dark 
                    maskAddress={maskAddress}
                    web3={web3}
                    network={network}
                    inventory={backpack.dark}
                    hasMeta={hasMeta}
                />
            </div>
            <div className="bottomMidBar">
                <button onClick={buyElements} className="buyButton">
                    Purchase Gems (0.5 LINK)
                </button>
            </div>
            <div className="bottomBar">
                <div className="bottomInfo">

                </div>
                <button className="cre8Logo" onClick={cre8Link} />
            </div>
        </div>
    )
}
export default BaseScreen