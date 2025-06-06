import React, { useEffect, useRef } from "react";

function SearchMap({ latitude = 37.5665, longitude = 126.9780, level = 3 }) {
  const mapContainer = useRef(null);

  useEffect(() => {
    console.log("🔍 [SearchMap] useEffect 시작", mapContainer.current);
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        console.log("✅ [SearchMap] kakao.maps.load 콜백");
        const map = new window.kakao.maps.Map(mapContainer.current, {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level,
        });
        console.log("✅ [SearchMap] Map 객체 생성:", map);
        new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(latitude, longitude),
          map,
        });
      });
    }
  }, [latitude, longitude, level]);

  return (
    <div
      ref={mapContainer}
      style={{ width: "100%", height: "400px", background: "#eee" }}
    />
  );
}

export default SearchMap;
