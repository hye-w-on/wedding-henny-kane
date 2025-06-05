import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import colorToken from "@/utils/colorToken";
import Letter from "@/components/Letter";
import envelope from "@/assets/images/envelope.png";
import envelopeTop from "@/assets/images/envelopeTop.png";
import envelopeInner from "@/assets/images/envelopeInner.png";
import ShowText from "@/components/showText";

const EnvelopePage = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false });
  const textRef = useRef(null);
  const isTextInView = useInView(textRef, { once: false });

  // 컨테이너의 스크롤 진행 추적
  const { scrollYProgress } = useScroll({
    target: containerRef, // 특정 컨테이너 기준
    offset: ["center center", "center end"], // 중앙 기준으로 회전 완료
  });
  // 위쪽 박스 회전 값 변환
  const topRotate = useTransform(scrollYProgress, [1, 0.1], [30, 200]);
  const smoothTopRotate = useSpring(topRotate, { stiffness: 200, damping: 15 });
  // 상단 박스 z-index 동적 변경
  const topZIndex = useTransform(scrollYProgress, [0.8, 0.5], [5, 1]);

  // 편지지 애니메이션: rotateX와 y 값 변환
  const paperRotateX = useTransform(scrollYProgress, [0.5, 0], [30, 0]);
  const paperY = useTransform(scrollYProgress, [0.5, 0], [0, -200]);

  // 부드러운 애니메이션 적용
  const smoothPaperRotateX = useSpring(paperRotateX, {
    stiffness: 200,
    damping: 20,
  });
  const smoothPaperY = useSpring(paperY, { stiffness: 200, damping: 20 });

  return (
    <div
      ref={containerRef}
      className="envelope-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "680px",
        perspective: 1000,
        scrollMargin: "20vh",
        backgroundColor: colorToken.white,
        position: "relative",
      }}
    >
      <motion.div
        style={{
          fontFamily: "PPPlayground",
          fontSize: "48px",
          color: colorToken.black,
          position: "absolute",
          top: "60px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <div style={{ letterSpacing: "-0.05em", lineHeight: "0.6em" }}>
          Let's
        </div>
        <div
          style={{
            fontFamily: "helvetica",
            fontSize: "48px",
            fontWeight: "bold",
            lineHeight: "0.5em",
            letterSpacing: "-0.05em",
          }}
        >
          Party
        </div>
        <div
          style={{
            lineHeight: "1.3em",
            fontSize: "64px",
            letterSpacing: "-0.05em",
          }}
        >
          Together
        </div>
      </motion.div>
      <div
        style={{
          fontFamily: "SUITRegular",
          fontSize: "0.8rem",
          color: "#000000aa",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "200px",
          zIndex: 2,
          gap: "2px",
        }}
        ref={textRef}
      >
        <ShowText isInView={isTextInView}>
          원활한 식사 제공을 위해 참석 인원 확인이 필요합니다
        </ShowText>
        <ShowText isInView={isTextInView} delay={0.2}>
          <b>
            <u>이명진</u>
          </b>
          {" "}또는{" "}
          <b>
            <u>윤혜원</u>
          </b>
          에게 연락부탁드립니다.
        </ShowText>
      </div>

      {/* 상단 박스 */}
      <motion.div
        style={{
          position: "absolute",
          top: "450px",
          width: "350px",
          height: "200px",
          backgroundColor: "#F2F1F0",
          clipPath: "polygon(0 0, 100% 0, 100% 50%, 50% 100%, 0 50%)",
          originY: 0, // 상단 축 기준으로 회전
          transformStyle: "preserve-3d", // 3D 유지
          marginBottom: -1, // 두 박스가 붙어 있도록 설정
          rotateX: smoothTopRotate, // 부드러운 회전 값 적용
          zIndex: topZIndex, // 동적으로 변경되는 z-index
          transform: "translateZ(1px)", // 초기 렌더링 우선순위 조정
          backgroundImage: `url(${envelopeTop})`,
          backgroundPosition: "bottom center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% auto", // 넓이에 맞춰 확대, 높이는 자동 비율
          overflow: "hidden",
        }}
      />
      {/* 중앙 박스 */}
      <motion.div
        style={{
          position: "absolute",
          top: "450px",
          width: "350px",
          height: "200px",
          backgroundColor: "#dad9d9",
          transformStyle: "preserve-3d", // 3D 유지
          originY: 0, // 상단 축 기준으로 회전
          rotateX: 30, // 부드러운 회전 값 적용
          zIndex: 1, // 상단과 하단 박스 아래로 배치
          backgroundImage: `url(${envelopeInner})`,
          backgroundPosition: "bottom center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% auto",
          overflow: "hidden",
        }}
      />
      {/* 편지지 박스 */}
      <motion.div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "460px",
          width: "330px",
          height: "200px",
          backgroundColor: "#121212", // 편지지 색상
          borderRadius: "5px", // 모서리 라운드 추가
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // 그림자 효과 추가
          transformStyle: "preserve-3d", // 3D 유지
          originY: 0, // 상단 축 기준으로 회전
          rotateX: smoothPaperRotateX,
          y: smoothPaperY,
          zIndex: 3,
        }}
      >
        <Letter />
      </motion.div>
      {/* 하단 박스 */}
      <motion.div
        style={{
          position: "absolute",
          top: "450px",
          width: "350px",
          height: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          transformStyle: "preserve-3d",
          originY: 0, // 상단 축 기준으로 회전
          rotateX: 30,
          zIndex: 10,
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            top: "0",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            backgroundColor: "#F2F1F0",
            clipPath: "polygon(20% 45%, 80% 45%, 100% 100%, 0% 100%)",
            zIndex: 11,
            backgroundImage: `url(${envelope})`,
            backgroundPosition: "bottom center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% auto",
            overflow: "hidden",
          }}
        ></motion.div>
        <motion.div
          style={{
            position: "absolute",
            top: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "#e6e5e4",
            borderRadius: "4px",
            clipPath: "polygon(0 100%, 100% 100%, 100% 20%, 50% 80%, 0 20%)",
            backgroundImage: `url(${envelope})`,
            backgroundPosition: "bottom center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% auto",
            overflow: "hidden",
            zIndex: 10,
          }}
        />
      </motion.div>
      <motion.div
        style={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          height: "200px",
          backgroundColor: colorToken.black,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      />
    </div>
  );
};

export default EnvelopePage;
