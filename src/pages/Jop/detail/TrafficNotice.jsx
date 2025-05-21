import React from "react";
import CountUp from "react-countup";
import "../../../assets/css/DailyTrafficSection.css";

function TrafficNotice({ time= 1,count = 10 }) {
  return (
    <div className="traffic-notice-wrapper">
    <p className="traffic-notice">
      <span className="traffic-highlight">
        {time}
      </span>
      시간 동안{" "}
      <span className="traffic-highlight">
        <CountUp start={0} end={count} duration={6} delay={0.1} />
      </span>
      명이 해당 공고를 클릭했어요
    </p>
  </div>
  );
}

export default TrafficNotice;
