import styled from "@emotion/styled";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  cubicBezier,
} from "motion/react";
import colorToken from "../utils/colorToken";
import mainPhoto from "@/assets/images/elevn_01.png";
import StarSvg from "@/assets/icons/star.svg?react";
import { useRef } from "react";

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
  lineHeight: "1em",
  color: colorToken.black,
  textShadow: `
    -1px -1px 0 #fff,  
     1px -1px 0 #fff,
    -1px  1px 0 #fff,
     1px  1px 0 #fff
  `,
});

const ProfileContainer = styled(motion.div)({
  width: "100%",
  maxWidth: "200px",
  height: "65px",
  background: "#fff",
  position: "relative",
  zIndex: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-end",
});

const ProfileTitle = styled.div({
  fontSize: "1.2rem",
  lineHeight: "0.7em",
  fontFamily: "PPPlayground",
  color: colorToken.black,
  //marginTop: "-1rem",
});

const ProfileName = styled.div({
  fontSize: "0.8rem",
  fontFamily: "KoPubDotum",
  fontWeight: "600",
});

const ProfileParents = styled.div({
  fontSize: "0.7rem",
  fontFamily: "KoPubDotum",
  fontWeight: "300",
});

const StarWrapper = styled(motion.div)({
  position: "absolute",
  width: "20px",
  height: "20px",
  zIndex: 999,
  color: colorToken.black,
});

function NamePage() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: false });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.2], {
    clamp: true,
    ease: cubicBezier(0.6, -0.05, 0.01, 0.99),
  });

  // 애니메이션 지연 시간
  const staggerDelay = 0.5;

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100vh",
        background: "#fff",
        overflowY: "visible",
        paddingTop: "45px",
        position: "relative",
      }}
    >
      <StarWrapper
        style={{
          top: "15%",
          left: "18%",
        }}
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <StarSvg width="100%" height="100%" />
      </StarWrapper>
      <StarWrapper
        style={{
          top: "20%",
          left: "90%",
        }}
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <StarSvg width="100%" height="100%" />
      </StarWrapper>
      <StarWrapper
        style={{
          top: "30%",
          left: "50%",
        }}
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <StarSvg width="100%" height="100%" />
      </StarWrapper>
      <StarWrapper
        style={{
          top: "40%",
          left: "8%",
        }}
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <StarSvg width="100%" height="100%" />
      </StarWrapper>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "10px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <OvalContainer>INVITATION</OvalContainer>
          </motion.div>
          <motion.div
            style={{ fontSize: "0.5rem", fontFamily: "satoshi" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: staggerDelay }}
          >
            YOU'RE INVITED TO THE WEDDING OF
          </motion.div>
        </div>
      </div>
      <div
        ref={ref}
        style={{
          height: "95px",
          width: "22rem",
          position: "relative",
          overflow: "hidden",
          margin: "10px auto 10px",
        }}
      >
        <NameContainer
          style={{
            justifyContent: "flex-start",
            top: "20px",
          }}
          initial={{ x: "-100%" }}
          animate={isInView ? { x: "26%" } : { x: "-100%" }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
          }}
        >
          <NameText>
            <span
              style={{
                fontSize: "4rem",
                fontFamily: "PPPlayground",
              }}
            >
              L
            </span>
            EE MYEONG JIN
          </NameText>
        </NameContainer>
        <NameContainer
          style={{
            justifyContent: "flex-end",
            top: "50px",
          }}
        >
          <NameText
            initial={{ x: "100%" }}
            animate={isInView ? { x: "-45%" } : { x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
            }}
          >
            <span
              style={{
                fontSize: "3.4rem",
                fontFamily: "PPPlayground",
              }}
            >
              Y
            </span>
            OON HYE WON
          </NameText>
        </NameContainer>
        <NameContainer
          style={{
            justifyContent: "center",
            top: "75px",
            transform: "translateY(-50%)",
          }}
        >
          <NameText
            initial={{ y: "0%", opacity: 0 }}
            animate={
              isInView ? { opacity: 1, y: "-100%" } : { opacity: 0, y: "0%" }
            }
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
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "60vh",
            height: "60vh",
            maxWidth: "1800px",
            borderRadius: "50% 50% 0 0",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <motion.img
            src={mainPhoto}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              scale: imageScale,
              transformOrigin: "center center",
            }}
          />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: "0",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              gap: "3px",
              padding: "0 10px",
            }}
          >
            <ProfileContainer style={{ borderRadius: "100% 200% 0 0" }}>
              <ProfileTitle>bride</ProfileTitle>
              <ProfileName>윤혜원</ProfileName>
              <ProfileParents>윤창기와 송영희의 딸</ProfileParents>
            </ProfileContainer>
            <ProfileContainer style={{ borderRadius: "200% 100% 0 0" }}>
              <ProfileTitle>groom</ProfileTitle>
              <ProfileName>이명진</ProfileName>
              <ProfileParents>이영길과 김영숙의 아들</ProfileParents>
            </ProfileContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NamePage;
