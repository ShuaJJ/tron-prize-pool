import { Button, Col, Divider, Row } from "antd";
import { useState, useEffect } from "react";
import PPCountDown from "../CountDown";
import TxHashLink from "../TxHashLink";
import "./index.css";
const { ethers } = require("ethers");

export default function RoundInfo({ index, myWin, poolContract }) {
  const [claimHash, setClaimHash] = useState();
  const [roundInfo, setRoundInfo] = useState();

  const getRoundInfo = async () => {
    const ri = await poolContract.roundRingBuffer(index).call();;
    setRoundInfo(ri);
  }

  useEffect(() => {
    getRoundInfo();
  });



  var ethPrice, roundId, roundTotal, winningTotal;
  if (roundInfo) {
    roundId = roundInfo[0];
    ethPrice = roundInfo[1];
    roundTotal = ethers.utils.formatUnits(roundInfo[2], 6);
    winningTotal = ethers.utils.formatUnits(myWin, 6);
  }

  const [loading, setLoading] = useState(false);

  const check = async () => {
    setLoading(true);
    const result = await poolContract.claim(roundId).send({});
    setLoading(false);
  };

  if (!roundId || roundId == 0 || ethPrice == 0) {
    return <></>;
  }

  return (
    <div className="prize-wrapper">
      <Row className="info-row">
        <Col className="info-col" flex="180px">
          Round
        </Col>
        <Col flex="auto">{roundId}</Col>
      </Row>
      <Row className="info-row">
        <Col className="info-col" flex="180px">
          Final TRX Price
        </Col>
        <Col flex="auto">${ethPrice / 10**5}</Col>
      </Row>
      <Row className="info-row">
        <Col className="info-col" flex="180px">
          Round Total Deposit
        </Col>
        <Col flex="auto">{roundTotal} TRX</Col>
      </Row>
      <Row className="info-row">
        <Col className="info-col" flex="230px">
          My Prize(In last 7 rounds)
        </Col>
        <Col flex="auto">{winningTotal} TRX</Col>
      </Row>
      {winningTotal > 0 && (
        <div className="claim-info">
          Please claim your prizes as soon as possible. The contract will hold it for 7 rounds. After that, the prize
          will be gone!
        </div>
      )}
      {winningTotal > 0 && (
        <Button className="check-btn" type="primary" onClick={check} loading={loading}>
          Claim
        </Button>
      )}
      <TxHashLink hash={claimHash} />
      <Divider />
    </div>
  );
}
