import "./index.css";
import { Button, Input, notification } from "antd";
import { useEffect, useState } from "react";
import PPCountDown from "../CountDown";
import TxHashLink from "../TxHashLink";
const { ethers } = require("ethers");

export default function Deposit({poolContract, generalInfo}) {
  const [guess, setGuess] = useState();
  const [bet, setBet] = useState();
  const [loading, setLoading] = useState(false);
  const [depositHash, setDepositHash] = useState();

  var roundTotal, guessingEndTime = 0;
  if (generalInfo) {
    roundTotal = generalInfo[3];
    guessingEndTime = generalInfo[1].toNumber() * 1000;
  }

  const onGuessChange = e => {
    setGuess(e.target.value);
  };

  const onBetChange = e => {
    setBet(e.target.value);
  };

  const deposit = async () => {

    if (!guess) {
      notification["error"]({
        message: "Please make your guess!",
      });
      return;
    }

    if (!bet || bet < 0.01) {
      notification["error"]({
        message: "Please deposit at minimum 5TRX to make a guess!",
      });
      return;
    }

    setLoading(true);

    const value = ethers.utils.parseUnits(bet.toString(), 6);
    const finalGuess = parseInt(guess);

    const result = await poolContract.deposit(finalGuess).send({
      callValue: value
    });

    setDepositHash(result);

    setLoading(false);
  };

  const now = new Date();
  const guessingTimeIsOver = now.getTime() > guessingEndTime;

  return (
    <div className="deposit-wrapper">
      <PPCountDown isPrize={false} generalInfo={generalInfo} />
      <div className="pool-balance">{roundTotal && ethers.utils.formatUnits(roundTotal, 6)} TRX</div>
      <div className="balance-info">IN PRIZE POOL</div>
      <div className="deposit-form">
        <Input
          addonBefore="USD"
          type="number"
          placeholder="Just guess the first 4 digits except 0 right"
          onChange={onGuessChange}
          value={guess}
        />
        <Input addonAfter="TRX" type="number" placeholder="My Bet: Minimum 5" onChange={onBetChange} value={bet} />
        <Button
          className="deposit-btn"
          type="primary"
          onClick={deposit}
          loading={loading}
          disabled={guessingTimeIsOver}
        >
          Deposit
        </Button>
        <TxHashLink hash={depositHash} />
        <a
          href="https://jojos-metaverse.gitbook.io/priceprizepool/"
          target="_blank"
          className="instructions"
          rel="noreferrer"
        >
          HOW TO PLAY?
        </a>
      </div>
    </div>
  );
}
