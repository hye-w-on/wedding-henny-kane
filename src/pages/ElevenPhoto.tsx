import { useState, useRef, useLayoutEffect } from "react";
import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import photo01 from "@/assets/photos/photo01.webp";
import photo02 from "@/assets/photos/photo02.webp";
import photo03 from "@/assets/photos/photo03.webp";
import photo04 from "@/assets/photos/photo04.webp";
import photo05 from "@/assets/photos/photo05.webp";
import photo06 from "@/assets/photos/photo06.webp";

const photos = [photo01, photo02, photo03, photo04, photo05, photo06];

const GAP = 50; // 슬라이드 간 간격
const MIN_SLIDE_WIDTH = 350;
const MIN_FRAME_WIDTH = MIN_SLIDE_WIDTH * 3 + GAP * 2;

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  background: #f3f4f6;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Frame = styled.div`
  width: 70vw;
  min-width: ${MIN_FRAME_WIDTH}px;
  aspect-ratio: 3 / 1;
  position: relative;
  overflow: hidden;
`;

const Slide = styled(motion.div)`
  position: absolute;
  height: 300px;
  border-radius: 1rem;
  overflow: hidden;
`;

const SlideImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border-radius: 9999px;
  width: 3rem;
  height: 3rem;
  font-size: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border: none;
  cursor: pointer;
  z-index: 10;
  &:hover {
    background: #e5e7eb;
  }
`;

const LeftArrow = styled(ArrowButton)`
  left: 2rem;
`;

const RightArrow = styled(ArrowButton)`
  right: 2rem;
`;

const ElevenPhoto = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const frameRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(MIN_SLIDE_WIDTH);

  // ResizeObserver로 Frame width 측정 → 슬라이드 너비 계산
  useLayoutEffect(() => {
    if (!frameRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      const frameW = entry.contentRect.width;
      const gapTotal = GAP * 2;
      const calcSlide = (frameW - gapTotal) / 3;
      setSlideWidth(Math.max(calcSlide, MIN_SLIDE_WIDTH));
    });
    observer.observe(frameRef.current);
    return () => observer.disconnect();
  }, []);

  const SLOT_WIDTH = slideWidth + GAP;
  const slotPositions = [0, SLOT_WIDTH, SLOT_WIDTH * 2];

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const getVisibleSlides = () => {
    const left = (currentIndex + photos.length - 1) % photos.length;
    const center = currentIndex;
    const right = (currentIndex + 1) % photos.length;

    return [
      { index: left, slot: 0 },
      { index: center, slot: 1 },
      { index: right, slot: 2 },
    ];
  };

  useLayoutEffect(() => {
    if (!frameRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      const frameW = entry.contentRect.width;
      const gapTotal = GAP * 2;
      const calcSlide = (frameW - gapTotal) / 3;
      setSlideWidth(Math.max(calcSlide, 350)); // 최소 350px 보장
    });
    observer.observe(frameRef.current);
    return () => observer.disconnect();
  }, []);
  return (
    <Container>
      <LeftArrow onClick={handlePrev}>←</LeftArrow>
      <Frame ref={frameRef}>
        <AnimatePresence mode="sync">
          {getVisibleSlides().map(({ index, slot }) => {
            const image = photos[index];
            const isCenter = slot === 1;

            return (
              <Slide
                key={image + currentIndex}
                style={{
                  width: slideWidth,
                  left: 0,
                }}
                initial={{
                  x:
                    direction === "right"
                      ? slotPositions[slot] + SLOT_WIDTH
                      : slotPositions[slot] - SLOT_WIDTH,
                  scale: 1,
                }}
                animate={{
                  x: slotPositions[slot],
                  scale: isCenter ? 1.1 : 1,
                  zIndex: isCenter ? 2 : 1,
                }}
                exit={{
                  x:
                    direction === "right"
                      ? slotPositions[slot] - SLOT_WIDTH
                      : slotPositions[slot] + SLOT_WIDTH,
                  scale: 1,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <SlideImg src={image} alt={`slide-${index}`} />
              </Slide>
            );
          })}
        </AnimatePresence>
      </Frame>
      <RightArrow onClick={handleNext}>→</RightArrow>
    </Container>
  );
};

export default ElevenPhoto;
