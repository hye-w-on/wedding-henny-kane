import styled from "@emotion/styled";
import dayjs from "dayjs";
import { motion } from "motion/react";
import colorToken from "../utils/colorToken";
import duration from "dayjs/plugin/duration";
import VenueMap from "../components/VenueMap";
import venue from "@/assets/images/venue.jpg";

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
  height: "100vh",
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
  height: "100vh",
  backgroundColor: colorToken.black,
  position: "absolute",
  top: 0,
  right: 0,
  zIndex: 2,
});

function LocationPage() {
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
            lineHeight: "0.6em",
          }}
        >
          서울 성북구 정릉로10길 127 르한스(한스갤러리)
        </div>
        <div style={{ margin: "20px" }}>
          <VenueMap />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "10px 20px",
            //border: "1px solid #fff2",
          }}
        >
          <div>
            {/*
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
            </div>*/}
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
              예식장 발렛서비스
              <br />
              주차 공간 부족시, <br />
              제2주차장(LG 물류센터)이용
            </div>
          </div>
          <div>
            {/*
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
            </div>*/}
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
              4호선 한성대입구역 N번 출구 <br />
              {"<->"} 예식장 운행
              <br /> 17:00~22:00? 배차간격 20분
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default LocationPage;
