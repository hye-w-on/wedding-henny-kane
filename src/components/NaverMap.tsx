import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import flagIcon from "@/assets/icons/flag.svg";

declare global {
  interface Window {
    naver: any;
  }
}

const MapContainer = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "380px",
  height: "380px",
});

interface NaverMapProps {
  latitude?: number;
  longitude?: number;
  clientId?: string;
}

let mapInstance: any = null;

const loadScript = (src: string, callback: () => void) => {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = src;
  script.onload = () => callback();
  document.head.appendChild(script);
};

const NaverMap = ({
  latitude = 37.604132,
  longitude = 126.9985232,
  clientId = "y1urqp9vxv",
}: NaverMapProps) => {
  const [isMapLoaded, setMapLoaded] = useState(false);

  const initMap = () => {
    if (!document.getElementById("map")) return;

    const mapOptions = {
      zoomControl: true,
      zoomControlOptions: {
        style: window.naver.maps.ZoomControlStyle.SMALL,
        position: window.naver.maps.Position.TOP_RIGHT,
      },
      center: new window.naver.maps.LatLng(latitude, longitude),
      zoom: 16,
    };
    mapInstance = new window.naver.maps.Map("map", mapOptions);

    // 마커
    const marker = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(latitude, longitude),
      map: mapInstance,
      icon: {
        url: flagIcon,
        size: new window.naver.maps.Size(35, 35),
        scaledSize: new window.naver.maps.Size(35, 35),
        origin: new window.naver.maps.Point(0, 0),
        anchor: new window.naver.maps.Point(13, 39),
      },
    });

    // 마커 클릭 이벤트
    window.naver.maps.Event.addListener(marker, "click", () => {
      mapInstance?.setCenter(new window.naver.maps.LatLng(latitude, longitude));
      mapInstance?.setZoom(16);
    });

    setMapLoaded(true);
  };

  useEffect(() => {
    if (typeof window.naver === "undefined") {
      loadScript(
        `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`,
        initMap
      );
    } else {
      initMap();
    }

    return () => {
      mapInstance = null;
    };
  }, [latitude, longitude, clientId]);

  return (
    <MapContainer>
      <div id="map" style={{ width: "100%", height: "100%" }} />
    </MapContainer>
  );
};

export default NaverMap;
