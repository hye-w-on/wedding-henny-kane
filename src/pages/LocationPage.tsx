import styled from "@emotion/styled";
import dayjs from "dayjs";
import { motion, AnimatePresence, useInView } from "motion/react";
import colorToken from "@/utils/colorToken";
import duration from "dayjs/plugin/duration";
import VenueDetailInfo from "@/components/VenueDetailInfo";
import venue from "@/assets/images/venue.jpg";
import Toast from "@/components/Toast";
import { useRef, useState } from "react";
import NaverMap, { NaverMapRef } from "../components/NaverMap";
import CopyIcon from "@/assets/icons/copy.svg";
import DestinationIcon from "@/assets/icons/destination.svg";
import KakaoMapIcon from "@/assets/icons/kakaomap.png";
import NaverMapIcon from "@/assets/icons/navermap.png";
import DownSvg from "@/assets/icons/down.svg?react";
import ShowText from "@/components/showText";

dayjs.extend(duration);

const RotatedBox = styled(motion.div)({
  position: "absolute",
  top: "0",
  left: "50%",
  transform: "translateX(-50%) translateY(-30%) rotate(-10deg)",
  width: "200px",
  height: "120px",
  backgroundColor: "#fff",
  border: "1px solid",
  borderColor: colorToken.black,
  zIndex: 1,
  overflow: "hidden",
});

const Card = styled(motion.div)({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "140px 10px 80px 10px",
  position: "relative",
  overflow: "visible",
  zIndex: 1,
});

const CardBackground = styled(motion.div)({
  width: "100%",
  height: "100%",
  backgroundColor: colorToken.black,
  position: "absolute",
  top: 0,
  right: 0,
  zIndex: 0,
});

// 새로운 버튼 스타일 컴포넌트
const DetailButton = styled(motion.button)({
  backgroundColor: "white",
  color: colorToken.black,
  border: `1px solid ${colorToken.black}`,
  padding: "8px 24px",
  borderRadius: "30px",
  fontSize: "0.8rem",
  fontFamily: "SUITRegular",
  cursor: "pointer",
  marginTop: "20px",
  marginBottom: "-20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "5px",
  zIndex: 2,
});

// 상세 정보 컨테이너 스타일
const DetailContainer = styled(motion.div)({
  width: "100%",
  overflow: "hidden",
  zIndex: 1,
  borderRadius: "20px",
});

const MapContainer = styled.div({
  position: "relative",
  width: "300px",
  height: "300px",
});

const MapCircleMask = styled.div({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "300px",
  height: "300px",
  borderRadius: "50%",
  overflow: "hidden",
});

const MapWrapper = styled(motion.div)({
  touchAction: "none",
  overflow: "hidden",
  position: "relative",
  zIndex: 2,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  width: "300px",
  height: "300px",
  pointerEvents: "none",
  "& > *": {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    pointerEvents: "auto",
    maskImage: "radial-gradient(circle, white 100%, transparent 100%)",
    WebkitMaskImage: "radial-gradient(circle, white 100%, transparent 100%)",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: "50%",
    boxShadow: "inset 0 0 20px 20px #121212",
    pointerEvents: "none",
    zIndex: 1,
  },
});

const BorderCircle = styled(motion.div)({
  margin: "-5px",
  position: "absolute",
  inset: 0,
  borderRadius: "50%",
  border: "10px solid",
  borderColor: colorToken.black,
  boxShadow: "inset 0 0 10px 10px #121212",
  zIndex: 3,
  pointerEvents: "none",
});

const IconButton = styled(motion.button)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "90px",
  height: "30px",
  fontFamily: "SUITRegular",
  fontSize: "0.7rem",
  padding: "4px 4px 4px 3px",
  borderRadius: "15px",
  background: colorToken.gray800,
  border: `1px solid ${colorToken.gray600}`,
  cursor: "pointer",
  color: "white",
  gap: "3px",
  "& img": {
    width: "12px",
    height: "12px",
    filter: "brightness(0) invert(1)",
    opacity: 0.6,
  },
});

function LocationPage() {
  const addressRef = useRef(null);
  const mapLinkRef = useRef(null);
  const isAddressInView = useInView(addressRef, { once: false });
  const isMapLinkInView = useInView(mapLinkRef, { once: false });

  const [showToast, setShowToast] = useState(false);
  const [showDetails, setShowDetails] = useState(false); // 상세 정보 표시 여부 상태

  const shuttleTimes = {
    before: ["17:00", "17:20", "17:40", "18:00"],
    after: ["19:30", "19:50", "20:10", "20:30"],
  };

  const getClosestTime = (times: string[]) => {
    const now = dayjs();
    const today = now.format("YYYY-MM-DD");

    const timeObjects = times.map((time) => dayjs(`${today} ${time}`));
    const futureTimeObjects = timeObjects.filter((time) => time.isAfter(now));

    if (futureTimeObjects.length > 0) {
      return futureTimeObjects[0].format("HH:mm");
    } else {
      return times[times.length - 1]; // 마지막 시간 반환
    }
  };

  const allTimes = [...shuttleTimes.before, ...shuttleTimes.after];
  const closestTime = getClosestTime(allTimes);

  const mapRef = useRef<NaverMapRef>(null);

  const handleButtonClick = () => {
    mapRef.current?.centerMap();
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText("서울 성북구 정릉로10길 127");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleKakaoMapClick = () => {
    window.open("https://kko.kakao.com/eTF_5YmNVo", "_blank");
  };

  const handleNaverMapClick = () => {
    window.open(
      "https://map.naver.com/p/entry/place/20517806?lng=126.9983456&lat=37.6041052&placePath=%2Fhome&searchType=place&c=15.00,0,0,0,dh",
      "_blank"
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card>
        <div
          style={{
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <RotatedBox>
            <img src={venue} alt="venue" />
          </RotatedBox>
          <div
            style={{
              marginTop: "10px",
              width: "100%",
              fontFamily: "PPPlayground",
              fontSize: "4rem",
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              lineHeight: "0.6em",
              // WebkitTextStroke: "1px #e67b8e",
            }}
          >
            <p
              style={{
                fontSize: "6.5rem",
              }}
            >
              L
            </p>
            ocation
          </div>
          <div
            style={{
              width: "100%",
              marginTop: "5px",
              marginBottom: "5px",
              fontFamily: "SUITRegular",
              fontSize: "0.8rem",
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              lineHeight: "0.6em",
            }}
            ref={addressRef}
          >
            <ShowText isInView={isAddressInView}>
              <div style={{ marginTop: "15px" }}>
                서울 성북구 정릉로10길 127 르한스(한스갤러리)
              </div>
            </ShowText>
            <div style={{ display: "flex", gap: "8px" }}>
              <IconButton onClick={handleCopy} whileTap={{ scale: 1.1 }}>
                <img src={CopyIcon} alt="copy" />
                주소복사
              </IconButton>
              <IconButton onClick={handleButtonClick} whileTap={{ scale: 1.1 }}>
                <img src={DestinationIcon} alt="copy" />
                지도이동
              </IconButton>
            </div>
          </div>
          <div
            style={{ position: "relative", zIndex: 2, pointerEvents: "none" }}
          >
            <BorderCircle
              animate={{
                borderWidth: ["10px", "20px", "10px"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <MapContainer>
              <MapCircleMask>
                <MapWrapper>
                  <NaverMap ref={mapRef} />
                </MapWrapper>
              </MapCircleMask>
            </MapContainer>
          </div>
          <div
            style={{ display: "flex", gap: "10px", marginTop: "10px" }}
            ref={mapLinkRef}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontFamily: "SUITRegular",
                fontSize: "0.8rem",
                color: "white",
                gap: "10px",
              }}
            >
              <motion.button
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
                onClick={handleKakaoMapClick}
                whileTap={{ scale: 1.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <img src={KakaoMapIcon} />
              </motion.button>
              <ShowText isInView={isMapLinkInView}>카카오맵으로 열기</ShowText>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontFamily: "SUITRegular",
                fontSize: "0.8rem",
                color: "white",
                gap: "10px",
              }}
            >
              <motion.button
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
                onClick={handleNaverMapClick}
                whileTap={{ scale: 1.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <img src={NaverMapIcon} />
              </motion.button>
              <ShowText isInView={isMapLinkInView} delay={0.2}>
                네이버맵으로 열기
              </ShowText>
            </div>
          </div>
        </div>
        <DetailButton
          onClick={() => setShowDetails(!showDetails)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          주차와 셔틀버스 상세정보
          <motion.span
            animate={{ rotate: showDetails ? -180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <DownSvg
              style={{
                paddingTop: "2px",
                width: "20px",
                height: "20px",
              }}
            />
          </motion.span>
        </DetailButton>
        <AnimatePresence>
          {showDetails && (
            <DetailContainer
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <VenueDetailInfo
                shuttleTimes={shuttleTimes}
                closestTime={closestTime}
              />
            </DetailContainer>
          )}
        </AnimatePresence>
        <CardBackground />
      </Card>

      <Toast message="주소가 복사되었습니다" isVisible={showToast} />
    </div>
  );
}

export default LocationPage;
