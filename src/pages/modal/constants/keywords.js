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
  PUBLIC_DAYCARE: "국공립 어린이집",
  PRIVATE_DAYCARE: "사립 어린이집",
  HOME_DAYCARE: "가정 어린이집",
  WORKPLACE_DAYCARE: "직장 어린이집",
  CORPORATE_DAYCARE: "법인/단체 어린이집",
  COOPERATIVE_DAYCARE: "협동 어린이집",
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

// 시/도 축약명 → 풀네임 매핑
export const PROVINCE_FULLNAME_MAP = {
  "서울": "서울특별시",
  "부산": "부산광역시",
  "대구": "대구광역시",
  "인천": "인천광역시",
  "광주": "광주광역시",
  "대전": "대전광역시",
  "울산": "울산광역시",
  "세종": "세종특별자치시",
  "경기": "경기도",
  "충북": "충청북도",
  "충남": "충청남도",
  "전남": "전라남도",
  "경북": "경상북도",
  "경남": "경상남도",
  "강원": "강원특별자치도",
  "전북": "전북특별자치도",
  "제주": "제주특별자치도"
};

// 키워드 그룹별 배열
export const KEYWORD_GROUPS = {
  [KEYWORD_PRIORITY.REGION]: Object.keys(PROVINCE_FULLNAME_MAP),
  [KEYWORD_PRIORITY.COMPANY_TYPE]: Object.values(COMPANY_TYPE_KEYWORDS),
  [KEYWORD_PRIORITY.INSTITUTION_SUB_TYPE]: Object.values(INSTITUTION_SUB_TYPE_KEYWORDS),
  [KEYWORD_PRIORITY.TEACHER_DUTY]: Object.values(TEACHER_DUTY_KEYWORDS)
}; 