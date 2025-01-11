import styled from "@emotion/styled";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import image1 from "@/assets/images/image1.png";

import "@/assets/styles/fonts.css";
import ProfileScrollPage from "./ProfileScrollPage";
import NameCard from "../components/NameCard";
import EnvelopePage from "./EnvelopePage";
import WeddingDayCard from "../components/WeddingDayCard";
import LocationCard from "../components/LocationCard";

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  --hdr-gradient: radial-gradient(
    farthest-side circle at 59% 40% in oklch,
    oklch(100% 0 0) 63% 63%,
    62%,
    oklch(100% 0.01 360) 45% 45%,
    73%,
    oklch(93% 0.08 294) 76% 83%,
    92%,
    oklch(100% 0.01 0) 100%
  );
  --sdr-gradient: radial-gradient(
    farthest-side circle at 59% 40%,
    #fff 63% 63%,
    62%,
    #fffcff 45% 45%,
    73%,
    #eadeff 76% 83%,
    92%,
    #fffcff 100%
  );
  background: var(--hdr-gradient);
  background-size: cover; // 뷰포트에 맞게 크기 조정
  background-position: center; // 중앙 정렬
  background-repeat: no-repeat; // 반복 없음
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  overflow: hidden;
  z-index: 1;
  padding-top: 45px;
`;

const ScalingImage = styled(motion.img)<{ isFixed: boolean }>`
  position: relative;
  left: 50%;
  width: 100%;
  height: 50%;
  height: auto;
  object-fit: contain;
`;

const WrapperAnimatedText = styled(motion.div)`
  position: fixed; /* 항상 화면에 고정 */
  top: 50%; /* 세로 중앙 */
  left: 50%; /* 가로 중앙 */
  transform: translate(-50%, -50%); /* 정중앙으로 이동 */
  z-index: 9999; /* 다른 콘텐츠 위로 배치 */
  overflow: hidden; /* 텍스트가 부모 영역을 벗어나지 않도록 제한 */
  width: 100%; /* 화면 너비 */
  height: 100%; /* 화면 높이 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AnimatedText = styled(motion.div)`
  font-family: "FunnelSans";
  font-size: 2rem;
  font-weight: 100;
  white-space: nowrap;
  color: #121212;
`;

const ScrollScreen: React.FC = () => {
  const [scrollY, setScrollY] = useState(0); // 스크롤 상태
  const maxScroll = 600; // 확대가 멈추는 스크롤 범위
  const maxScale = 2; // 최대 확대 비율

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const delta = event.deltaY; // 휠 이벤트의 방향 감지
      const newScrollY = Math.max(0, Math.min(maxScroll, scrollY + delta)); // 범위 제한

      if (newScrollY < maxScroll && newScrollY > 0) {
        // 확대/축소 중일 때
        event.preventDefault(); // 기본 스크롤 차단
        setScrollY(newScrollY);
      }
    };

    // Wheel 이벤트 리스너 등록
    const handleWheelListener = (event: WheelEvent) => handleWheel(event);
    window.addEventListener("wheel", handleWheelListener, { passive: false });

    // 정리 함수
    return () => {
      window.removeEventListener("wheel", handleWheelListener);
    };
  }, [scrollY]);

  // transform 값 계산
  const translateY = scrollY * -0.8; // 텍스트 Y축 이동 범위를 더 크게 설정
  const skewX = Math.min(10, scrollY * 0.05); // 텍스트 기울기
  const scaleY = 1 + Math.min(0.5, scrollY * 0.001); // 텍스트 세로 확대

  return (
    <>
      <Background />
      <Container>
        {/*<HeartPage />*/}
        <NameCard />
        {/*
        <ScalingImage
          src={image1}
          animate={{
            scale: scrollY < maxScroll ? 1 + scrollY / maxScroll : maxScale,
            x: "-50%", // 중앙정렬
          }} // css의 transform 보다 우선적용 주의
          isFixed={scrollY < maxScroll} // 특정 크기 이상이면 absolute로 변경
          transition={{
            type: "spring", // 부드러운 확대
            stiffness: 50,
          }}
        />
        */}

        {/*
        <WrapperAnimatedText>
          <AnimatedText
            style={{
              transform: `translate(0px, ${translateY}px) skew(${skewX}deg, 0deg) scale(1, ${scaleY})`,
            }}
            animate={{
              y: translateY, // Y축 이동
            }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
            }}
          >
            SAVE THE DATE
          </AnimatedText>
        </WrapperAnimatedText>*/}
        <WeddingDayCard />
        <LocationCard />
        <ProfileScrollPage />
        <img src={"https://placehold.co/600x400"} />
        <EnvelopePage />
      </Container>
    </>
  );
};

export default ScrollScreen;
