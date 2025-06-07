
/**
 * selectedKeywords 배열과 selectedCompanyTypes 값을 기반으로
 * 백엔드 DTO에 맞는 필터 객체를 반환합니다.
 */
export function extractFilterDto(selectedKeywords, selectedCompanyTypes) {
    const getValue = (prefix) => {
      const found = selectedKeywords.find(k => k.startsWith(prefix));
      return found ? found.replace(prefix, "") : null;
    };
  
    return {
      region: getValue("REGION_"),
      district: getValue("DISTRICT_"),
      category: selectedCompanyTypes[0] || null,
      companyWorkType: getValue("INSTITUTION_SUB_TYPE_"),
      dutyTypes: getValue("TEACHER_DUTY_")
    };
  }
  