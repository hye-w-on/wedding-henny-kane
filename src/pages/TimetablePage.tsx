import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { motion, useScroll, useTransform, animate } from "motion/react";
import React from "react";
import StarSvg from "@/assets/icons/star.svg?react";
import colorToken from "../utils/colorToken";

const Container = styled("div")({
  height: "150vh",
  position: "relative",
  transition: "background-color 0.5s ease",
});

const StickyContainer = styled("div")({
  height: "100vh",
  width: "100%",
  position: "sticky",
  top: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "background-color 0.5s ease",
  zIndex: 10,
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
  transition: "color 0.5s ease",
});

const PageTitle = styled("div")({
  position: "absolute",
  top: "10%",
  left: "50%",
  transform: "translateX(-50%)",
  fontFamily: "integralCF",
  fontSize: "2rem",
  fontWeight: "bold",
  transition: "color 0.5s ease",
});

const StarWrapper = styled(motion.div)({
  position: "absolute",
  width: "20px",
  height: "20px",
  zIndex: 2,
  color: colorToken.black,
});

const TimetablePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = 4;
  const [isFullyVisible, setIsFullyVisible] = useState(false);
  const isFirstVisit = useRef(true);
  const touchStartRef = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsFullyVisible(true);

            if (isFirstVisit.current) {
              setCurrentIndex(0);
              isFirstVisit.current = false;
            }
          } else {
            setIsFullyVisible(false);
          }
        });
      },
      { threshold: 0.9 }
    );

    if (stickyRef.current) {
      observer.observe(stickyRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isFullyVisible || touchStartRef.current === null) return;

      const touchEnd = e.changedTouches[0].clientY;
      const touchDiff = touchStartRef.current - touchEnd;

      const minSwipeDistance = 50;

      if (Math.abs(touchDiff) > minSwipeDistance) {
        if (touchDiff > 0) {
          setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
        } else {
          setCurrentIndex((prev) => Math.max(0, prev - 1));
        }
      }

      touchStartRef.current = null;
    };

    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isFullyVisible, maxIndex]);

  const handleWheel = (event: React.WheelEvent) => {
    if (!isFullyVisible) return;

    if (event.deltaY > 0) {
      setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    } else {
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    }
  };

  const numbers = [
    {
      time: "5PM",
      title: "OPENING",
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
      title: "RECEPTION",
      angle: 135,
      description: "이어서 애프터 파티를 진행합니다. 함께 먹고 마시고 얘기해요",
    },
    {
      time: "9PM",
      title: "CLOSING",
      angle: 180,
      description: "저희의 결혼을 축하해주고, 함께 즐겨주셔서 감사합니다",
    },
  ];

  const isDarkTheme = currentIndex >= 2;

  return (
    <Container
      ref={containerRef}
      onWheel={handleWheel}
      style={{ backgroundColor: isDarkTheme ? colorToken.nightGray : "white" }}
    >
      <StickyContainer
        ref={stickyRef}
        style={{
          backgroundColor: isDarkTheme ? colorToken.nightGray : "white",
        }}
      >
        <StarWrapper
          style={{
            top: "15%",
            left: "15%",
            color: isDarkTheme ? "white" : colorToken.black,
            opacity: isDarkTheme ? 1 : 1,
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
            top: "25%",
            right: "20%",
            color: isDarkTheme ? "white" : colorToken.black,
            opacity: isDarkTheme ? 1 : 1,
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: 0.5,
          }}
        >
          <StarSvg width="100%" height="100%" />
        </StarWrapper>

        <StarWrapper
          style={{
            bottom: "25%",
            left: "25%",
            color: isDarkTheme ? "white" : colorToken.black,
            opacity: isDarkTheme ? 1 : 1,
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: 1,
          }}
        >
          <StarSvg width="100%" height="100%" />
        </StarWrapper>

        <PageTitle style={{ color: isDarkTheme ? "white" : "black" }}>
          TIMETABLE
        </PageTitle>
        <CircleWrapper>
          <Circle
            animate={{ rotate: currentIndex * -45 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              borderColor: isDarkTheme ? "rgba(255, 255, 255, 0.3)" : "#ddd",
            }}
          >
            {numbers.map(({ time, title, angle }, index) => (
              <Session key={time} angle={angle}>
                <SmallCircle
                  isActive={index === currentIndex}
                  style={{
                    backgroundColor:
                      index === currentIndex
                        ? isDarkTheme
                          ? "white"
                          : "#000"
                        : "#ddd",
                  }}
                />
                <div
                  style={{
                    fontFamily: "integralCF",
                    fontSize: "1.5rem",
                    filter: index === currentIndex ? "blur(0)" : "blur(3px)",
                    color:
                      index === currentIndex
                        ? isDarkTheme
                          ? "white"
                          : "#000"
                        : "#ddd",
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
                    color:
                      index === currentIndex
                        ? isDarkTheme
                          ? "white"
                          : "#000"
                        : "#ddd",
                    transition: "filter 0.3s ease, color 0.3s ease",
                  }}
                >
                  {title}
                </div>
              </Session>
            ))}
          </Circle>
        </CircleWrapper>
        <Description style={{ color: isDarkTheme ? "white" : "black" }}>
          {numbers[currentIndex].description}
        </Description>
      </StickyContainer>
    </Container>
  );
};

export default TimetablePage;
