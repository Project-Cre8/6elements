import React, { useEffect } from 'react';


import "../../../CSS/elements.css"

const linkIcon = require("../../../ELEMENTS/LinkLogo.png");


export function Dark({ enable, hasMeta, pool,
    maskAddress, category, inventory, elements,
    network, web3}) {
    
    
    const [one, setOne] = React.useState(0);
    const [two, setTwo] = React.useState(0);
    const [prize, setPrize] = React.useState(0);
    const [prizeReady, setPrizeReady] = React.useState(false);
    
    useEffect(() => {
        console.log(inventory)
        if (typeof inventory !== "undefined") {
            setOne(inventory.a);
            setTwo(inventory.b);
            if (inventory.a > 0 && inventory.b > 0) {
                setPrizeReady(true);
            }
        }
        setPrize(parseFloat(pool * 0.95).toFixed(2));
    }, [hasMeta, inventory, pool]);

   
    const redeemTokens = () => {
        elements.methods.redeem(5).send({from: maskAddress}, (err, res) => {
            console.log(res);
        })
    }
    

    return (
        <div className="elementPanel">
            <div className="elementTitle">
                Dark
            </div>
            <div className="elementTokenDual">
                <div className={one > 0 ? "dark1" : "dark1Off"} />
                <div className="tokenInfo">
                    X {one}
                </div>
            </div>
            <div className="elementTokenDual">
                <div className={two > 0 ? "dark2" : "dark2Off"} />
                <div className="tokenInfo">
                    X {two}
                </div>
            </div>
            <div className="elementButtonBox">
                {
                    prizeReady 
                    ?
                    <button className="redeemButton" onClick={redeemTokens}>
                        Win {prize} <img src={linkIcon} alt="linky" style={{ width: "1.2em", height: "1.2em", position: "absolute", top: "59.7%", left: "79.4%"}} />
                    </button>
                    :
                    <button className="redeemButton1" disabled={true}>
                        Win {prize} <img src={linkIcon} alt="linky" style={{ width: "1.2em", height: "1.2em", position: "absolute", top: "59.7%", left: "79.4%"}} />
                    </button>
                }
                
                
            </div>
        </div>
    )
}
export default Dark