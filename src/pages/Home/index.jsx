import React from "react";
import MainBanner from "./MainBanner";
import MainCategory from "./MainCategory";
import "../../assets/css/global.css";
//가장 상단에 배너 이미지 넘기는 텀포넌트 


//그 아래 가로 메뉴바

// 그 아래에 문구 채용공고 
// 카테고리 박스
// 그 아래 원장님이신가요? 센터장이신가요? 
function Home(){
    return(
        <div className="home">
            <MainBanner/>
            <MainCategory/>
        </div>
    )
}

export default Home