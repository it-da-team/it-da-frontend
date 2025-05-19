import React from "react";
import CompanyInfoHeader from "./CompanyInfoHeader"
import CompanyDetail from "./CompanyDetail"

// 채용공고 헤드 
// 본문
function CompanyInfoSection({ company }){
    return(
        <div>
        <CompanyInfoHeader name={company.name} />
        <div className="divider" />
        <CompanyDetail  logoUrl={company.logoUrl}/>
      </div>
    )
}

export default CompanyInfoSection