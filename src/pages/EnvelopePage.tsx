import styled from "@emotion/styled";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import colorToken from "../utils/colorToken";
import Letter from "../components/Letter";
const EnvelopePage = () => {
  const containerRef = useRef(null); // 특정 컨테이너 참조

  // 컨테이너의 스크롤 진행 추적
  const { scrollYProgress } = useScroll({
    target: containerRef, // 특정 컨테이너 기준
    offset: ["center center", "center end"], // 중앙 기준으로 회전 완료
  });

  // 위쪽 박스 회전 값 변환
  const topRotate = useTransform(scrollYProgress, [1, 0.5], [40, 200]);
  const smoothTopRotate = useSpring(topRotate, { stiffness: 200, damping: 15 });
  // 상단 박스 z-index 동적 변경
  const topZIndex = useTransform(scrollYProgress, [0.8, 0.5], [5, 1]); // 0.5 이전: 3(위), 이후: 1(아래)

  // 편지지 애니메이션: rotateX와 y 값 변환
  const paperRotateX = useTransform(scrollYProgress, [0.5, 0], [40, 0]);
  const paperY = useTransform(scrollYProgress, [0.5, 0], [0, -220]);
  // 부드러운 애니메이션 적용
  const smoothPaperRotateX = useSpring(paperRotateX, {
    stiffness: 200,
    damping: 20,
  });
  const smoothPaperY = useSpring(paperY, { stiffness: 200, damping: 20 });

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // 특정 컨테이너 높이
        paddingTop: "150px",
        perspective: 1000, // 3D 깊이 설정
        //background: "#000",
      }}
    >
      <div
        style={{
          fontFamily: "PPPlayground",
          fontSize: "3rem",
          color: colorToken.black,
          position: "absolute",
          top: "90px",
          letterSpacing: "-0.05em",
          lineHeight: "0.6em",
        }}
      >
        Let's
        <div
          style={{
            fontFamily: "RoobertTRIAL",
            fontSize: "3rem",
            lineHeight: "0.5em",
          }}
        >
          Party
        </div>
        <div
          style={{
            lineHeight: "1.3em",
            fontSize: "4rem",
          }}
        >
          Together
        </div>
      </div>
      {/* 상단 박스 */}
      <motion.div
        style={{
          position: "absolute",
          top: "450px",
          width: 350,
          height: 200,
          backgroundColor: "#F2F1F0",
          clipPath: "polygon(0 0, 100% 0, 100% 50%, 50% 100%, 0 50%)",
          originY: 0, // 상단 축 기준으로 회전
          transformStyle: "preserve-3d", // 3D 유지
          marginBottom: -1, // 두 박스가 붙어 있도록 설정
          rotateX: smoothTopRotate, // 부드러운 회전 값 적용
          zIndex: topZIndex, // 동적으로 변경되는 z-index
          transform: "translateZ(1px)", // 초기 렌더링 우선순위 조정
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
          }}
        ></div>
      </motion.div>
      {/* 중앙 박스 */}
      <motion.div
        style={{
          position: "absolute",
          top: "450px",
          width: 350,
          height: 200,
          backgroundColor: "#ccc",
          transformStyle: "preserve-3d", // 3D 유지
          originY: 0, // 상단 축 기준으로 회전
          rotateX: 40, // 부드러운 회전 값 적용
          zIndex: 1, // 상단과 하단 박스 아래로 배치
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
          top: "450px",
          width: 330,
          height: 210,
          backgroundColor: "#121212", // 편지지 색상
          borderRadius: "5px", // 모서리 라운드 추가
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // 그림자 효과 추가
          transformStyle: "preserve-3d", // 3D 유지
          originY: 0, // 상단 축 기준으로 회전
          rotateX: smoothPaperRotateX, // 스크롤에 따른 회전
          y: smoothPaperY, // 스크롤에 따른 이동
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
          width: 350,
          height: 220,
          backgroundColor: "#F2F1F0",
          borderRadius: "4px",
          clipPath: "polygon(0 100%, 100% 100%, 100% 50%, 50% 80%, 0 50%)",
          transformStyle: "preserve-3d", // 3D 유지
          originY: 0, // 상단 축 기준으로 회전
          rotateX: 40, // 부드러운 회전 값 적용
          zIndex: 10, // 중앙 사각형 위로
        }}
      >
        <div
          style={{
            width: 300,
            height: "100%",
            backfaceVisibility: "hidden", // 뒷면 숨기기
          }}
        >
          하단
        </div>
      </motion.div>
      <motion.div
        style={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          height: 400,
          backgroundColor: colorToken.black100,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <motion.div
          style={{
            color: "transparent", // 투명색
            WebkitTextStroke: "0.5px #fff", // 흰색 테두리
            fontFamily: "PPPlayground",
            fontSize: "9rem",
            letterSpacing: "-0.05em",
          }}
        >
          Contact
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EnvelopePage;
