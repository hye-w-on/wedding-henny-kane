import photo01 from "@/assets/photos/photo01.webp";
import photo02 from "@/assets/photos/photo02.webp";
import photo03 from "@/assets/photos/photo03.webp";
import photo04 from "@/assets/photos/photo04.webp";
import photo05 from "@/assets/photos/photo05.webp";
import photo06 from "@/assets/photos/photo06.webp";
import eleven01 from "@/assets/photos/eleven01.webp";
import yd01 from "@/assets/photos/yd01.webp";
import back01 from "@/assets/photos/background/back01.png";
import back02 from "@/assets/photos/background/back02.png";
import back03 from "@/assets/photos/background/back03.png";
import forwardIcon from "@/assets/icons/forward.svg";
import backwardIcon from "@/assets/icons/backward.svg";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Container = styled.div({
  height: "100vh",
  width: "100%",
  overflow: "hidden",
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
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.7) 70%, rgba(0, 0, 0, 0.9) 100%)",
    pointerEvents: "none",
  },
});

const SliderContainer = styled.div({
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2,
});

const SliderTrack = styled(motion.div)({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  position: "relative",
  width: "100%",
  height: "80%",
  overflow: "hidden",
});

const Slide = styled(motion.div)({
  flex: "0 0 60%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Image = styled(motion.img)({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
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

const ArrowIcon = styled.img({
  width: "40px",
  height: "40px",
  filter: "brightness(0) invert(1)",
});

interface PhotoInfo {
  image: string;
  background: string;
}

const PhotoPage = () => {
  const photoInfos: PhotoInfo[] = [
    {
      image: photo01,
      background: back01,
    },
    {
      image: photo02,
      background: back02,
    },
    {
      image: photo03,
      background: back03,
    },
    {
      image: photo04,
      background: back03,
    },
    {
      image: photo05,
      background: back03,
    },
    {
      image: photo06,
      background: back03,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePrevious = async (e: React.MouseEvent) => {
    if (isAnimating || currentIndex === 0) return;
    e.stopPropagation();
    setIsAnimating(true);
    setCurrentIndex((prev) => prev - 1);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsAnimating(false);
  };

  const handleNext = async (e: React.MouseEvent) => {
    if (isAnimating || currentIndex === photoInfos.length - 1) return;
    e.stopPropagation();
    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsAnimating(false);
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
            duration: 0.5,
            ease: "easeInOut",
          }}
        />
      </AnimatePresence>

      <SliderContainer>
        <SliderTrack
          animate={{
            x: `calc(-${currentIndex * 60}% - ${currentIndex * 20}px)`,
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          {photoInfos.map((photo, index) => (
            <Slide key={index}>
              <Image
                src={photo.image}
                alt={`Photo ${index + 1}`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </Slide>
          ))}
        </SliderTrack>

        <LeftArrow onClick={handlePrevious}>
          <ArrowIcon src={backwardIcon} alt="Previous" />
        </LeftArrow>
        <RightArrow onClick={handleNext}>
          <ArrowIcon src={forwardIcon} alt="Next" />
        </RightArrow>
      </SliderContainer>
    </Container>
  );
};

export default PhotoPage;
