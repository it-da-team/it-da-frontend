// CategoryTypes - 메인 카테고리
export const CategoryTypes = {
  KINDERGARTEN: "유치원",
  DAYCARE: "어린이집",
  EDUCATION_COMPANY: "교육 회사",
  CHILD_CENTER: "아동 센터/학원",
  HOME_VISIT_TEACHER: "방문 교사",
  SPECIAL_ACTIVITY: "특별활동 센터"
};

// SubType - 기관별 서브 타입
export const SubType = {
  // 유치원 서브 타입
  KINDERGARTEN: {
    NATIONAL: "국공립 유치원",
    PRIVATE: "사립 유치원"
  },
  // 어린이집 서브 타입
  DAYCARE: {
    NATIONAL: "국공립 어린이집",
    PUBLIC: "인교 어린이집",
    PRIVATE: "가정 어린이집",
    LEGAL_ENTITY: "법인·단체 어린이집",
    COOPERATIVE: "협동 어린이집",
    WORKPLACE: "직장 어린이집"
  },
  // 교육 회사 서브 타입
  EDUCATION_COMPANY: {
    PUBLISHING: "교육 출판사",
    ONLINE_EDU_PLATFORM: "온라인 교육 플랫폼",
    CURRICULUM_PROVIDER: "커리큘럼 개발사",
    TEACHER_TRAINING: "교사 연수/양성 기관",
    FRANCHISE_ACADEMY: "프랜차이즈 학원 본사",
    ETC: "기타"
  },
  // 아동 센터/학원 서브 타입
  CHILD_CENTER: {
    PLAY_CENTER: "놀이 센터",
    LANGUAGE_CENTER: "언어 발달 센터",
    COUNSELING_CENTER: "심리 상담/치료 센터",
    ART_ACADEMY: "미술 학원",
    MUSIC_ACADEMY: "음악 학원",
    PHYSICAL_CENTER: "체육/발달 운동 센터",
    INTEGRATED_CARE: "통합 돌봄 센터",
    ETC: "기타"
  },
  // 방문 교사 서브 타입
  HOME_VISIT_TEACHER: {
    ART: "미술 방문 교사",
    MUSIC: "음악 방문 교사",
    PHYSICAL: "체육 방문 교사",
    ENGLISH: "영어 방문 교사",
    CARE: "놀이/돌봄 교사",
    SPECIAL_EDU: "특수교육 방문 교사",
    SPEECH: "언어치료 방문 교사",
    ETC: "기타"
  },
  // 특별활동 센터 서브 타입
  SPECIAL_ACTIVITY: {
    MUSIC: "음악",
    ART: "미술",
    PHYSICAL: "체육",
    LANGUAGE: "영어",
    CODING: "코딩",
    ETC: "기타"
  }
};

// DutyType - 교사 직무 타입
export const DutyType = {
  HOMEROOM: "담임 교사",
  ASSISTANT: "담임 보조 교사",
  SUBSTITUTE: "대체 교사",
  SUPPORT: "보조 교사",
  NUTRITION: "누리반 교사",
  INFANT: "연장반 교사",
  SPECIAL_NEEDS: "방과후 교사",
  COOKING: "조리사 선생님",
  SPECIAL_EDU: "보건 교사",
  PHYSICAL: "행정 교사",
  NEW: "신입 교사",
  GENERAL: "무관",
  ETC: "기타"
};

export const JobStatus = {
  LATEST: "최신 공고",
  CLOSED: "마감",
  ALWAYS: "상시채용",
};

// 역방향 매핑을 위한 유틸리티 함수
export const getSubTypeByValue = (category, value) => {
  const subTypes = SubType[category];
  if (!subTypes) return null;
  
  return Object.entries(subTypes).find(([_, label]) => label === value)?.[0] || null;
};

export const getCategoryByValue = (value) => {
  return Object.entries(CategoryTypes).find(([_, label]) => label === value)?.[0] || null;
};

export const getDutyTypeByValue = (value) => {
  return Object.entries(DutyType).find(([_, label]) => label === value)?.[0] || null;
}; 