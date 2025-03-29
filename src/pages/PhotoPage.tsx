import photo03 from "@/assets/photos/photo03.webp";
import eleven01 from "@/assets/photos/eleven01.webp";
import yd01 from "@/assets/photos/yd01.webp";
import back01 from "@/assets/photos/background/back01.png";
import back02 from "@/assets/photos/background/back02.png";
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
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.7) 70%, rgba(0, 0, 0, 0.9) 100%)",
    pointerEvents: "none",
  },
});

interface PhotoInfo {
  image: string;
  background: string;
  title: string;
  description: string;
  comment: string;
}

const CenterBox = styled.div({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "300px",
  height: "500px",
  borderRadius: "10px",
  overflow: "visible",
  zIndex: 3,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
});

const ImageContainer = styled.div({
  width: "100%",
  height: "300px",
  position: "relative",
  borderRadius: "10px",
  overflow: "hidden",
});

const InfoContainer = styled(motion.div)({
  width: "100%",
  textAlign: "center",
  color: "white",
});

const Title = styled.h2({
  fontSize: "1.5rem",
  fontFamily: "PPEditorialOld",
  marginBottom: "8px",
});

const Description = styled.p({
  fontSize: "1rem",
  fontFamily: "KoPubDotum",
  marginBottom: "4px",
});

const Comment = styled.p({
  fontSize: "0.8rem",
  fontFamily: "KoPubDotum",
  fontStyle: "italic",
  opacity: 0.8,
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
  const photoInfos: PhotoInfo[] = [
    {
      image: eleven01,
      background: back01,
      title: "Eleven Lounge",
      description: "우리의 첫 데이트",
      comment: "2023년 4월의 어느 봄날, 처음 만난 곳",
    },
    {
      image: photo03,
      background: back02,
      title: "한강 피크닉",
      description: "여름날의 데이트",
      comment: "시원한 강바람과 함께했던 특별한 하루",
    },
    {
      image: yd01,
      background: back03,
      title: "연희동 골목길",
      description: "일상의 행복",
      comment: "평범한 날들이 특별해지는 순간",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const dragControls = useDragControls();

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? photoInfos.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === photoInfos.length - 1 ? 0 : prev + 1));
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
            backgroundImage: `url(${photoInfos[currentIndex].background})`,
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
        <InfoContainer
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Title>{photoInfos[currentIndex].title}</Title>
          <Description>{photoInfos[currentIndex].description}</Description>
        </InfoContainer>

        <ImageContainer>
          <AnimatePresence mode="wait">
            <CenterImage
              key={currentIndex}
              src={photoInfos[currentIndex].image}
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
        </ImageContainer>

        <InfoContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <Comment>{photoInfos[currentIndex].comment}</Comment>
        </InfoContainer>
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
