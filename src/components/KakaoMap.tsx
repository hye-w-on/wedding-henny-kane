import React, { useEffect, useRef } from "react";

interface KakaoMapProps {
  address?: string;
  markerTitle?: string;
  level?: number;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

const KakaoMap: React.FC<KakaoMapProps> = ({
  address = "서울 성북구 정릉로10길 127",
  markerTitle = "르한스",
  width = "500px",
  height = "500px",
  style = {},
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_API_KEY
    }&libraries=services&autoload=false`;

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (!mapRef.current) return;

        // 지도 생성
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
          draggable: true, // 이것만으로는 충분하지 않을 수 있음
        };

        const map = new window.kakao.maps.Map(mapRef.current, mapOption);

        // 드래그 기능 명시적으로 활성화
        setTimeout(() => {
          map.setDraggable(true);
          console.log("Draggable set to true");
        }, 500);

        mapInstanceRef.current = map;

        // 주소-좌표 변환 객체 생성
        const geocoder = new window.kakao.maps.services.Geocoder();

        // 주소로 좌표 검색
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        geocoder.addressSearch(address, (result: any, status: any) => {
          // 정상적으로 검색이 완료됐으면
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(
              result[0].y,
              result[0].x
            );

            console.log("찾은 좌표:", result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시
            const marker = new window.kakao.maps.Marker({
              map: map,
              position: coords,
            });

            // 인포윈도우로 장소에 대한 설명 표시
            const infowindow = new window.kakao.maps.InfoWindow({
              content: `<div style="width:150px;text-align:center;padding:6px 0;">${markerTitle}</div>`,
            });
            infowindow.open(map, marker);

            // 지도 중심을 검색 결과 위치로 이동
            map.setCenter(coords);
            map.setZoomable(true);
          } else {
            console.error("주소 검색 실패:", status);
          }
        });
      });
    };

    document.head.appendChild(script);

    // 모바일 터치 이벤트 핸들러
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        e.preventDefault(); // 기본 스크롤 동작 방지
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        e.preventDefault();
      }
    };

    // 지도 컨테이너에 터치 이벤트 리스너 추가
    const mapContainer = mapRef.current;
    if (mapContainer) {
      mapContainer.addEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
      mapContainer.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
    }

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      mapInstanceRef.current = null;

      // 이벤트 리스너 정리
      if (mapContainer) {
        mapContainer.removeEventListener("touchstart", handleTouchStart);
        mapContainer.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, [address, markerTitle]);

  return (
    <div
      id="kakao-map"
      ref={mapRef}
      style={{
        width,
        height,
        ...style,
        position: "relative",
        zIndex: 10,
        touchAction: "manipulation",
      }}
      onClick={(e) => e.stopPropagation()}
    />
  );
};

export default KakaoMap;
