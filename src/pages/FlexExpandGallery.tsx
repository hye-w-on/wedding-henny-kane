import { useState } from "react";
import styled from "@emotion/styled";
import { motion } from "motion/react";
import colorToken from "../utils/colorToken";

const CLOUDFRONT_URL = "https://d2fwec07ipx82e.cloudfront.net/yds";

interface ImageData {
  id: string;
  url: string;
}

// 100번대 이미지
const images: ImageData[] = Array.from({ length: 4 }, (_, i) => ({
  id: `image-${i}`,
  url: `${CLOUDFRONT_URL}/yds${1 + i}.webp`,
}));

const Container = styled.div`
  background: ${colorToken.black};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Slider = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  height: 550px;
  gap: 2px;
`;

const Slide = styled(motion.div)<{ isSelected: boolean }>`
  flex: ${(props) => (props.isSelected ? 15 : 1)};
  min-width: 0;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: flex 0.7s ease-in-out;
`;

const SlideImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block; /* inline-image 깨짐 방지 */
  object-position: center;
  backface-visibility: hidden;
  will-change: transform;
`;

const FlexExpandingSlider = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <Container>
      <Slider>
        {images.map((image) => {
          const isSelected = selectedId === image.id;

          return (
            <Slide
              key={image.id}
              isSelected={isSelected}
              onClick={() => setSelectedId(isSelected ? null : image.id)}
              layout
            >
              <SlideImage src={image.url} layout />
            </Slide>
          );
        })}
      </Slider>
    </Container>
  );
};

export default FlexExpandingSlider;
