import React from "react";
import colorToken from "../utils/colorToken";

interface VenueDetailInfoProps {
  shuttleTimes: {
    before: string[];
    after: string[];
  };
  closestTime: string;
}

const VenueDetailInfo: React.FC<VenueDetailInfoProps> = ({
  shuttleTimes,
  closestTime,
}) => {
  const formatShuttleTime = (time: string) => {
    if (time === closestTime) {
      return (
        <span style={{ color: colorToken.red, fontWeight: "bold" }}>
          {time}
        </span>
      );
    }
    return time;
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: colorToken.white,
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          display: "flex",
          flexDirection: "column",
          padding: "30px 20px",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "helvetica",
              fontSize: "2rem",
              color: colorToken.black,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-end",
              letterSpacing: "-0.05em",
              lineHeight: "1em",
            }}
          >
            Parking
            <div
              style={{
                marginLeft: "5px",
                fontFamily: "SUITRegular",
                fontWeight: "bold",
                fontSize: "0.8rem",
                color: colorToken.black,
              }}
            >
              주차
            </div>
          </div>
          <div
            style={{
              fontFamily: "SUITRegular",
              fontSize: "0.9rem",
              color: colorToken.black,
              padding: "10px",
              lineHeight: "1.3em",
            }}
          >
            - 예식장 및 제2주차장 발렛서비스
            <br />
            - 르한스 예식장 내 70대 수용
            <br />
            - 주차 공간 부족 시, 르한스 정문 앞에서 제2주차장(LG 물류센터)으로
            가시는 경로를 안내드립니다.(300m)
            <br /> <br />
            <b>제2주차장 안내사항</b>
            <br />
            - 주차장용 셔틀을 이용하면 1-2분 내 예식장에 도착하실 수 있습니다
            <br />
            - 일찍 귀가하실 때에는 정문에 상주한 주차안내팀에 요청해주시면
            주차장용 셔틀을 이용하실 수 있습니다
            <br />
            - 예식이 끝난 후에는 제2주차장에 주차된 차량을 르한스로
            옮겨드립니다.(차량 이동 후 안내방송)
            <br />
            <br />
          </div>
        </div>
        <div>
          <div
            style={{
              fontFamily: "helvetica",
              fontSize: "2rem",
              color: colorToken.black,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-end",
              letterSpacing: "-0.05em",
              lineHeight: "1em",
            }}
          >
            Shuttle
            <div
              style={{
                fontFamily: "SUITRegular",
                fontWeight: "bold",
                fontSize: "0.8rem",
                color: colorToken.black,
                marginLeft: "5px",
              }}
            >
              셔틀버스
            </div>
          </div>
          <div
            style={{
              fontFamily: "SUITRegular",
              fontSize: "0.9rem",
              color: colorToken.black,
              padding: "10px",
              lineHeight: "1.3em",
            }}
          >
            4호선 <b>한성대입구역 6번출구</b> {"<->"} 예식장 운행 <br />
            배차간격 20분 | 17:00 ~ 18:00, 19:30 ~ 20:30 <br />
            <div style={{ paddingTop: "15px" }}>
              <b>예식 전 탑승지</b>
              <br />
              <div style={{ paddingLeft: "10px" }}>
                4호선 한성대입구역 6번출구에서 도보50m 마을버스 타는 곳<br />
                <b>운행시간</b> |{" "}
                {shuttleTimes.before.map((time, index) => (
                  <React.Fragment key={time}>
                    {formatShuttleTime(time)}
                    {index < shuttleTimes.before.length - 1 && ", "}
                  </React.Fragment>
                ))}
                <br />
              </div>
            </div>
            <div style={{ paddingTop: "5px" }}>
              <b>예식 후 탑승지</b>
              <br />
              <div style={{ paddingLeft: "10px" }}>
                예식장 르한스 입구 <br />
                <b>운행시간</b> |{" "}
                {shuttleTimes.after.map((time, index) => (
                  <React.Fragment key={time}>
                    {formatShuttleTime(time)}
                    {index < shuttleTimes.after.length - 1 && ", "}
                  </React.Fragment>
                ))}
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetailInfo;
