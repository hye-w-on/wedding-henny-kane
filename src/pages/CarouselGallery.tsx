import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { motion, AnimatePresence, useInView } from "motion/react";
import colorToken from "@/utils/colorToken";
import BackwardIcon from "@/assets/icons/backward.svg";
import ForwardIcon from "@/assets/icons/forward.svg";
import ShowText from "@/components/showText";
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
  const infoRef = useRef(null);
  const isInfoInView = useInView(infoRef, { once: false });

  // 무한 슬라이드를 위한 초기 설정: 3배 크기의 이미지 배열 생성
  const initialImages = [
    ...originalImages.map((img) => ({ ...img, id: `prev-${img.id}` })),
    ...originalImages,
    ...originalImages.map((img) => ({ ...img, id: `next-${img.id}` })),
  ];

  const [displayedImages, setDisplayedImages] = useState(initialImages);
  const [index, setIndex] = useState(originalImages.length); // 중간 세트부터 시작
  const [autoPlay, setAutoPlay] = useState(true);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

  // 인덱스가 변경될 때마다 필요한 이미지 추가
  useEffect(() => {
    // 오른쪽으로 이동하여 마지막 세트에 접근하는 경우
    if (index >= displayedImages.length - originalImages.length / 2) {
      const nextImages = originalImages.map((img) => ({
        ...img,
        id: `next-${img.id}-${Date.now()}`,
      }));
      setDisplayedImages((prev) => [...prev, ...nextImages]);
    }

    // 왼쪽으로 이동하여 첫 번째 세트에 접근하는 경우
    if (index < originalImages.length / 2) {
      const prevImages = originalImages.map((img) => ({
        ...img,
        id: `prev-${img.id}-${Date.now()}`,
      }));
      // 왼쪽에 이미지 추가 후 인덱스 조정
      setDisplayedImages((prev) => [...prevImages, ...prev]);
      setIndex((prev) => prev + originalImages.length);
    }
  }, [index]);

  // 다음 슬라이드로 이동
  const handleNext = () => {
    setIndex((prev) => prev + 1);
  };

  // 이전 슬라이드로 이동
  const handlePrev = () => {
    setIndex((prev) => prev - 1);
  };

  // 이미지 클릭 처리
  const handleImageClick = (image: ImageData, clickedIndex: number) => {
    if (clickedIndex === index) {
      // 현재 활성화된 이미지 클릭 시 확대
      setSelectedImage(image);
      setAutoPlay(false);
    } else {
      // 다른 이미지 클릭 시 해당 위치로 이동
      setIndex(clickedIndex);
    }
  };

  // 닷 내비게이션 클릭 처리 (실제 원본 이미지의 인덱스 기준)
  const handleDotClick = (dotIndex: number) => {
    // 현재 표시되는 세트에서의 인덱스를 계산
    const currentOffset =
      Math.floor(index / originalImages.length) * originalImages.length;
    setIndex(currentOffset + dotIndex);
  };

  // 자동 재생
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [autoPlay]);

  // 실제 표시되는 인덱스 계산 (닷 네비게이션용)
  const displayIndex = index % originalImages.length;

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
          ref={infoRef}
        >
          <motion.div
            style={{ fontFamily: "PPEditorialOldItalic", fontSize: "2.5rem" }}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{
              opacity: isInfoInView ? 1 : 0,
              x: isInfoInView ? 0 : -20,
              filter: isInfoInView ? "blur(0px)" : "blur(10px)",
            }}
            transition={{ duration: 0.5 }}
          >
            New Zealand
          </motion.div>
          <motion.div
            style={{ fontFamily: "PPEditorialOldItalic", fontSize: "2rem" }}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{
              opacity: isInfoInView ? 1 : 0,
              x: isInfoInView ? 0 : -20,
              filter: isInfoInView ? "blur(0px)" : "blur(10px)",
            }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Self Snapshots
          </motion.div>
        </div>
        <div
          style={{
            marginTop: "8px",
            fontFamily: "SUITRegular",
            fontSize: "0.8rem",
            color: "#ffffff99",
          }}
        >
          <ShowText isInView={isInfoInView} delay={0.1}>
            클릭하면 확대가 가능합니다
          </ShowText>
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
              onClick={() => handleImageClick(img, i)}
              whileTap={{ scale: 1.1 }}
              style={{ cursor: "pointer" }}
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
            onClick={() => handleDotClick(i)}
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
