import Countdown, { zeroPad } from "react-countdown";
import "./index.css";

export default function PPCountDown({ isPrize, generalInfo }) {
  var roundId = 0,
    betEndingTime,
    priceSetTime;
  if (generalInfo) {
    roundId = generalInfo[0];
    betEndingTime = generalInfo[1].toNumber() * 1000;
    priceSetTime = generalInfo[2].toNumber() * 1000;
  }

  const now = new Date().getTime();
  var date, completedText, extraInfo;
  if (isPrize) {
    date = betEndingTime + priceSetTime;
    completedText = "Please refresh to see the result";
    extraInfo = "The final TRX price will be set and\nthe next round will start in";
  } else {
    if (now < betEndingTime) {
      date = betEndingTime;
      completedText = "Guessing time is over";
    } else {
      extraInfo = "Guessing time is over! The final\nTRX price will be set in";
      completedText = "Please refresh to enter next round";
      date = betEndingTime + priceSetTime;
    }
  }

  const countDown = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <div className="complete-text">{completedText}</div>;
    } else {
      // Render a countdown
      return (
        <div className="count-down">
          <span className="count-down-item">{zeroPad(hours * days)}</span> :
          <span className="count-down-item">{zeroPad(minutes)}</span> :
          <span className="count-down-item">{zeroPad(seconds)}</span>
        </div>
      );
    }
  };

  return (
    <div className="count-wrapper">
      <div className="round-id">Round #{roundId}</div>
      {extraInfo && <div className="extra-info">{extraInfo}</div>}
      {date && <Countdown date={date} renderer={countDown} />}
    </div>
  );
}
