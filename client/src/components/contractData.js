import React, { useEffect, useCallback } from 'react'
import { ContractEvents } from "./contractEvents.js"

import { LoadingScreen } from "./loading/loading";



const gameAddr = "0x1a4c2648211E3A912825fE3a79a021db4E530f4f";

export function ContractData({ enable, hasMeta, maskAddress, network, web3, elements, link, ready }) {
    
    const [loaded, setLoaded] = React.useState(false);
    const [backpack, setBackpack] = React.useState({});
    const [prizePool, setPrizePool] = React.useState(0);
    
    const [linkBal, setLinkBal] = React.useState(0);
    
    
    useEffect(() => {
        setLoaded(false);
        setBackpack({});
        if ( maskAddress !== "" && network === "42" && typeof elements.methods !== "undefined" && hasMeta && typeof link.methods !== "undefined") {
            
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

            link.methods.balanceOf(maskAddress).call((er, re) => {
                let userLink = web3.utils.fromWei(re);
                userLink = parseFloat(userLink).toFixed(2);
                setLinkBal(userLink);
            })

            link.methods.balanceOf(gameAddr).call((e, r) => {
                let prize = web3.utils.fromWei(r);
                prize = parseFloat(prize).toFixed(2)
                setPrizePool(prize);
                elements.methods.balanceOf(maskAddress).call((err, res) => {
                
                    // Obj.regular = ethers.utils.formatUnits(res.regular, 6);
                    let tokens = res;
                    let i = 0;
                    const getTokenInfo = () => {
                        if (i >= tokens) {
                            console.log(inventory);
                            
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
            })
            
            
        } else if (!hasMeta) {
            setLoaded(true);
        }
            
        
    }, [maskAddress, network, elements, hasMeta, link, web3]);

    
    

    if (loaded) {
        return (
            <ContractEvents
                web3={web3} 
                elements={elements}
                link={link}
                ready={ready}
                maskAddress={maskAddress}
                backpack={backpack}
                enable={enable}
                hasMeta={hasMeta}
                network={network}
                pool={prizePool}
                linkBalance={linkBal}
            />
            
        )
    } else {
        return(<LoadingScreen mark={4}/>)
    }
    
}
export default ContractData;