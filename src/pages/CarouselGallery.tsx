import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { motion } from "motion/react";
import colorToken from "../utils/colorToken";
import BackwardIcon from "../assets/icons/backward.svg";
import ForwardIcon from "../assets/icons/forward.svg";
const CLOUDFRONT_URL = "https://d2fwec07ipx82e.cloudfront.net/newzealand";

interface ImageData {
  id: string;
  url: string;
}

const originalImages: ImageData[] = Array.from({ length: 6 }, (_, i) => ({
  id: `image-${i}`,
  url: `${CLOUDFRONT_URL}/photo0${1 + i}.webp`,
}));

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  overflow: hidden;
  background-color: ${colorToken.black};
`;

const Track = styled(motion.div)`
  display: flex;
  margin: 0 auto;
  width: 300px;
  height: 100%;
`;

const Slide = styled(motion.div)<{ isActive: boolean }>`
  flex: 0 0 100%;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
`;

const SlideButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  border: none;
  padding: 16px;
  cursor: pointer;
  z-index: 10;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  &:first-of-type {
    left: 20px;
  }

  &:last-of-type {
    right: 20px;
  }

  img {
    width: 24px;
    height: 24px;
    filter: brightness(0) invert(1);
  }
`;

const Dots = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 10px;
  z-index: 10;
`;

const Dot = styled.button<{ isActive: boolean }>`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  border: none;
  background: ${(props) =>
    props.isActive ? "white" : "rgba(255, 255, 255, 0.5)"};
`;

const CarouselGallery = () => {
  const [displayedImages, setDisplayedImages] = useState(originalImages);
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [cycleCount, setCycleCount] = useState(0);

  const handleNext = () => {
    setIndex((prev) => {
      const nextIndex = prev + 1;
      // 마지막 이미지에 도달했을 때
      if (nextIndex >= displayedImages.length - 1) {
        // 다음 사이클의 이미지들을 추가
        setDisplayedImages((current) => [
          ...current,
          ...originalImages.map((img) => ({
            ...img,
            id: `image-${img.id}-cycle-${cycleCount}`,
          })),
        ]);
        setCycleCount((prev) => prev + 1);
      }
      return nextIndex;
    });
  };

  const handlePrev = () => {
    setIndex((prev) => {
      if (prev === 0) {
        return 0;
      }
      return prev - 1;
    });
  };

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [index, autoPlay]);

  // 실제 표시되는 인덱스 계산 (닷 네비게이션용)
  const displayIndex = index % originalImages.length;

  return (
    <Container
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      <Track
        animate={{ x: `-${index * 100}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {displayedImages.map((img, i) => (
          <Slide key={img.id} isActive={i === index}>
            <Image
              src={img.url}
              alt={`Slide ${img.id}`}
              animate={{
                scale: i === index ? 1.1 : 1,
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
            />
          </Slide>
        ))}
      </Track>

      <SlideButton onClick={handlePrev}>
        <img src={BackwardIcon} alt="Previous" />
      </SlideButton>
      <SlideButton onClick={handleNext}>
        <img src={ForwardIcon} alt="Next" />
      </SlideButton>

      <Dots>
        {originalImages.map((_, i) => (
          <Dot
            key={i}
            isActive={i === displayIndex}
            onClick={() => setIndex(i)}
          />
        ))}
      </Dots>
    </Container>
  );
};

export default CarouselGallery;
