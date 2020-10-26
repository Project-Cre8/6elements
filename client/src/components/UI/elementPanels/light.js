import React, { useEffect } from 'react';


import "../../../CSS/elements.css"

const linkIcon = require("../../../ELEMENTS/LinkLogo.png");


export function Light({ enable, hasMeta, pool,
    maskAddress, category, inventory, elements,
    network, web3}) {
    
    
        const [one, setOne] = React.useState(0);
        const [two, setTwo] = React.useState(0);
        const [prize, setPrize] = React.useState(0);
        const [prizeReady, setPrizeReady] = React.useState(false);
        
        useEffect(() => {
            
            if (typeof inventory !== "undefined") {
                setOne(inventory.a);
                setTwo(inventory.b);
                if (inventory.a > 0 && inventory.b > 0) {
                    setPrizeReady(true);
                }
            }
            setPrize(parseFloat(pool * 0.50).toFixed(2));
        }, [hasMeta, inventory]);

   
        const redeemTokens = () => {
            elements.methods.redeem(4).send({from: maskAddress}, (err, res) => {
                console.log(res);
            })
        }
    

    return (
        <div className="elementPanel">
            <div className="elementTitle">
                Light
            </div>
            <div className="elementTokenDual">
                <div className={one > 0 ? "light1" : "light1Off"} />
                <div className="tokenInfo">
                    X {one}
                </div>
            </div>
            <div className="elementTokenDual">
                <div className={two > 0 ? "light2" : "light2Off"} />
                <div className="tokenInfo">
                    X {two}
                </div>
            </div>
            <div className="elementButtonBox">
                {
                    prizeReady 
                    ?
                    <button className="redeemButton" onClick={redeemTokens}>
                        Win {prize} <img src={linkIcon} alt="linky" style={{ width: "1.2em", height: "1.2em", position: "absolute", top: "59.7%", left: "23.5%"}} />
                    </button>
                    :
                    <button className="redeemButton1" disabled={true}>
                        Win {prize} <img src={linkIcon} alt="linky" style={{ width: "1.2em", height: "1.2em", position: "absolute", top: "59.7%", left: "23.5%"}} />
                    </button>
                }
                
            </div>
        </div>
    )
}
export default Light