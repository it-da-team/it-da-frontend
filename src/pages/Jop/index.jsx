import React from "react";
import Map from "./Map.jsx";
import MainJopList from "./MainJopList.jsx";
import { useLocation } from "react-router-dom";
// map component 

//Jop List component
// - 검색 컴포넌트 
// - 리스트 컴포넌트 
//   -  리스트 아이템 컴포넌트 


function Jop(){
    const { state } = useLocation();
    const label = state?.label ?? "전체"; 

    return(
        <div>
            <div>
             <Map label={label} />
            </div>
            <div >
            <MainJopList/>
            </div>
        </div>
    )
}

export default Jop