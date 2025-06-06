// src/components/MainCategory.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import MainCategoryList from "./MainCategoryList";
import { labelToEnum } from "../../utils/categoryMap";
import "../../assets/css/MainCategory.css";

import iconKindergarten from "../../assets/images/icon/iconScc-removebg-preview.png";
import iconPreschool from "../../assets/images/icon/iconDay-removebg-preview.png";
import iconCompany from "../../assets/images/icon/iconBook-removebg-preview.png";
import iconHomeTeacher from "../../assets/images/icon/iconTeature-removebg-preview.png";
import iconActivityCenter from "../../assets/images/icon/iconMusic-removebg-preview.png";
import iconCenter from "../../assets/images/icon/iconPuz-removebg-preview.png";

const categories = [
  { label: "유치원", image: iconKindergarten },
  { label: "어린이집", image: iconPreschool },
  { label: "교육 회사", image: iconCompany },
  { label: "아동 센터/학원", image: iconCenter },
  { label: "방문 교사", image: iconHomeTeacher },
  { label: "특별활동 센터", image: iconActivityCenter },
];

function MainCategory({ onCategorySelect, selected, compact = false }) {
  const navigate = useNavigate();

  return (
    <section className={`main-category ${compact ? "compact" : ""}`}>
      {!compact && <h2>어떤 기관의 공고를 찾으시나요?</h2>}
      <ul className="main-category-list-wrapper">
        {categories.map((cat, i) => (
          <li
            key={i}
            onClick={() =>
              compact
                ? onCategorySelect?.(cat.label)
                : navigate(`/recruitment?category=${labelToEnum[cat.label]}`)
            }
          >
            <MainCategoryList
              label={cat.label}
              image={cat.image}
              active={selected === cat.label}
              compact={compact}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default MainCategory;
