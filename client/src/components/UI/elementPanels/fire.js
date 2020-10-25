import React, { useEffect } from 'react';


import "../../../CSS/elements.css"


export function Fire({ enable, hasMeta, 
    maskAddress, category, inventory,
    network, web3}) {
     
    const [one, setOne] = React.useState(0);
    const [two, setTwo] = React.useState(0);
    const [three, setThree] = React.useState(0);
    
    useEffect(() => {
        if (typeof inventory !== "undefined") {
            setOne(inventory.a);
            setTwo(inventory.b);
            setThree(inventory.c);
        }
    }, [hasMeta, inventory]);

   

    

    return (
        <div className="elementPanel">
            <div className="elementTitle">
                Fire
            </div>
            <div className="elementTokenTri">
                <div className={one > 0 ? "fire1" : "fire1Off"} />
                <div className="tokenInfo">
                    X {one}
                </div>
            </div>
            <div className="elementTokenTri">
                <div className={two > 0 ? "fire2" : "fire2Off"} />
                <div className="tokenInfo">
                    X {two}
                </div>
            </div>
            <div className="elementTokenTri">
                <div className={three > 0 ? "fire3" : "fire3Off"} />
                <div className="tokenInfo">
                    X {three}
                </div>
            </div>
            <div className="elementButtonBox">
                <button className="redeemButton">
                    Redeem
                </button>
                
            </div>
        </div>
    )
}
export default Fire