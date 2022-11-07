import "./index.css";
import PPCountDown from "../CountDown";
import { useState, useEffect } from "react";
import RoundInfo from "./RoundInfo";

export default function Prize({ generalInfo, poolContract }) {
  const [myWinnings, setMyWinnings] = useState([]);

  const getWinnings = async () => {
    if (generalInfo) {
      const mw  = await poolContract.myWinnings(window.tronWeb.defaultAddress.base58).call();
      setMyWinnings(mw);
    }
  }

  useEffect(() => {
    getWinnings();
  }, [generalInfo]);

  return (
    <div className="prize-page">
      <PPCountDown isPrize={true} generalInfo={generalInfo} />
      {myWinnings?.map((myWin, index) => (
        <RoundInfo key={index} index={index} myWin={myWin} poolContract={poolContract} />
      ))}
    </div>
  );
}
