import React from "react";
import MainCategoryList from "./MainCategoryList";
import iconKindergarten   from "../../assets/images/icon/iconScc-removebg-preview.png";
import iconPreschool      from "../../assets/images/icon/iconDay-removebg-preview.png";
import iconCompany        from "../../assets/images/icon/iconBook-removebg-preview.png";
import iconHomeTeacher    from "../../assets/images/icon/iconTeature-removebg-preview.png";
import iconActivityCenter from "../../assets/images/icon/iconMusic-removebg-preview.png";
import iconCenter         from "../../assets/images/icon/iconPuz-removebg-preview.png";

function MainCategory() {
  const categories = [
    { label: "유치원",          image: iconKindergarten },
    { label: "어린이집",        image: iconPreschool    },
    { label: "교육 회사",       image: iconCompany      },
    { label: "아동 센터/학원",  image: iconCenter       },
    { label: "방문 교사",       image: iconHomeTeacher  },
    { label: "특별활동 센터",   image: iconActivityCenter },
  ];

    return(
        <section className="main-category">
        <h2>어떤 기관의 공고를 찾으시나요?</h2>
        <ul className="main-category-list-wrapper">
          {categories.map((cat, i) => (
            <MainCategoryList 
              key={i} 
              label={cat.label} 
              image={cat.image} 
            />
          ))}
        </ul>
      </section>
    )
}

export default MainCategory