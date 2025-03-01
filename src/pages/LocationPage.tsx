import styled from "@emotion/styled";
import dayjs from "dayjs";
import { motion } from "motion/react";
import colorToken from "../utils/colorToken";
import duration from "dayjs/plugin/duration";
import VenueMap from "../components/VenueMap";
import venue from "@/assets/images/venue.jpg";
import Toast from "../components/Toast";
import { useEffect, useState } from "react";
import React from "react";

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
  height: "1000px",
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
  height:"100%",
  backgroundColor: colorToken.black,
  position: "absolute",
  top: 0,
  right: 0,
  zIndex: 2,
});

function LocationPage() {
  const [showToast, setShowToast] = useState(false);

  const shuttleTimes = {
    before: ["17:00", "17:20", "17:40", "18:00"],
    after: ["19:30", "19:50", "20:10", "20:30"]
  };

  const getClosestTime = (times: string[]) => {
    const now = dayjs();
    const today = now.format("YYYY-MM-DD");
    
    const timeObjects = times.map(time => dayjs(`${today} ${time}`));
    const futureTimeObjects = timeObjects.filter(time => time.isAfter(now));

    if (futureTimeObjects.length > 0) {
      return futureTimeObjects[0].format("HH:mm");
    } else {
      return times[times.length - 1]; // 마지막 시간 반환
    }
  };

  const allTimes = [...shuttleTimes.before, ...shuttleTimes.after];
  const closestTime = getClosestTime(allTimes);

  const formatShuttleTime = (time: string) => {
    if (time === closestTime) {
      return <span style={{ color: "#e67b8e", fontWeight: "bold" }}>{time}</span>;
    }
    return time;
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText("서울 성북구 정릉로10길 127");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
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
        <div style={{ margin: "20px" }}>
          <VenueMap />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px 20px",
            //border: "1px solid #fff2",
          }}
        >
          <div>
            {
            <div
              style={{
                fontFamily: "PPPlayground",
                fontSize: "4rem",
                color: "#F2BBC5",
                display: "flex",
                justifyContent: "flex-start",
                lineHeight: "0.6em",
                WebkitTextStroke: "1px #e67b8e",
              }}
            >
              Parking
            </div>}
            <div
              style={{
                fontFamily: "SUITRegular",
                fontWeight: "bold",
                fontSize: "0.8rem",
                color: "#fff",
              }}
            >
              주차
            </div>
            <div
              style={{
                fontFamily: "SUITRegular",
                fontSize: "0.8rem",
                color: "#fff",
              }}
            >
              예식장 및 제2주차장 발렛서비스<br />
              르한스 예식장 내 70대 수용<br /> 
              주차 공간 부족 시, 르한스 정문에서 제2주차장(LG 물류센터)으로 가시는 경로를 안내드립니다.(300m)<br />
              <b>제2주차장 안내사항</b><br />
              주차장용 셔틀을 이용하면 1-2분 내 예식장에 도착하실 수 있습니다<br />
              일찍 귀가하실 때에는 주차장용 셔틀을 이용하실 수 있습니다<br />
              정문에 상주해 있는 주차안내팀에 요청해주세요<br />
              예식이 끝난 후에는 제2주차장에 주차된 차량을 르한스로 옮겨드립니다.(이동 후 안내방송)<br />
              <br />
              <br />
            </div>
          </div>
          <div>
            <div
              style={{
                fontFamily: "PPPlayground",
                fontSize: "4rem",
                color: "#F2BBC5",
                display: "flex",
                justifyContent: "flex-start",
                lineHeight: "0.6em",
                WebkitTextStroke: "1px #e67b8e",
              }}
            >
              Shuttle
            </div>
            <div
              style={{
                fontFamily: "SUITRegular",
                fontWeight: "bold",
                fontSize: "0.8rem",
                color: "#fff",
              }}
            >
              셔틀버스
            </div>
            <div
              style={{
                fontFamily: "SUITRegular",
                fontSize: "0.8rem",
                color: "#fff",
              }}
            >
              4호선 한성대입구역 6번출구 {"<->"} 예식장 운행 <br/>
              배차간격 20분 | 17:00 ~ 20:30 <br />
              <div style={{paddingTop:"5px"}}>
             <b><span style={{ color: "#e67b8e" }}>예식 전</span> 탑승지</b><br />
             <div style={{paddingLeft:"10px"}}>
             4호선 한성대입구역 6번출구에서 도보50m 마을버스 타는 곳<br />
             <b>운행시간</b> | {shuttleTimes.before.map((time, index) => (
               <React.Fragment key={time}>
                 {formatShuttleTime(time)}
                 {index < shuttleTimes.before.length - 1 && ", "}
               </React.Fragment>
             ))} <br /> 
             </div>
             </div>
             <div style={{paddingTop:"5px"}}>
              <b><span style={{ color: "#e67b8e" }}>예식 후</span> 탑승지</b><br />    
              <div style={{paddingLeft:"10px"}}>
              예식장 르한스 입구  <br /> 
              <b>운행시간</b> | {shuttleTimes.after.map((time, index) => (
                <React.Fragment key={time}>
                  {formatShuttleTime(time)}
                  {index < shuttleTimes.after.length - 1 && ", "}
                </React.Fragment>
              ))} <br /> 
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>    
        <Toast message="주소가 복사되었습니다" isVisible={showToast} />
    </Card>
  );
}

export default LocationPage;
