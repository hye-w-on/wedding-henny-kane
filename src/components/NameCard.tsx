import styled from "@emotion/styled";
import { color } from "chart.js/helpers";
import { motion } from "motion/react";
import colorToken from "../utils/colorToken";

const OvalContainer = styled.div({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "2px",
  width: "100px",
  height: "1.5rem",
  fontSize: "0.8rem",
  fontFamily: "helvetica",
  fontWeight: "bold",
  color: colorToken.black,
  border: "1px solid",
  borderColor: colorToken.black,
  borderRadius: "50%",
});

const NameContainer = styled(motion.div)({
  width: "100%",
  display: "flex",
  position: "absolute",
  padding: "0 10px",
});
const NameText = styled(motion.div)({
  fontFamily: "PPEditorialOldItalic",
  fontSize: "2.2rem",
  color: colorToken.black,
  //letterSpacing: "-0.05em",
  // lineHeight: "0.6em",
});
function NameCard() {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "300px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <OvalContainer>INVITATION</OvalContainer>
          <div style={{ fontSize: "0.5rem", fontFamily: "satoshi" }}>
            DEAR YOU ARE INVITED TO THE WEDDING OF
          </div>
        </div>
        <NameContainer
          style={{
            justifyContent: "flex-end",
          }}
        >
          <NameText
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
            }}
          >
            <span style={{ fontSize: "5rem", fontFamily: "PPPlayground" }}>
              Y
            </span>
            oon Hyewon
            {/* Download*/}
            {/*Yoon Hyewon*/}
          </NameText>
        </NameContainer>
        <NameContainer
          style={{
            justifyContent: "center",
            paddingTop: "4.5rem",
          }}
        >
          <NameText
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>And</span>
          </NameText>
        </NameContainer>
        <NameContainer
          style={{ justifyContent: "flex-start", paddingTop: "4rem" }}
        >
          <NameText
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
            }}
          >
            {/*  Sample */}
            <span style={{ fontSize: "6rem", fontFamily: "PPPlayground" }}>
              L
            </span>
            ee Myeongjin
            {/* Lee Myeongjin */}
          </NameText>
        </NameContainer>
      </div>
    </>
  );
}

export default NameCard;
