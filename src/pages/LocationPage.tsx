import styled from "@emotion/styled";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "motion/react";
import colorToken from "../utils/colorToken";
import duration from "dayjs/plugin/duration";
import VenueMap from "../components/VenueMap";
import VenueDetailInfo from "../components/VenueDetailInfo";
import venue from "@/assets/images/venue.jpg";
import Toast from "../components/Toast";
import { useEffect, useState } from "react";
import React from "react";
import KakaoMap from "../components/KakaoMap";

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
  //backgroundColor: colorToken.black,
  display: "flex",
  flexDirection: "column",
  padding: "140px 10px",
  //margin: "10px",
  //borderRadius: "13px",
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
  zIndex: 2,
});

// 새로운 버튼 스타일 컴포넌트
const DetailButton = styled(motion.button)({
  backgroundColor: "white",
  color: colorToken.black,
  border: `1px solid ${colorToken.black}`,
  padding: "12px 24px",
  borderRadius: "30px",
  fontSize: "14px",
  fontFamily: "SUITRegular",
  cursor: "pointer",
  marginTop: "20px",
  marginBottom: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
});

// 상세 정보 컨테이너 스타일
const DetailContainer = styled(motion.div)({
  width: "100%",
  overflow: "hidden",
});

function LocationPage() {
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

  const handleCopy = async () => {
    await navigator.clipboard.writeText("서울 성북구 정릉로10길 127");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card>
        <CardBackground />
        <div style={{ zIndex: 3 }}>
          <RotatedBox>
            <img src={venue} alt="venue" />
          </RotatedBox>
          <div
            style={{
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
              fontFamily: "SUITRegular",
              fontSize: "12px",
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              lineHeight: "0.6em",
            }}
          >
            ------------ Lehans -----------
          </div>
          <div
            style={{
              width: "100%",
              marginTop: "10px",
              fontFamily: "SUITRegular",
              fontSize: "12px",
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              lineHeight: "0.6em",
            }}
          >
            서울 성북구 정릉로10길 127 르한스(한스갤러리)
            <button
              onClick={handleCopy}
              style={{
                background: "transparent",
                border: "1px solid #fff",
                color: "#fff",
                padding: "4px 8px",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "10px",
              }}
            >
              복사
            </button>
          </div>
          <div
            style={{
              margin: "20px",
              touchAction: "none",
              overflow: "hidden",
              position: "relative",
              zIndex: 1,
            }}
          >
            <KakaoMap
              address="서울 성북구 정릉로10길 127"
              markerTitle="르한스"
              width="100%"
              height="300px"
            />
          </div>
        </div>
      </Card>

      {/* 상세 정보 버튼 */}
      <DetailButton
        onClick={() => setShowDetails(!showDetails)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        주차와 셔틀버스 상세정보
        <motion.span
          animate={{ rotate: showDetails ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ▼
        </motion.span>
      </DetailButton>

      {/* 애니메이션 컨테이너 */}
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

      <Toast message="주소가 복사되었습니다" isVisible={showToast} />
    </div>
  );
}

export default LocationPage;
