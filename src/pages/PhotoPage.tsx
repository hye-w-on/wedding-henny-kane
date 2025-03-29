import photo03 from "@/assets/photos/photo03.webp";
import eleven01 from "@/assets/photos/eleven01.webp";
import back01 from "@/assets/photos/background/back01.png";
import back03 from "@/assets/photos/background/back03.png";
import forwardIcon from "@/assets/icons/forward.svg";
import backwardIcon from "@/assets/icons/backward.svg";
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
  touchAction: "none",
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

const CenterBox = styled.div({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "300px",
  height: "300px",
  borderRadius: "10px",
  overflow: "visible",
  zIndex: 3,
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
  border: "none",
  color: "white",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 5,
  background: "transparent",
  padding: 0,
});

const LeftArrow = styled(ArrowButton)({
  left: "10px",
});

const RightArrow = styled(ArrowButton)({
  right: "10px",
});

const DragArea = styled(motion.div)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 4,
  cursor: "grab",
  "&:active": {
    cursor: "grabbing",
  },
});

const ArrowIcon = styled.img({
  width: "40px",
  height: "40px",
  filter: "brightness(0) invert(1)",
});

const PhotoPage = () => {
  const photos = [eleven01, photo03];
  const backgrounds = [back01, back03];
  const [currentIndex, setCurrentIndex] = useState(0);
  const dragControls = useDragControls();

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    const threshold = 50;
    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0) {
        handlePrevious(new MouseEvent("click") as any);
      } else {
        handleNext(new MouseEvent("click") as any);
      }
    }
  };

  return (
    <Container>
      <AnimatePresence mode="sync">
        <BackgroundImage
          key={`bg-${currentIndex}`}
          style={{
            backgroundImage: `url(${backgrounds[currentIndex]})`,
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
      <DragArea
        drag="x"
        dragControls={dragControls}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        dragConstraints={{ left: 0, right: 0 }}
      />
      <LeftArrow onClick={handlePrevious}>
        <ArrowIcon src={backwardIcon} alt="Previous" />
      </LeftArrow>
      <RightArrow onClick={handleNext}>
        <ArrowIcon src={forwardIcon} alt="Next" />
      </RightArrow>
    </Container>
  );
};

export default PhotoPage;
