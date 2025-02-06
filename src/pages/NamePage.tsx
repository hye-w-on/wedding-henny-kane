import styled from "@emotion/styled";
import { motion } from "motion/react";
import colorToken from "../utils/colorToken";
import temp3d from "@/assets/images/temp3d.png";
import mainPhoto from "@/assets/images/temp_photo.png";

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
});
const NameText = styled(motion.div)({
  fontFamily: "PPEditorialOld",
  fontSize: "1.5rem",
  color: colorToken.black,
  textShadow: `
    -2px -2px 0 #fff,  
     2px -2px 0 #fff,
    -2px  2px 0 #fff,
     2px  2px 0 #fff
  `,
});
function NamePage() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#fff",
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
          YOU'RE INVITED TO THE WEDDING OF
        </div>
      </div>
      <div
        style={{
          //border: "solid black 1px",
          height: "130px",
          width: "350px",
          position: "relative",
          overflow: "hidden",
          margin: "0 auto", // 가운데 정렬
        }}
      >
        <NameContainer
          style={{
            justifyContent: "flex-end",
            top: "0%",
          }}
        >
          <NameText
            initial={{ x: "-100%" }}
            animate={{ x: "-23%" }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
            }}
          >
            <span style={{ fontSize: "4rem", fontFamily: "PPPlayground" }}>
              L
            </span>
            EE MYEONG JIN
          </NameText>
        </NameContainer>
        <NameContainer
          style={{
            justifyContent: "flex-start",
            top: "3.1rem",
          }}
        >
          <NameText
            initial={{ x: "100%" }}
            animate={{ x: "22%" }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
            }}
          >
            <span style={{ fontSize: "3.4rem", fontFamily: "PPPlayground" }}>
              Y
            </span>
            OON HYE WON
          </NameText>
        </NameContainer>
        <NameContainer
          style={{
            justifyContent: "center",
            top: "4.7rem",
            transform: "translateY(-50%)",
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
            style={{
              fontSize: "1.8rem",
              fontFamily: "PPPlayground",
              textShadow: `
                -2px -2px 0 #fff,  
                 2px -2px 0 #fff,
                -2px  2px 0 #fff,
                 2px  2px 0 #fff
              `,
            }}
          >
            And
          </NameText>
        </NameContainer>
      </div>
      <div style={{ padding: "10px 50px" }}>
        <img src={mainPhoto} />
      </div>
      {/*      <div>
        <img src={temp3d} />
      </div> */}
    </div>
  );
}

export default NamePage;
