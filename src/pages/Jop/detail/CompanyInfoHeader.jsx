import React from "react";

// 채용공고 헤드 
// 본문
function CompanyInfoHeader({title, companyName}){
    return(
        <div>
            <h2>{title}</h2>
            <h4>{companyName}</h4>
        </div>
    )
}

export default CompanyInfoHeader