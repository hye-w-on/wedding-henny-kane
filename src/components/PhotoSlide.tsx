import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import photo01 from "@/assets/photos/photo01.png";
import photo02 from "@/assets/photos/photo02.png";
import photo03 from "@/assets/photos/photo03.png";
import photo04 from "@/assets/photos/photo04.png";
import photo05 from "@/assets/photos/photo05.png";
import photo06 from "@/assets/photos/photo06.png";

import { useState } from "react";

const slideAnimation = keyframes({
  "0%": {
    transform: "translate3d(0, 0, 0)",
  },
  "100%": {
    transform: "translate3d(-50%, 0, 0)",
  },
});

const Wrapper = styled("div")({
  width: "100%",
  height: "300px",
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
  perspective: "1000px", // 3D 렌더링 컨텍스트 생성
});

const SlideTrack = styled("div")<{ isPaused: boolean }>(({ isPaused }) => ({
  display: "flex",
  gap: "0px",
  animation: `${String(slideAnimation)} 10s linear infinite`,
  animationPlayState: isPaused ? "paused" : "running",
  transform: "translate3d(0, 0, 0)", // GPU 가속 활성화
  willChange: "transform", // 성능 최적화
  backfaceVisibility: "hidden", // 렌더링 최적화
}));

interface ImageItemProps {
  width?: number;
  height?: number;
}

const ImageItem = styled("div")<ImageItemProps>(
  ({ width = 200, height = 200 }) => ({
    width: `${width}px`,
    height: `${height}px`,
    flexShrink: 0,
    cursor: "pointer",
    transform: "translate3d(0, 0, 0)",
    backfaceVisibility: "hidden",
    overflow: "hidden", // 넘치는 부분 숨김
    display: "flex", // Flex 컨테이너로 설정
    alignItems: "center", // 세로 중앙 정렬
  })
);

const Image = styled("img")({
  width: "100%", // 가로 길이에 맞춤
  height: "auto", // 비율 자동 유지
  objectFit: "cover",
  objectPosition: "center", // 중앙 기준으로 잘림
  minWidth: "100%",
  minHeight: "100%",
  backfaceVisibility: "hidden",
});

function PhotoSlide() {
  const [isPaused, setIsPaused] = useState(false);
  const images = [
    { src: photo01, width: 150, height: 300 },
    { src: photo02, width: 150, height: 300 },
    { src: photo03, width: 150, height: 300 },
    { src: photo04, width: 150, height: 300 },
    { src: photo05, width: 150, height: 300 },
    { src: photo06, width: 150, height: 300 },
  ];

  const handleClick = () => {
    setIsPaused(!isPaused);
  };

  return (
    <Wrapper>
      <SlideTrack isPaused={isPaused} onClick={handleClick}>
        {images.map((img, index) => (
          <ImageItem key={index} width={img.width} height={img.height}>
            <Image src={img.src} alt={`slide-${index}`} />
          </ImageItem>
        ))}
        {images.map((img, index) => (
          <ImageItem
            key={`clone-${index}`}
            width={img.width}
            height={img.height}
          >
            <Image src={img.src} alt={`slide-clone-${index}`} />
          </ImageItem>
        ))}
      </SlideTrack>
    </Wrapper>
  );
}

export default PhotoSlide;
