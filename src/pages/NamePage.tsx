import { useRef } from "react";
import styled from "@emotion/styled";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "motion/react";
import colorToken from "@/utils/colorToken";
import StarSvg from "@/assets/icons/star.svg?react";
import ShowText from "@/components/showText";
const CLOUDFRONT_URL = "https://d2fwec07ipx82e.cloudfront.net";

const OvalContainer = styled.div({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "0.24rem",
  padding: "0.3rem 0.7rem 0.2rem 0.7rem",
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
  fontSize: "2.3rem",
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
  width: "160px",
  height: "80px",
  background: "#ffffff",
  position: "relative",
  zIndex: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-end",
  //border: `0.5px solid rgba(0, 0, 0, 0.1)`,
  marginBottom: "-20px",
  paddingBottom: "5px",
});

const ProfileTitle = styled(motion.div)({
  fontSize: "2rem",
  lineHeight: "0.7em",
  fontFamily: "PPPlayground",
});

const ProfileName = styled(motion.div)({
  fontSize: "0.8rem",
  fontFamily: "SUITRegular",
  fontWeight: "500",
  marginBottom: "2px",
});

const ProfileParents = styled(motion.div)({
  fontSize: "0.7rem",
  fontFamily: "SUITRegular",
  color: "#121212cc",
  fontWeight: "400",
});

const StarWrapper = styled(motion.div)({
  position: "absolute",
  width: "20px",
  height: "20px",
  zIndex: 999,
  color: colorToken.black,
});

const GradientContainer = styled.div`
  position: relative;
  height: 120px;
  width: 22rem;
  overflow: hidden;
  margin: 10px auto 0px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    width: 100px;
    height: 100%;
    z-index: 2;
    pointer-events: none;
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0) 20%);
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, #fff 0%, rgba(255, 255, 255, 0) 20%);
  }
`;

function NamePage() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false });
  const nameRef = useRef(null);
  const isNameInView = useInView(nameRef, { once: false });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const baseScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.3]);
  const imageScale = useSpring(baseScale, {
    stiffness: 100,
    damping: 15,
    mass: 0.5,
    restSpeed: 0.001,
  });

  // 애니메이션 지연 시간
  const staggerDelay = 0.5;

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "white",
        overflowY: "visible",
        paddingTop: "50px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <StarWrapper
        style={{
          top: "10%",
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
          left: "48%",
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
            style={{ fontSize: "0.6rem", fontFamily: "SUITRegular" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: staggerDelay }}
          >
            <ShowText isInView={isInView}>YOU'RE</ShowText>
            <ShowText delay={0.2} isInView={isInView}>
              INVITED
            </ShowText>
            <ShowText delay={0.4} isInView={isInView}>
              TO
            </ShowText>
            <ShowText delay={0.6} isInView={isInView}>
              THE
            </ShowText>
            <ShowText delay={0.8} isInView={isInView}>
              WEDDING
            </ShowText>
            <ShowText delay={1} isInView={isInView}>
              OF
            </ShowText>
          </motion.div>
        </div>
      </div>
      <GradientContainer ref={containerRef}>
        <NameContainer
          style={{
            justifyContent: "flex-start",
            top: "23px",
          }}
          initial={{ x: "-100%" }}
          animate={isInView ? { x: "5%" } : { x: "-100%" }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
          }}
        >
          <NameText>
            <span
              style={{
                fontSize: "5rem",
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
            top: "62px",
          }}
        >
          <NameText
            initial={{ x: "100%" }}
            animate={isInView ? { x: "-5%" } : { x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
            }}
          >
            <span
              style={{
                fontSize: "4.1rem",
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
            top: "83px",
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
      </GradientContainer>
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            padding: "0 20px",
          }}
        >
          <div
            style={{
              height: "60vh",
              maxHeight: "500px",
              maxWidth: "1800px",
              borderRadius: "50%",
              overflow: "hidden",
              position: "relative",
              margin: "0 auto",
            }}
          >
            <motion.img
              src={`${CLOUDFRONT_URL}/main.webp`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                scale: imageScale,
                transformOrigin: "center center",
                position: "relative",
                zIndex: 2,
              }}
            />
          </div>
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
          ref={nameRef}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "700px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ProfileContainer
              style={{
                borderRadius: "200% 1000% 200% 200%",
                marginLeft: "20px",
                paddingRight: "15px",
              }}
            >
              <ProfileTitle>bride</ProfileTitle>
              <ProfileName>
                <ShowText delay={0.6} isInView={isNameInView}>
                  윤혜원
                </ShowText>
              </ProfileName>
              <ProfileParents>
                <ShowText isInView={isNameInView}>윤창기와</ShowText>
                <ShowText delay={0.2} isInView={isNameInView}>
                  송영희의
                </ShowText>
                <ShowText delay={0.4} noSpace isInView={isNameInView}>
                  딸
                </ShowText>
              </ProfileParents>
            </ProfileContainer>
            <ProfileContainer
              style={{
                borderRadius: "1000% 200%  200%  200%",
                marginRight: "20px",
                paddingLeft: "15px",
              }}
            >
              <ProfileTitle>groom</ProfileTitle>
              <ProfileName>
                <ShowText delay={0.6} isInView={isNameInView}>
                  이명진
                </ShowText>
              </ProfileName>
              <ProfileParents>
                <ShowText isInView={isNameInView}>이영길과</ShowText>
                <ShowText delay={0.2} isInView={isNameInView}>
                  김영숙의
                </ShowText>
                <ShowText delay={0.4} noSpace isInView={isNameInView}>
                  아들
                </ShowText>
              </ProfileParents>
            </ProfileContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NamePage;
