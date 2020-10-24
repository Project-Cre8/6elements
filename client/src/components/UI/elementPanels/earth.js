import React, { useEffect } from 'react';


import "../../../CSS/elements.css"


export function Earth({ enable, hasMeta, 
    maskAddress, category, inventory,
    network, web3}) {
    
    const [one, setOne] = React.useState(0);
    const [two, setTwo] = React.useState(0);
    const [three, setThree] = React.useState(0);

    // const [hasBox, setHasBox] = React.useState(false);
    
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
                <button className="redeemButton">
                    Redeem
                </button>
                
            </div>
        </div>
    )
}
export default Earth