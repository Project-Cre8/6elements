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

const contractAddr = "0x70cf3e83E656500Aef55A1c685cEB6CCC86c1215"

export function BaseScreen({ enable, hasMeta, elements, link,
    maskAddress, category, backpack, pool, change,
    network, web3}) {
    
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        if (loading) {
            setLoading(false);
        }
    }, [change])

    const buyElements = () => {
        
        let value = 0.5 * (10 ** 18);
        value = value.toString();
        console.log(value);
        // link.methods.approve(elements._address, value).send({ from: maskAddress }, (err, res) => {
        //     console.log(res)
        // })
        let data = web3.utils.numberToHex("555"); // This needs to be deprecated.
        link.methods.transferAndCall(contractAddr, value, data).send({ from: maskAddress }, (err, res) => {
            console.log(res);
            setLoading(true);
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
                    pool={pool}
                />
                <Earth 
                    maskAddress={maskAddress}
                    web3={web3}
                    network={network}
                    inventory={backpack.earth}
                    hasMeta={hasMeta}
                    pool={pool}
                />
                <Fire 
                    maskAddress={maskAddress}
                    web3={web3}
                    network={network}
                    inventory={backpack.fire}
                    hasMeta={hasMeta}
                    pool={pool}
                />
                <Water 
                    maskAddress={maskAddress}
                    web3={web3}
                    network={network}
                    inventory={backpack.water}
                    hasMeta={hasMeta}
                    pool={pool}
                />
                <Wind 
                    maskAddress={maskAddress}
                    web3={web3}
                    network={network}
                    inventory={backpack.wind}
                    hasMeta={hasMeta}
                    pool={pool}
                />
                <Dark 
                    maskAddress={maskAddress}
                    web3={web3}
                    network={network}
                    inventory={backpack.dark}
                    hasMeta={hasMeta}
                    pool={pool}
                />
            </div>
            <div className="bottomMidBar">
                {
                    loading 
                    ? 
                        <div className="buyButton1" style={{ opacity: "0.7"}}>
                            Please Wait
                        </div>
                    :
                    <button onClick={buyElements} className="buyButton" style={{paddingRight: "3%"}}>
                        Buy Gems: 0.5<img src={linkIcon} alt="link" style={{marginLeft: "3%", width: "2%", height: "4%", position: "absolute", top: "76%", left: "51%"}} />
                    </button>
                }
                
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