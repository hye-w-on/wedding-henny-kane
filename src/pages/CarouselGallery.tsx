import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import photo01 from "@/assets/photos/sample.webp";
import photo02 from "@/assets/photos/sample.webp";
import photo03 from "@/assets/photos/sample.webp";
import photo04 from "@/assets/photos/sample.webp";

const images = [photo01, photo02, photo03, photo04];

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 500px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 12px;
`;

const Track = styled(motion.div)`
  display: flex;
  height: 100%;
`;

const Slide = styled.div`
  flex: 0 0 100%;
  height: 100%;
  padding: 0 10px;
  box-sizing: border-box;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
`;

const SlideButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 16px;
  cursor: pointer;
  z-index: 10;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }

  &:first-of-type {
    left: 20px;
  }

  &:last-of-type {
    right: 20px;
  }
`;

const Dots = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
`;

const Dot = styled.button<{ isActive: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${(props) =>
    props.isActive ? "white" : "rgba(255, 255, 255, 0.5)"};
  cursor: pointer;

  &:hover {
    background: white;
  }
`;

const CarouselGallery = () => {
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const length = images.length;

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + length) % length);
  };

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [index, autoPlay]);

  return (
    <Container
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      <Track
        animate={{ x: `-${index * 100}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {images.map((img, i) => (
          <Slide key={i}>
            <Image src={img} alt={`Slide ${i + 1}`} />
          </Slide>
        ))}
      </Track>

      <SlideButton onClick={handlePrev}>←</SlideButton>
      <SlideButton onClick={handleNext}>→</SlideButton>

      <Dots>
        {images.map((_, i) => (
          <Dot key={i} isActive={i === index} onClick={() => setIndex(i)} />
        ))}
      </Dots>
    </Container>
  );
};

export default CarouselGallery;
