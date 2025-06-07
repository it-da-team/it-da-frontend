// 지역 키워드
export const REGION_KEYWORDS = {
  SEOUL: "서울",
  GYEONGGI: "경기",
  INCHEON: "인천",
  GANGWON: "강원",
  CHUNGCHEONG: "충청",
  JEOLLA: "전라",
  GYEONGSANG: "경상",
  JEJU: "제주"
};

// 기관 유형 키워드
export const COMPANY_TYPE_KEYWORDS = {
  EDUCATION_COMPANY: "교육 회사",
  CHILDREN_CENTER: "아동 센터/학원",
  VISITING_TEACHER: "방문 교사",
  SPECIAL_ACTIVITY: "특별활동 센터",
  DAYCARE: "어린이집",
  KINDERGARTEN: "유치원"
};

// 기관 서브 유형 키워드
export const INSTITUTION_SUB_TYPE_KEYWORDS = {
  // 유치원
  PUBLIC_KINDERGARTEN: "국공립 유치원",
  PRIVATE_KINDERGARTEN: "사립 유치원",
  // 어린이집
  PUBLIC_DAYCARE: "국공립",
  PRIVATE_DAYCARE: "사립",
  HOME_DAYCARE: "가정",
  WORKPLACE_DAYCARE: "직장",
  CORPORATE_DAYCARE: "법인/단체",
  COOPERATIVE_DAYCARE: "협동",
  // 공통
  ANY: "무관"
};

// 교사 담당 키워드
export const TEACHER_DUTY_KEYWORDS = {
  MAIN_TEACHER: "정담임",
  SUB_TEACHER: "비담임",
  ASSISTANT: "보조",
  SUBSTITUTE: "대체",
  NURI_CLASS: "누리반",
  EXTENDED_CLASS: "연장반",
  AFTER_SCHOOL: "방과후",
  SUPPORT_STAFF: "조리사/차량/행정",
  NEW_TEACHER: "신입"
};

// 키워드 우선순위 정의
export const KEYWORD_PRIORITY = {
  REGION: 1,
  COMPANY_TYPE: 2,
  INSTITUTION_SUB_TYPE: 3,
  TEACHER_DUTY: 4
};

// 키워드 그룹별 배열
export const KEYWORD_GROUPS = {
  [KEYWORD_PRIORITY.REGION]: Object.values(REGION_KEYWORDS),
  [KEYWORD_PRIORITY.COMPANY_TYPE]: Object.values(COMPANY_TYPE_KEYWORDS),
  [KEYWORD_PRIORITY.INSTITUTION_SUB_TYPE]: Object.values(INSTITUTION_SUB_TYPE_KEYWORDS),
  [KEYWORD_PRIORITY.TEACHER_DUTY]: Object.values(TEACHER_DUTY_KEYWORDS)
}; 