import photo01 from "@/assets/photos/photo01.webp";
import photo02 from "@/assets/photos/photo02.webp";
import photo03 from "@/assets/photos/photo03.webp";
import photo04 from "@/assets/photos/photo04.webp";
import photo05 from "@/assets/photos/photo05.webp";
import photo06 from "@/assets/photos/photo06.webp";
import back01 from "@/assets/photos/background/back01.png";
import back02 from "@/assets/photos/background/back02.png";
import back03 from "@/assets/photos/background/back03.png";
import back04 from "@/assets/photos/background/back04.png";
import back05 from "@/assets/photos/background/back05.png";
import back06 from "@/assets/photos/background/back06.png";
import styled from "@emotion/styled";
import { motion, AnimatePresence, useDragControls } from "motion/react";
import { useState } from "react";

const Container = styled.div({
  height: "100vh",
  width: "100%",
  overflow: "hidden",
  padding: "50px 0",
  position: "relative",
  backgroundColor: "white",
});

const BackgroundImage = styled(motion.div)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
  zIndex: 1,
});

const ImageWrapper = styled.div({
  position: "relative",
  display: "flex",
  alignItems: "flex-end",
  zIndex: 3,
});

const SlidingContainer = styled.div({
  display: "flex",
  animation: "slide 10s linear infinite",
  "@keyframes slide": {
    "0%": { transform: "translateX(0)" },
    "100%": { transform: "translateX(-50%)" },
  },
  gap: "2px",
  position: "relative",
  zIndex: 0,
});

const ImageContainer = styled.div({
  flexShrink: 0,
  borderRadius: "10px",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "120px",
  width: "100px",
  position: "relative",
});

const Image = styled.img({
  objectFit: "contain",
  borderRadius: "10px",
});

const CenterBox = styled.div({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "300px",
  height: "300px",
  borderRadius: "10px",
  overflow: "visible",
  zIndex: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const CenterImage = styled(motion.img)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
  borderRadius: "10px",
});

const ArrowButton = styled.button({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  border: "none",
  color: "white",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 3,
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
});

const LeftArrow = styled(ArrowButton)({
  left: "20px",
});

const RightArrow = styled(ArrowButton)({
  right: "20px",
});

const DragArea = styled(motion.div)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 4,
  touchAction: "none",
});

const PhotoPage = () => {
  const photos = [photo01, photo02, photo03, photo04, photo05, photo06];
  const backgrounds = [back01, back02, back03, back04, back05, back06];
  const [currentIndex, setCurrentIndex] = useState(0);
  const dragControls = useDragControls();

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 50; // 최소 드래그 거리
    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0) {
        handlePrevious();
      } else {
        handleNext();
      }
    }
  };

  return (
    <Container>
      <DragArea
        drag="x"
        dragControls={dragControls}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
      />
      <AnimatePresence mode="sync">
        <BackgroundImage
          key={`bg-${currentIndex}`}
          style={{
            backgroundImage: `url(${backgrounds[currentIndex]})`,
            zIndex: 2,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            mass: 0.5,
          }}
        />
      </AnimatePresence>
      <ImageWrapper>
        <SlidingContainer>
          {/* First set of images */}
          {photos.map((photo, index) => (
            <ImageContainer key={`first-${index}`}>
              <Image src={photo} alt={`Photo ${index + 1}`} />
            </ImageContainer>
          ))}
          {/* Second set of images */}
          {photos.map((photo, index) => (
            <ImageContainer key={`second-${index}`}>
              <Image src={photo} alt={`Photo ${index + 1}`} />
            </ImageContainer>
          ))}
        </SlidingContainer>
      </ImageWrapper>
      <CenterBox>
        <AnimatePresence mode="wait">
          <CenterImage
            key={currentIndex}
            src={photos[currentIndex]}
            alt={`Photo ${currentIndex + 1}`}
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            exit={{ x: "-100vw" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              mass: 0.5,
            }}
          />
        </AnimatePresence>
      </CenterBox>
      <LeftArrow onClick={handlePrevious}>←</LeftArrow>
      <RightArrow onClick={handleNext}>→</RightArrow>
    </Container>
  );
};

export default PhotoPage;
