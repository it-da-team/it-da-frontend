// src/pages/Jop/JopList.jsx
import React from "react";
import JopListItem from "./JopListItem";
import allJobsDate from"../../data/jobsItemList.json";

export default function JopList({ type }) {

  // type === "favorite" 면 찜한 것만, 아니면 전체
  const jobsToShow =
    type === "favorite"
      ? allJobsDate.filter(job => job.isFavorite)
      : allJobsDate;

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
