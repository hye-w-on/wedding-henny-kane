import styled from "@emotion/styled";
import dayjs from "dayjs";
import { motion } from "motion/react";
import colorToken from "../utils/colorToken";
import duration from "dayjs/plugin/duration";
import VenueMap from "./VenueMap";
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
  backgroundColor: colorToken.black,
  display: "flex",
  flexDirection: "column",
  padding: "140px 10px",
  //margin: "10px",
  //borderRadius: "13px",
  position: "relative",
  overflow: "visible",
});

function LocationCard() {
  return (
    <Card>
      <RotatedBox>
        <img src={venue} alt="venue" />
      </RotatedBox>
      <div
        style={{
          width: "100%",
          fontFamily: "PPPlayground",
          fontSize: "4rem",
          color: "#F2BBC5",
          display: "flex",
          justifyContent: "center",
          lineHeight: "0.6em",
          WebkitTextStroke: "1px #e67b8e",
        }}
      >
        <p
          style={{
            fontSize: "6.5rem",
            WebkitTextStroke: "1px #e67b8e",
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
          justifyContent: "space-between",
          fontFamily: "PPEditorialNew",
          fontSize: "2rem",
          lineHeight: "0.6em",
          color: "#F2BBC5",
        }}
      >
        <div>
          Parking
          <br />
          <p
            style={{
              fontFamily: "SUITRegular",
              fontSize: "0.8rem",
              color: "#fff",
            }}
          >
            주차
          </p>
        </div>
        <div>
          Shuttle
          <br />
          <p
            style={{
              fontFamily: "SUITRegular",
              fontSize: "0.8rem",
              color: "#fff",
            }}
          >
            셔틀버스
          </p>
        </div>
      </div>
    </Card>
  );
}

export default LocationCard;
