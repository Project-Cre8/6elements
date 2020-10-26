import React, { useEffect } from 'react';


import "../../../CSS/elements.css"

const linkIcon = require("../../../ELEMENTS/LinkLogo.png");

export function Earth({ enable, hasMeta, pool,
    maskAddress, category, inventory,
    network, web3}) {
    
    const [one, setOne] = React.useState(0);
    const [two, setTwo] = React.useState(0);
    const [three, setThree] = React.useState(0);
    const [prize, setPrize] = React.useState(0);
    const [prizeReady, setPrizeReady] = React.useState(false);

    // const [hasBox, setHasBox] = React.useState(false);
    
    useEffect(() => {
        if (typeof inventory !== "undefined") {
            setOne(inventory.a);
            setTwo(inventory.b);
            setThree(inventory.c);
            if (inventory.a > 0 && inventory.b > 0 && inventory.c > 0) {
                setPrizeReady(true);
            }
        }
        setPrize(parseFloat(pool * 0.15).toFixed(2));
        
    }, [hasMeta, inventory]);
    

   

    

    return (
        <div className="elementPanel">
            <div className="elementTitle">
                Earth
            </div>
            <div className="elementTokenTri">
                <div className={one > 0 ? "earth1" : "earth1Off"} />
                <div className="tokenInfo">
                    X {one}
                </div>
            </div>
            <div className="elementTokenTri">
                <div className={two > 0 ? "earth2" : "earth2Off"} />
                <div className="tokenInfo">
                    X {two}
                </div>
            </div>
            <div className="elementTokenTri">
                <div className={three > 0 ? "earth3" : "earth3Off"} />
                <div className="tokenInfo">
                    X {three}
                </div>
            </div>
            <div className="elementButtonBox">
                {
                    prizeReady 
                    ?
                    <button className="redeemButton">
                        Win {prize} <img src={linkIcon} alt="linky" style={{ width: "1.2em", height: "1.2em", position: "absolute", top: "59.7%", left: "34.7%"}} />
                    </button>
                    :
                    <button className="redeemButton1" disabled={true}>
                        Win {prize} <img src={linkIcon} alt="linky" style={{ width: "1.2em", height: "1.2em", position: "absolute", top: "59.7%", left: "34.7%"}} />
                    </button>
                }
                
                
            </div>
        </div>
    )
}
export default Earth