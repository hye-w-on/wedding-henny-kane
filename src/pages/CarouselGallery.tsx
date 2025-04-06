import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "motion/react";
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
  padding: 20px 0 40px 0;
  overflow: hidden;
  background-color: ${colorToken.black};
`;

const Track = styled(motion.div)`
  display: flex;
  margin: 0 auto;
  width: 200px;
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
  top: 90%;
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

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10;
`;

const ExpandedImageContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  width: 90vw;
  max-width: 1200px;
  max-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ExpandedImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 1rem;
`;

const CarouselGallery = () => {
  const [displayedImages, setDisplayedImages] = useState(originalImages);
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [cycleCount, setCycleCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

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

  const handleImageClick = (image: ImageData) => {
    setSelectedImage(image);
    setAutoPlay(false);
  };

  return (
    <Container
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => !selectedImage && setAutoPlay(true)}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: colorToken.white,
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{ fontFamily: "PPEditorialOldItalic", fontSize: "2.5rem" }}
          >
            New Zealand
          </div>
          <div style={{ fontFamily: "PPEditorialOldItalic", fontSize: "2rem" }}>
            Self Snapshots
          </div>
        </div>
        <div
          style={{
            marginTop: "10px",
            fontFamily: "SUITRegular",
            fontSize: "0.8rem",
            color: "#ffffff99",
          }}
        >
          클릭하면 확대가 가능합니다
        </div>
      </div>
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
              onClick={() => i === index && handleImageClick(img)}
              whileTap={{ scale: 1.1 }}
              style={{ cursor: i === index ? "pointer" : "default" }}
            />
          </Slide>
        ))}
      </Track>
      <SlideButton onClick={handlePrev}>
        <motion.img
          src={BackwardIcon}
          alt="Previous"
          whileTap={{ scale: 1.2 }}
        />
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
      <SlideButton onClick={handleNext}>
        <motion.img src={ForwardIcon} alt="Next" whileTap={{ scale: 1.2 }} />
      </SlideButton>
      <AnimatePresence>
        {selectedImage && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelectedImage(null);
                setAutoPlay(true);
              }}
            />
            <ExpandedImageContainer
              onClick={() => {
                setSelectedImage(null);
                setAutoPlay(true);
              }}
            >
              <ExpandedImage
                src={selectedImage.url}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              />
            </ExpandedImageContainer>
          </>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default CarouselGallery;
