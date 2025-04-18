import { useRef, useState } from "react";
import styled from "@emotion/styled";
import { motion, useInView } from "motion/react";
import colorToken from "@/utils/colorToken";
import ShowText from "@/components/showText";

const CLOUDFRONT_URL = "https://d2fwec07ipx82e.cloudfront.net/yds";

interface ImageData {
  id: string;
  url: string;
}
const images: ImageData[] = Array.from({ length: 4 }, (_, i) => ({
  id: `image-${i}`,
  url: `${CLOUDFRONT_URL}/yds${1 + i}.webp`,
}));

const Container = styled.div`
  background: ${colorToken.black};
  padding: 0px 15px 15px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Slider = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  height: 550px;
  gap: 2px;
  position: relative;
  z-index: 1;
`;

const Slide = styled(motion.div)<{ isSelected: boolean }>`
  flex: ${(props) => (props.isSelected ? 15 : 1)};
  min-width: 0;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: flex 0.7s ease-in-out;
  z-index: 1;
`;

const SlideImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  object-position: center;
  backface-visibility: hidden;
  will-change: transform;
`;

const FlexExpandingSlider = () => {
  const infoRef = useRef(null);
  const isInfoInView = useInView(infoRef, { once: false });
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: colorToken.white,
          gap: "5px",
          marginBottom: "15px",
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
          Film Photos
        </motion.div>
        <motion.div
          style={{
            fontFamily: "SUITRegular",
            fontSize: "0.8rem",
            color: "#ffffffaa",
          }}
        >
          <ShowText isInView={isInfoInView}>
            클릭하면 확장이 가능합니다
          </ShowText>
        </motion.div>
      </div>

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
