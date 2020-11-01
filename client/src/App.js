import React, { useEffect } from "react";
import { Web3Base } from "./components/web3Base.js"
import { LoadingScreen } from "./components/loading/loading";

import "./App.css";

function App() {
  const [hasMeta, setHasMeta] = React.useState(false);
  const [maskAddress, setMaskAddress] = React.useState("");
  const [network, setNetwork] = React.useState("");
  const [loaded, setLoaded] = React.useState(false);

  useEffect(() => {
    setLoaded(false);
    
    if (window.ethereum) {
      setNetwork(window.ethereum.networkVersion);
      if (
        typeof window.ethereum.selectedAddress === "string" ||
        window.ethereum.selectedAddress instanceof String
      ) {
        
        setMaskAddress(window.ethereum.selectedAddress);
      }
      setHasMeta(true);
      setLoaded(true);
    } else {
      setHasMeta(false);
      setLoaded(true);
    }
  }, [maskAddress]);

  useEffect(() => {  // When Metamask finally deprecates, we can add network to this loop. Or maybe there will be an event to listen to.
    const address = setInterval(() => {
      if (hasMeta) {
          if (window.ethereum.selectedAddress !== maskAddress) {
              if (window.ethereum.selectedAddress !== null) {
                  setMaskAddress(window.ethereum.selectedAddress);
              } else {
                  setMaskAddress("");
              }
              setLoaded(true);
          }
      }
    }, 1000)
    return () => clearInterval(address);
  });

  const unlockMask = () => {
    window.ethereum.enable().then((acc) => {
      setMaskAddress(acc[0]);
    });
  };
  if (loaded) {
    return (
      
      <Web3Base
          network={network}
          maskAddress={maskAddress}
          hasMeta={hasMeta}
          
      />
    );
  } else {
    return <LoadingScreen mark={1}/>; // Do loading screen here. ACTUALLY DO IT THIS TIME
  }
}

export default App;
