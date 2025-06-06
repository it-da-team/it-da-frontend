import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import "../../../assets/css/DailyTrafficSection.css";

function DailyTrafficSection() {
  const quotes = [
   "오늘의 작은 걸음이 내일의 큰 변화를 만든다.",

"꿈을 향한 도전은 언제나 옳다.",

"지금의 선택이 미래의 나를 만든다.",

"행복은 결과가 아니라, 그 길을 걷는 과정 속에 있다.",

"포기하지 않으면, 언젠가는 반드시 도착한다.",

"당신의 가능성은 아직 펼쳐지지 않은 미래 그 자체예요.",

"천천히 가도 괜찮아, 멈추지 않는다면.",

"행운은 준비된 사람에게 찾아온다.",

"한 번의 용기가 인생을 바꿀 수 있다.",

"내일은 오늘보다 조금 더 빛날 거예요."


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
      <div className="quote-wrapper">
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
