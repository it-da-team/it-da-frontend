import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRecruitmentDetail } from "../../api/recruitment/recruitmentApi";

function SearchMap({ latitude = 37.5665, longitude = 126.9780, level = 3, markers = [] }) {
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // 카카오맵 스크립트 로드
  useEffect(() => {
    const loadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        setIsScriptLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false`;
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(() => {
          setIsScriptLoaded(true);
        });
      };
      document.head.appendChild(script);
    };

    loadKakaoMap();
  }, []);

  // 지도 초기화 및 마커 생성
  useEffect(() => {
    if (!isScriptLoaded || !mapRef.current) return;

    console.log('마커 데이터:', markers);

    const container = mapRef.current;
    const options = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: level
    };

    const map = new window.kakao.maps.Map(container, options);

    // 마커 생성 및 이벤트 처리
    markers.forEach(marker => {
      console.log('개별 마커 데이터:', marker);

      const position = new window.kakao.maps.LatLng(marker.latitude, marker.longitude);
      const newMarker = new window.kakao.maps.Marker({
        position: position,
        map: map
      });

      const companyName = marker.companyName || '회사명 없음';
      const fullAddress = marker.fullAddress || '주소 정보 없음';
      const recruitmentId = marker.recruitmentIdHash;

      console.log('마커 정보:', { companyName, fullAddress, recruitmentId });

      const infowindow = new window.kakao.maps.InfoWindow({
        content: `
          <div style="padding:8px;font-size:13px;min-width:150px;background:#fff;border-radius:4px;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
            <div style="position:relative;">
              <div style="font-weight:bold;margin-bottom:4px;color:#333;font-size:14px;padding-right:20px;">${companyName}</div>
              <button 
                onclick="window.closeInfoWindow_${recruitmentId}()"
                style="
                  position:absolute;
                  top:0;
                  right:0;
                  background:none;
                  border:none;
                  color:#999;
                  font-size:16px;
                  cursor:pointer;
                  padding:0;
                  line-height:1;
                "
              >×</button>
            </div>
            <div style="color:#666;font-size:12px;border-top:1px solid #eee;padding-top:4px;margin-bottom:8px;">${fullAddress}</div>
            <button 
              onclick="window.handleDetailClick_${recruitmentId}()"
              style="
                width: 100%;
                padding: 8px 16px;
                background-color: #FF6F00;
                color: white;
                border: none;
                border-radius: 4px;
                font-size: 0.9em;
                cursor: pointer;
                transition: background-color 0.3s;
              "
              onmouseover="this.style.backgroundColor='#FF6F00'"
              onmouseout="this.style.backgroundColor='#FF6F00'"
            >
              채용공고 보러가기
            </button>
          </div>
        `,
        removable: true
      });

      // 버튼 클릭 이벤트를 위한 함수
      const handleDetailClick = async () => {
        if (recruitmentId) {
          try {
            const detailData = await fetchRecruitmentDetail(recruitmentId);
            console.log('상세 정보 조회 성공:', detailData);
            navigate(`/recruitment/detail/${recruitmentId}`);
          } catch (error) {
            console.error('상세 정보 조회 실패:', error);
          }
        }
      };

      // 인포윈도우 닫기 함수
      const closeInfoWindow = () => {
        console.log('인포윈도우 닫기:', companyName);
        infowindow.close();
      };

      // 전역 함수로 핸들러 등록
      window[`handleDetailClick_${recruitmentId}`] = handleDetailClick;
      window[`closeInfoWindow_${recruitmentId}`] = closeInfoWindow;

      // 클릭 이벤트 리스너 등록
      window.kakao.maps.event.addListener(newMarker, 'click', function() {
        infowindow.open(map, newMarker);
      });
    });

    // 마커가 있으면 해당 위치로 지도 이동
    if (markers.length > 0) {
      const bounds = new window.kakao.maps.LatLngBounds();
      markers.forEach(({ latitude, longitude }) => {
        bounds.extend(new window.kakao.maps.LatLng(latitude, longitude));
      });
      map.setBounds(bounds);
    }
  }, [isScriptLoaded, markers, navigate, latitude, longitude, level]);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "400px", background: "#eee" }}
    />
  );
}

export default SearchMap;

