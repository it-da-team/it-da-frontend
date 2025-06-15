import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link } from "react-router-dom";  // React Router 사용 시
import "./NotFound.css";
import "../../assets/css/global.css";

export default function NotFound() {
  return (
    <div className="container">
    <div className="notfound-container">
      <div className="notfound-content">
        <DotLottieReact
         
          src="https://lottie.host/83de486d-d9ca-4bcb-9c81-e9fd4ca1e3fe/VFAmmyFH7d.lottie"
          loop
          autoplay
        />
        <h1>404</h1>
        <h2>페이지를 찾을 수 없습니다</h2>
        <Link to="/"className="btn btn-outline btn-block-sm ">
          홈으로 돌아가기
        </Link>
      </div>
    </div>
    </div>
  );
}
