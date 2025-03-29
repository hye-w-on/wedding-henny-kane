import styled from "@emotion/styled";
import { motion } from "motion/react";

import photo01 from "@/assets/photos/photo01.webp";
import photo02 from "@/assets/photos/photo02.webp";
import photo03 from "@/assets/photos/photo03.webp";
import photo04 from "@/assets/photos/photo04.webp";
import photo05 from "@/assets/photos/photo05.webp";
import photo06 from "@/assets/photos/photo06.webp";
import logo from "@/assets/images/logo.webp";
import colorToken from "../utils/colorToken";

const ImageWrapper = styled.div({
  position: "relative",
  display: "flex",
  alignItems: "flex-end",
  zIndex: 3,
  width: "100%",
  overflow: "hidden",
  "&::before, &::after": {
    content: '""',
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "100px",
    zIndex: 2,
    pointerEvents: "none",
  },
  "&::before": {
    left: 0,
    background: "linear-gradient(to right, #000 0%, transparent 70%)",
  },
  "&::after": {
    right: 0,
    background: "linear-gradient(to left, #000 0%, transparent 70%)",
  },
});

const SlidingContainer = styled.div({
  display: "flex",
  animation: "slide 10s linear infinite",
  "@keyframes slide": {
    "0%": {
      transform: "translateX(0)",
    },
    "100%": {
      transform: "translateX(-50%)",
    },
  },
  gap: "5px",
  position: "relative",
  zIndex: 0,
  margin: "10px 0",
});

const ImageContainer = styled.div({
  flexShrink: 0,
  borderRadius: "10px",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100px",
  width: "100px",
  position: "relative",
});

const Image = styled.img({
  height: "100%",
  width: "100%",
  objectFit: "cover",
  borderRadius: "10px",
});

const Card = styled(motion.div)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "calc(100% - 20px)",
  maxWidth: "600px",
  height: "300px",
  background: colorToken.realBlack,
  borderRadius: "30%",
  overflow: "hidden",
  margin: "10px",
});

function PhotoSlideCard() {
  const photos = [photo01, photo02, photo03, photo04, photo05, photo06];

  return (
    <Card>
      <div
        style={{
          width: "160px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <img src={logo} alt="logo" style={{ width: "100%" }} />
      </div>
      <ImageWrapper>
        <SlidingContainer>
          {photos.map((photo, index) => (
            <ImageContainer key={`first-${index}`}>
              <Image src={photo} alt={`Photo ${index + 1}`} />
            </ImageContainer>
          ))}
          {photos.map((photo, index) => (
            <ImageContainer key={`second-${index}`}>
              <Image src={photo} alt={`Photo ${index + 1}`} />
            </ImageContainer>
          ))}
        </SlidingContainer>
      </ImageWrapper>
    </Card>
  );
}

export default PhotoSlideCard;
