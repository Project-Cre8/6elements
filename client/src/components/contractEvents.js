import React, { useEffect } from 'react'

import { BaseScreen } from "./UI/baseScreen.js"
import { LoadingScreen } from "./loading/loading";

const gameAddr = "0x1a4c2648211E3A912825fE3a79a021db4E530f4f";

export function ContractEvents({ backpack,pool, linkBalance,
    web3, ready, maskAddress, elements, link,
    etherBalance, enable, hasMeta, network}) {

    const [loaded, setLoaded] = React.useState(false);

    const [changeEvent, setChangeEvent] = React.useState({})

    const [inventory, setInventory] = React.useState(backpack);

    const [prizePool, setPrizePool] = React.useState(pool);

    const [linkBal, setLinkBal] = React.useState(linkBalance);

    //Event Listeners
    

    // NOVA
    useEffect(() => {
        setLoaded(false);
        
        if (ready) {
            
            let subscriptionNova;
            
            elements.getPastEvents("allEvents", {fromBlock: 0}, (err, res) => {
                
                let currentBlock; 
                if (res.length === 0) {
                    currentBlock = 0;
                } else {
                    currentBlock = res[res.length - 1].blockNumber;
                }
                res.forEach(item => {
                    if (item.event === "Receive") {
                        // if (item.returnValues.user.toUpperCase() === maskAddress.toUpperCase()) {
                        //     dataListNova.push(item);
                        // }
                    } else if (item.event === "Redeem") {
                        // if (item.returnValues.from.toUpperCase() === maskAddress.toUpperCase() || item.returnValues.to.toUpperCase() === maskAddress.toUpperCase()) {
                        //     dataListNova.push(item);
                        // }
                    }
                    
                });
                
                setLoaded(true);
                
                subscriptionNova = elements.events.allEvents({
                    fromBlock: currentBlock + 1
                }, (errs, resi) => {
                    setLoaded(true);
                })
                .on("data", (item) => {
                    
                    console.log(item);
                    link.methods.balanceOf(gameAddr).call((error, result) => {
                        let prize = web3.utils.fromWei(result);
                        prize = parseFloat(prize).toFixed(2);
                        setPrizePool(prize);
                    });
                    link.methods.balanceOf(maskAddress).call((er, re) => {
                        let userLink = web3.utils.fromWei(re);
                        userLink = parseFloat(userLink).toFixed(2);
                        setLinkBal(userLink);
                    })
                    
                    if (item.event === "Receive" && item.returnValues.player.toUpperCase() === maskAddress.toUpperCase()) {
                        let pack = backpack;
                        if (item.returnValues.element1 === "0") {
                            if (item.returnValues.rank1 === "0") {
                                pack.fire.a += 1;
                            } else if (item.returnValues.rank1 === "1") {
                                pack.fire.b += 1;
                            } else if (item.returnValues.rank1 === "2") {
                                pack.fire.c += 1;
                            }
                            console.log(pack);
                        } else if (item.returnValues.element1 === "1") {
                            if (item.returnValues.rank1 === "0") {
                                pack.water.a += 1;
                            } else if (item.returnValues.rank1 === "1") {
                                pack.water.b += 1;
                            } else if (item.returnValues.rank1 === "2") {
                                pack.water.c += 1;
                            }
                            console.log(pack);
                        } else if (item.returnValues.element1 === "2") {
                            if (item.returnValues.rank1 === "0") {
                                pack.earth.a += 1;
                            } else if (item.returnValues.rank1 === "1") {
                                pack.earth.b += 1;
                            } else if (item.returnValues.rank1 === "2") {
                                pack.earth.c += 1;
                            }
                            console.log(pack);
                        } else if (item.returnValues.element1 === "3") {
                            if (item.returnValues.rank1 === "0") {
                                pack.wind.a += 1;
                            } else if (item.returnValues.rank1 === "1") {
                                pack.wind.b += 1;
                            } else if (item.returnValues.rank1 === "2") {
                                pack.wind.c += 1;
                            }
                            console.log(pack);
                        } else if (item.returnValues.element1 === "4") {
                            if (item.returnValues.rank1 === "0") {
                                pack.light.a += 1;
                            } else if (item.returnValues.rank1 === "1") {
                                pack.light.b += 1;
                            } 
                            console.log(pack);
                        } else if (item.returnValues.element1 === "5") {
                            if (item.returnValues.rank1 === "0") {
                                pack.dark.a += 1;
                            } else if (item.returnValues.rank1 === "1") {
                                pack.dark.b += 1;
                            } 
                            console.log(pack);
                        }  
                        
                        if (item.returnValues.element2 === "0") {
                            if (item.returnValues.rank2 === "0") {
                                pack.fire.a += 1;
                            } else if (item.returnValues.rank2 === "1") {
                                pack.fire.b += 1;
                            } else if (item.returnValues.rank2 === "2") {
                                pack.fire.c += 1;
                            }
                        } else if (item.returnValues.element2 === "1") {
                            if (item.returnValues.rank2 === "0") {
                                pack.water.a += 1;
                            } else if (item.returnValues.rank2 === "1") {
                                pack.water.b += 1;
                            } else if (item.returnValues.rank2 === "2") {
                                pack.water.c += 1;
                            }
                        } else if (item.returnValues.element2 === "2") {
                            if (item.returnValues.rank2 === "0") {
                                pack.earth.a += 1;
                            } else if (item.returnValues.rank2 === "1") {
                                pack.earth.b += 1;
                            } else if (item.returnValues.rank2 === "2") {
                                pack.earth.c += 1;
                            }
                        } else if (item.returnValues.element2 === "3") {
                            if (item.returnValues.rank2 === "0") {
                                pack.wind.a += 1;
                            } else if (item.returnValues.rank2 === "1") {
                                pack.wind.b += 1;
                            } else if (item.returnValues.rank2 === "2") {
                                pack.wind.c += 1;
                            }
                        } else if (item.returnValues.element2 === "4") {
                            if (item.returnValues.rank2 === "0") {
                                pack.light.a += 1;
                            } else if (item.returnValues.rank2 === "1") {
                                pack.light.b += 1;
                            } 
                        } else if (item.returnValues.element2 === "5") {
                            if (item.returnValues.rank2 === "0") {
                                pack.dark.a += 1;
                            } else if (item.returnValues.rank2 === "1") {
                                pack.dark.b += 1;
                            } 
                        }
                        setChangeEvent(item);
                        setInventory(pack);
                    } else if (item.event === "Redeem" && item.returnValues.player.toUpperCase() === maskAddress.toUpperCase()) {
                        let pack = backpack;
                        if(item.returnValues.element === "0") {
                            pack.fire.a -= 1;
                            pack.fire.b -= 1;
                            pack.fire.c -= 1;
                        } else if (item.returnValues.element === "1") {
                            pack.water.a -= 1;
                            pack.water.b -= 1;
                            pack.water.c -= 1;
                        } else if (item.returnValues.element === "2") {
                            pack.earth.a -= 1;
                            pack.earth.b -= 1;
                            pack.earth.c -= 1;
                        } else if (item.returnValues.element === "3") {
                            pack.wind.a -= 1;
                            pack.wind.b -= 1;
                            pack.wind.c -= 1;
                        } else if (item.returnValues.element === "4") {
                            pack.light.a -= 1;
                            pack.light.b -= 1;
                        } else if (item.returnValues.element === "5") {
                            pack.dark.a -= 1;
                            pack.dark.b -= 1;
                        }
                        setInventory(pack);
                    } 
                })
                return () => subscriptionNova.unsubscribe(() => {});
            });
            
        } else {
            setLoaded(true);
            return;
        }
    }, [elements, ready, maskAddress, network, backpack, link, web3]);

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
                backpack={inventory}
                pool={prizePool}
                change={changeEvent}
                linkBalance={linkBal}
            />      
              
        )
    } else {
        return (<LoadingScreen mark={3}/>)
    }
    
}
export default ContractEvents;