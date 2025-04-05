import styled from "@emotion/styled";
import { motion } from "motion/react";

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
  animation: "slide 40s linear infinite",
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
  width: "100%",
  maxWidth: "600px",
  height: "280px",
  background: colorToken.realBlack,
  borderRadius: "40%",
  overflow: "hidden",
  boxShadow: "0 0 5px 3px rgba(0, 0, 0)",
});

function PhotoSlideCard() {
  const CLOUDFRONT_URL = "https://d2fwec07ipx82e.cloudfront.net";

  interface ImageData {
    id: string;
    url: string;
  }

  const group100Images: ImageData[] = Array.from({ length: 5 }, (_, i) => ({
    id: `image1-${i}`,
    url: `${CLOUDFRONT_URL}/eleven/eleven${101 + i}.webp`,
  }));

  // 200번대 이미지
  const group200Images: ImageData[] = Array.from({ length: 13 }, (_, i) => ({
    id: `image2-${i + 5}`,
    url: `${CLOUDFRONT_URL}/eleven/eleven${201 + i}.webp`,
  }));
  const group300Images: ImageData[] = Array.from({ length: 4 }, (_, i) => ({
    id: `image3-${i + 5}`,
    url: `${CLOUDFRONT_URL}/yds/yds${1 + i}.webp`,
  }));

  // 모든 이미지 합치기
  const images: ImageData[] = [
    ...group100Images,
    ...group200Images,
    ...group300Images,
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: colorToken.white,
        padding: "20px",
      }}
    >
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
            {images.map((photo) => (
              <ImageContainer key={`first-${photo.id}`}>
                <Image src={photo.url} />
              </ImageContainer>
            ))}
            {images.map((photo, index) => (
              <ImageContainer key={`second-${photo.id}`}>
                <Image src={photo.url} />
              </ImageContainer>
            ))}
          </SlidingContainer>
        </ImageWrapper>
      </Card>
    </div>
  );
}

export default PhotoSlideCard;
