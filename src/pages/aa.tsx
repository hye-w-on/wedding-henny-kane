import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { motion, useScroll, useTransform, animate } from "motion/react";

const Container = styled.div`
  height: 200vh;
  position: relative;
`;

const StickyContainer = styled.div`
  height: 100vh;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled(motion.div)`
  width: 300px;
  height: 300px;
  border: 1px solid black;
  border-radius: 50%;
  position: relative;
`;

const Number = styled.div<{ angle: number }>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: 0 0;
  transform: ${({ angle }) => `
    rotate(${angle}deg)
    translate(180px)
    rotate(0deg)
  `};
`;

const TimetablePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = 4;

  const handleWheel = (event: React.WheelEvent) => {
    if (event.deltaY > 0) {
      // 아래로 스크롤할 때는 maxIndex를 넘지 않도록
      setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    } else {
      // 위로 스크롤할 때는 0 이하로 내려가지 않도록
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    }
  };

  const numbers = [
    { num: 1, angle: 0 },
    { num: 2, angle: 45 },
    { num: 3, angle: 90 },
    { num: 4, angle: 135 },
    { num: 5, angle: 180 },
  ];

  return (
    <Container ref={containerRef} onWheel={handleWheel}>
      <StickyContainer>
        <Circle
          animate={{ rotate: currentIndex * -45 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {numbers.map(({ num, angle }) => (
            <Number key={num} angle={angle}>
              {num}.
            </Number>
          ))}
        </Circle>
      </StickyContainer>
    </Container>
  );
};

export default TimetablePage;
