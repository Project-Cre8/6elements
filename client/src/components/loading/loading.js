import React, { useEffect } from 'react';
// import { MetaMaskBox } from "./metaMaskBox.js";
// import { Light } from "./elementPanels/light";
// import { Earth } from "./elementPanels/earth";
// import { Fire } from "./elementPanels/fire";
// import { Water } from "./elementPanels/water";
// import { Wind } from "./elementPanels/wind";
// import { Dark } from "./elementPanels/dark";

import "../../CSS/mainScreen.css"

const linkIcon = require("../../ELEMENTS/LinkLogo.png");

const contractAddr = "0x83658Da8e4baAA85f040a79a5F3F26e753603dee"

export function LoadingScreen({ mark }) {
    
    

    const cre8Link = () => {
        window.open("https://projectcre8.io");
    }

    return (
        <div className="basePane">
            <div className="topBar">
                <div className="logoBar">
                    <div className="logoImg" />
                </div>
                {/* <MetaMaskBox 
                    maskAddress={maskAddress}
                    web3={web3}
                    network={network}
                /> */}
            </div>
            <div className="topMidBar">
                
                
            </div>
            <div className="midBar">
                {mark}
            </div>
            <div className="bottomMidBar">
                
                
            </div>
            <div className="bottomBar">
                <div className="bottomInfo">

                </div>
                <button className="cre8Logo" onClick={cre8Link} />
            </div>
        </div>
    )
}
export default LoadingScreen