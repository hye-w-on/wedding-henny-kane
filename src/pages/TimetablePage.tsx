import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { motion, useScroll, useTransform, animate } from "motion/react";
import React from "react";

const Container = styled("div")({
  height: "150vh",
  position: "relative",
  backgroundColor: "white",
});

const StickyContainer = styled("div")({
  height: "100vh",
  position: "sticky",
  top: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const CircleWrapper = styled("div")({
  transform: "translateX(-45vh)",
});

const Circle = styled(motion.div)({
  width: "300px",
  height: "300px",
  border: "1px solid #ddd",
  borderRadius: "50%",
  position: "relative",
});

const Session = styled("div")<{ angle: number }>(({ angle }) => ({
  position: "absolute",
  left: "50%",
  top: "50%",
  transformOrigin: "0 0",
  transform: `rotate(${angle}deg) translate(144px) rotate(0deg)`,
  display: "flex",
  alignItems: "center",
  gap: "10px",
  minWidth: "200px",
  whiteSpace: "nowrap",
}));

const SmallCircle = styled("div")<{ isActive: boolean }>(({ isActive }) => ({
  width: "10px",
  height: "10px",
  backgroundColor: isActive ? "#000" : "#ddd",
  borderRadius: "50%",
  transition: "background-color 0.3s ease",
}));

const Description = styled("div")({
  position: "absolute",
  left: "50%",
  top: "60%",
  transform: "translate(-50%, -50%)",
  fontSize: "0.8rem",
  textAlign: "center",
});

const PageTitle = styled("div")({
  position: "absolute",
  top: "10%",
  left: "50%",
  transform: "translateX(-50%)",
  fontFamily: "integralCF",
  fontSize: "2rem",
  fontWeight: "bold",
});

const TimetablePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = 4;
  const [isFullyVisible, setIsFullyVisible] = useState(false);
  const isFirstVisit = useRef(true); // 최초 방문 여부를 체크하는 ref

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsFullyVisible(true);

            // 최초 진입시에만 인덱스를 0으로 설정
            if (isFirstVisit.current) {
              setCurrentIndex(0);
              isFirstVisit.current = false;
            }
            // 스크롤 방향에 따른 인덱스 설정은 제거
          } else {
            setIsFullyVisible(false);
          }
        });
      },
      { threshold: 1.0 }
    );

    if (stickyRef.current) {
      observer.observe(stickyRef.current);
    }

    return () => observer.disconnect();
  }, []); // maxIndex 의존성 제거

  const handleWheel = (event: React.WheelEvent) => {
    if (!isFullyVisible) return; // 완전히 보일 때만 휠 이벤트 처리

    if (event.deltaY > 0) {
      setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    } else {
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    }
  };

  const numbers = [
    {
      time: "5PM",
      title: "WELCOME",
      angle: 0,
      description:
        "환영합니다. 웰컴푸드와 칵테일이 준비되어있으니 식전에 즐겨주세요",
    },
    {
      time: "6PM",
      title: "CEREMONY",
      angle: 45,
      description: "결혼식이 시작됩니다",
    },
    {
      time: "7PM",
      title: "DINNER",
      angle: 90,
      description: "예식이 진행된 같은 장소에서 BBQ 뷔페를 제공합니다",
    },
    {
      time: "8PM",
      title: "TALK AND DRINK",
      angle: 135,
      description:
        "이어서 애프터 파티를 진행합니다. 거창한 이벤트가 아닌 함께 먹고 마시고 얘기해요",
    },
    {
      time: "9PM",
      title: "LAST CALL",
      angle: 180,
      description: "저희의 결혼을 축하해주고, 함께 즐겨주셔서 감사합니다",
    },
  ];

  return (
    <Container ref={containerRef} onWheel={handleWheel}>
      <StickyContainer ref={stickyRef}>
        <PageTitle>TIMETABLE</PageTitle>
        <CircleWrapper>
          <Circle
            animate={{ rotate: currentIndex * -45 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {numbers.map(({ time, title, angle }, index) => (
              <Session key={time} angle={angle}>
                <SmallCircle isActive={index === currentIndex} />
                <div
                  style={{
                    fontFamily: "integralCF",
                    fontSize: "1.5rem",
                    filter: index === currentIndex ? "blur(0)" : "blur(3px)",
                    color: index === currentIndex ? "#000" : "#ddd",
                    transition: "filter 0.3s ease, color 0.3s ease",
                  }}
                >
                  {time}
                </div>
                <div
                  style={{
                    fontFamily: "integralCF",
                    fontSize: "1rem",
                    filter: index === currentIndex ? "blur(0)" : "blur(3px)",
                    color: index === currentIndex ? "#000" : "#ddd",
                    transition: "filter 0.3s ease, color 0.3s ease",
                  }}
                >
                  {title}
                </div>
              </Session>
            ))}
          </Circle>
        </CircleWrapper>
        <Description>{numbers[currentIndex].description}</Description>
      </StickyContainer>
    </Container>
  );
};

export default TimetablePage;
