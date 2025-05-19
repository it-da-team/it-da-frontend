import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TrafficNotice from "./TrafficNotice"
import "../../../assets/css/DailyTrafficSection.css";

function DailyTrafficSection() {
  const quotes = [
    "목표는 세우는 순간부터 미루기 시작하는 것이다",
    "새해 목표는 작년 목표를 올해 안에 꼭 이루는 것!",
    "목표는 높은데, 침대가 너무 낮아서 못 일어나겠다.",
    "작심삼일도 열 번 하면 한 달이다.",
    "계획 없는 목표는 그냥 소원일 뿐이다. 그래서 나는 매년 소원을 빈다.",
  ];

  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true); // 애니메이션 타이밍 컨트롤

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false); // 현재 문장 사라지기 시작

      setTimeout(() => {
        // 인덱스 증가 + 다음 문장 보여주기
        setIndex((prev) => (prev + 1) % quotes.length);
        setShow(true);
      }, 600); // 애니메이션 길이와 일치 (exit 시간)
    }, 10000); // 10초마다

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="traffic-section">
      <TrafficNotice/>
      <div
        className="quote-wrapper"
      >
        <AnimatePresence mode="wait">
          {show && (
            <motion.div
              key={index}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="quote-text"
            >
              {quotes[index]}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default DailyTrafficSection;
