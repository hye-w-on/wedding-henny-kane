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
  margin: "0.1rem",
  width: "6.2rem",
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
  fontSize: "1.6rem",
  color: colorToken.black,
  textShadow: `
    -1px -1px 0 #fff,  
     1px -1px 0 #fff,
    -1px  1px 0 #fff,
     1px  1px 0 #fff
  `,
});
function NamePage() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#fff",
        overflowY: "hidden",
        paddingTop: "45px",
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
          //backgroundColor: "black",
          height: "8rem",
          width: "22rem",
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
            animate={{ x: "-16%" }}
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
            top: "2.7rem",
          }}
        >
          <NameText
            initial={{ x: "100%" }}
            animate={{ x: "20%" }}
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
            top: "4.4rem",
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
              fontSize: "1.5rem",
              fontFamily: "PPPlayground",
              textShadow: `
                -1px -1px 0 #fff,  
                1px -1px 0 #fff,
                -1px  1px 0 #fff,
                1px  1px 0 #fff
              `,
            }}
          >
            And
          </NameText>
        </NameContainer>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={mainPhoto} style={{ width: "80%", maxWidth: "400px" }} />
      </div>
      {/*      <div>
        <img src={temp3d} />
      </div> */}
    </div>
  );
}

export default NamePage;
