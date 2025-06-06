import React from "react";
import CompanyInfoHeader from "./CompanyInfoHeader"
import CompanyDetail from "./CompanyDetail"

// 채용공고 헤드 
// 본문
function CompanyInfoSection({ company }){
    return(
        <div>
        <CompanyInfoHeader
        title={company.title}
        companyName={company.companyName} />

        <div className="divider" />
        <CompanyDetail  
        logoUrl={company.imgUrl}
        description={company.description}
        companyUrl={company.siteUrl}/>
      </div>
    )
}

export default CompanyInfoSection