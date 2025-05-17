// src/pages/Jop/JopList.jsx
import React from "react";
import JopListItem from "./JopListItem";
 // 새로 만듭니다

// 예시 데이터
const allJobs = [
  { id: 1, title: "서울 A 유치원 채용", isFavorite: false },
  { id: 2, title: "부산 B 유치원 채용", isFavorite: true  },
  { id: 3, title: "대구 C 유치원 채용", isFavorite: false },
  { id: 4, title: "광주 D 유치원 채용", isFavorite: false },
];

export default function JopList({ type }) {
  const jobsToShow =
    type === "favorite"
      ? allJobs.filter(job => job.isFavorite)
      : allJobs;

  if (!jobsToShow.length) {
    return <p>표시할 공고가 없습니다.</p>;
  }

  return (
    <div className="jop-list">
      {jobsToShow.map(job => (
        <div className="jop-list-item" key={job.id}>
          <JopListItem job={job} />
        </div>
      ))}
    </div>
  );
}
