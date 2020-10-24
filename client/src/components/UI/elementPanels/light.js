import React, { useEffect } from 'react';


import "../../../CSS/elements.css"


export function Light({ enable, hasMeta, 
    maskAddress, category, inventory,
    network, web3}) {
    
    
        const [one, setOne] = React.useState(0);
        const [two, setTwo] = React.useState(0);
        
        useEffect(() => {
            
            if (typeof inventory !== "undefined") {
                setOne(inventory.a);
                setTwo(inventory.b);
            }
        }, [hasMeta, inventory]);

   

    

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
                <button className="redeemButton">
                    Redeem
                </button>
            </div>
        </div>
    )
}
export default Light