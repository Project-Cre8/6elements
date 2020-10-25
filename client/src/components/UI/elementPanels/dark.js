import React, { useEffect } from 'react';


import "../../../CSS/elements.css"


export function Dark({ enable, hasMeta, 
    maskAddress, category, inventory,
    network, web3}) {
    
    
    const [one, setOne] = React.useState(0);
    const [two, setTwo] = React.useState(0);
    
    useEffect(() => {
        console.log(typeof inventory);
        if (typeof inventory !== "undefined") {
            setOne(inventory.a);
            setTwo(inventory.b);
        }
    }, [hasMeta, inventory]);

   

    

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
                <button className="redeemButton">
                    Redeem
                </button>
                
            </div>
        </div>
    )
}
export default Dark