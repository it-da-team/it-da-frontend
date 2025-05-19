import React from "react";

function TrafficNotice({ time = 60, count = 10 }) {
  return (
    <h4>{`${time}분 동안 ${count}명이 해당 공고를 클릭했어요`}</h4>
  );
}

export default TrafficNotice;
