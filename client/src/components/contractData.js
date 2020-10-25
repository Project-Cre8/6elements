import React, { useEffect, useCallback } from 'react'
import { BaseScreen } from "./UI/baseScreen.js"


const ethers = require("ethers");

const gameAddr = "0x70cf3e83E656500Aef55A1c685cEB6CCC86c1215";

export function ContractData({ enable, hasMeta, maskAddress, network, web3, elements, link, elementsEventChange}) {
    
    const [loaded, setLoaded] = React.useState(false);
    const [backpack, setBackpack] = React.useState({});
    const [prizePool, setPrizePool] = React.useState(0);
    
    useEffect(() => {
        
        

        if (maskAddress !== "" && network === "42" && typeof elements.methods !== "undefined" && hasMeta) {
            
            let inventory = {
                light: {
                    a: 0,
                    b: 0
                },
                earth: {
                    a: 0,
                    b: 0,
                    c: 0
                },
                fire: {
                    a: 0,
                    b: 0,
                    c: 0
                },
                water: {
                    a: 0,
                    b: 0,
                    c: 0
                },
                wind: {
                    a: 0,
                    b: 0,
                    c: 0
                },
                dark: {
                    a: 0,
                    b: 0
                }
            };

            link.methods.balanceOf(gameAddr).call((e, r) => {
                let prize = web3.utils.fromWei(r);
                console.log(prize)
                setPrizePool(prize);
            })
            
            elements.methods.balanceOf(maskAddress).call((err, res) => {
                // Obj.regular = ethers.utils.formatUnits(res.regular, 6);
                let tokens = res;
                let i = 0;
                const getTokenInfo = () => {
                    if (i >= tokens) {
                        setBackpack(inventory);
                        setLoaded(true);
                        return;
                    } else {
                        elements.methods.tokenOfOwnerByIndex(maskAddress, i).call((err, res) => {
                            elements.methods.tokenInfo(res).call((error, result) => {
                                if (result.element === "0") {
                                    if (result.rank === "0") {
                                        inventory.fire.a += 1;
                                    } else if (result.rank === "1") {
                                        inventory.fire.b += 1;
                                    } else if (result.rank === "2") {
                                        inventory.fire.c += 1;
                                    }
                                } else if (result.element === '1') {
                                    if (result.rank === "0") {
                                        inventory.water.a += 1;
                                    } else if (result.rank === "1") {
                                        inventory.water.b += 1;
                                    } else if (result.rank === "2") {
                                        inventory.water.c += 1;
                                    }
                                } else if (result.element === "2") {
                                    if (result.rank === "0") {
                                        inventory.earth.a += 1;
                                    } else if (result.rank === "1") {
                                        inventory.earth.b += 1;
                                    } else if (result.rank === "2") {
                                        inventory.earth.c += 1;
                                    }
                                } else if (result.element === "3") {
                                    if (result.rank === "0") {
                                        inventory.wind.a += 1;
                                    } else if (result.rank === "1") {
                                        inventory.wind.b += 1;
                                    } else if (result.rank === "2") {
                                        inventory.wind.c += 1;
                                    }
                                } else if (result.element === "4") {
                                    if (result.rank === "0") {
                                        inventory.light.a += 1;
                                    } else if (result.rank === "1") {
                                        inventory.light.b += 1;
                                    } 
                                } else if (result.element === "5") {
                                    if (result.rank === "0") {
                                        inventory.dark.a += 1;
                                    } else if (result.rank === "1") {
                                        inventory.dark.b += 1;
                                    } 
                                }
                                
                                i++;
                                getTokenInfo();
                            });
                        });
                    }
                }
                getTokenInfo();
            });
        } else if (hasMeta) {
            setLoaded(true);
        }
            
        
    }, [maskAddress, network, elementsEventChange]);

    

    if (loaded) {
        return (

            <BaseScreen
                enable={enable} 
                hasMeta={hasMeta}
                maskAddress={maskAddress}
                network={network}
                elements={elements}
                link={link}
                web3={web3}
                backpack={backpack}
                pool={prizePool}
                change={elementsEventChange}
            />
        )
    } else {
        return(<div> Loading </div>)
    }
    
}
export default ContractData;