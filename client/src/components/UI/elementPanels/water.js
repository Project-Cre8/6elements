import React, { useEffect } from 'react';


import "../../../CSS/elements.css"

const linkIcon = require("../../../ELEMENTS/LinkLogo.png");

export function Water({ enable, hasMeta, pool,
    maskAddress, category, inventory, elements,
    network, web3}) {
    
    
    const [one, setOne] = React.useState(0);
    const [two, setTwo] = React.useState(0);
    const [three, setThree] = React.useState(0);
    const [prize, setPrize] = React.useState(0);
    const [prizeReady, setPrizeReady] = React.useState(false);
    
    useEffect(() => {
        console.log(inventory)
        if (typeof inventory !== "undefined") {
            setOne(inventory.a);
            setTwo(inventory.b);
            setThree(inventory.c);
            if (inventory.a > 0 && inventory.b > 0 && inventory.c > 0) {
                setPrizeReady(true);
            }
        }
        setPrize(parseFloat(pool * 0.07).toFixed(2));
    }, [hasMeta, inventory, pool]);

    const redeemTokens = () => {
        elements.methods.redeem(1).send({from: maskAddress}, (err, res) => {
            console.log(res);
        })
    }

    

    return (
        <div className="elementPanel">
            <div className="elementTitle">
                Water
            </div>
            <div className="elementTokenTri">
                <div className={one > 0 ? "water1" : "water1Off"} />
                <div className="tokenInfo">
                    X {one}
                </div>
            </div>
            <div className="elementTokenTri">
                <div className={two > 0 ? "water2" : "water2Off"} />
                <div className="tokenInfo">
                    X {two}
                </div>
            </div>
            <div className="elementTokenTri">
                <div className={three > 0 ? "water3" : "water3Off"} />
                <div className="tokenInfo">
                    X {three}
                </div>
            </div>
            <div className="elementButtonBox">
                {
                    prizeReady 
                    ?
                    <button className="redeemButton" onClick={redeemTokens}>
                        Win {prize} <img src={linkIcon} alt="linky" style={{ width: "1.2em", height: "1.2em", position: "absolute", top: "59.7%", left: "57.2%"}} />
                    </button>
                    :
                    <button className="redeemButton1" disabled={true}>
                        Win {prize} <img src={linkIcon} alt="linky" style={{ width: "1.2em", height: "1.2em", position: "absolute", top: "59.7%", left: "57.2%"}} />
                    </button>
                }
                
            </div>
        </div>
    )
}
export default Water