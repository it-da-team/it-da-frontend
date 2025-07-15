import React from "react";
import CompanyInfoHeader from "./CompanyInfoHeader"
import CompanyDetail from "./CompanyDetail"

// 채용공고 헤드 
// 본문
function CompanyInfoSection({ company, isFavorite, onFavoriteToggle }){
    return(
        <div>
        <CompanyInfoHeader
            title={company.title}
            companyName={company.companyName}
            isFavorite={isFavorite}
            onFavoriteToggle={onFavoriteToggle}
        />
        <div className="divider" />
        <CompanyDetail company={company} />
      </div>
    )
}

export default CompanyInfoSection