import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import photo01 from "@/assets/photos/photo01.webp";
import photo02 from "@/assets/photos/photo02.webp";
import photo03 from "@/assets/photos/photo03.webp";
import photo04 from "@/assets/photos/photo04.webp";
import photo05 from "@/assets/photos/photo05.webp";
import photo06 from "@/assets/photos/photo06.webp";

import { useState } from "react";

const slideAnimation = keyframes({
  "0%": {
    transform: "translateX(0)",
  },
  "100%": {
    transform: "translateX(calc(-50% - 5px))",
  },
});

const Wrapper = styled("div")({
  width: "100%",
  height: "300px",
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
  perspective: "1000px",
});

const SlideTrack = styled("div")<{ isPaused: boolean }>(({ isPaused }) => ({
  display: "flex",
  gap: "5px",
  animation: `${String(slideAnimation)} 2s linear infinite`,
  animationPlayState: isPaused ? "paused" : "running",
  transform: "translateX(0)",
  willChange: "transform",
  backfaceVisibility: "hidden",
}));

const Image = styled("img")({
  borderRadius: "10px",
  flexShrink: 0,
  width: "100px",
  height: "150px",
  objectFit: "cover",
  objectPosition: "center",
  overflow: "hidden",
});

function PhotoSlide() {
  const [isPaused, setIsPaused] = useState(false);
  const images = [
    { src: photo01 },
    { src: photo02 },
    { src: photo03 },
    { src: photo04 },
    { src: photo05 },
    { src: photo06 },
  ];

  const handleClick = () => {
    setIsPaused(!isPaused);
  };

  return (
    <Wrapper>
      <SlideTrack isPaused={isPaused} onClick={handleClick}>
        {images.map((img, index) => (
          <Image key={index} src={img.src} alt={`slide-${index}`} />
        ))}
        {images.map((img, index) => (
          <Image
            key={`clone-${index}`}
            src={img.src}
            alt={`slide-clone-${index}`}
          />
        ))}
      </SlideTrack>
    </Wrapper>
  );
}

export default PhotoSlide;
