// src/pages/Jop/Jop.jsx
import React from "react";
import { useSearchParams } from "react-router-dom";
import { enumToLabel } from "../../utils/categoryMap";
import Map from "./Map";
import MainJopList from "./MainJopList";

function Jop() {
  const [searchParams] = useSearchParams();
  const categoryEnum = searchParams.get("category") ?? "KINDERGARTEN";

  console.log("🚀 categoryEnum:", categoryEnum);
  const label = enumToLabel[categoryEnum] ?? "유치원";

  return (
    <div className="main-container">
      <Map label={label} />
      <MainJopList categoryEnum={categoryEnum} />
    </div>
  );
}

export default Jop;
