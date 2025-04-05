import { memo, useState } from "react";
import styled from "@emotion/styled";
import { motion, LayoutGroup, AnimatePresence } from "motion/react";
import colorToken from "../utils/colorToken";

interface ImageData {
  id: string;
  url: string;
}

const CLOUDFRONT_URL = "https://d2fwec07ipx82e.cloudfront.net/eleven";

interface ImageData {
  id: string;
  url: string;
}

// 100번대 이미지
const group100Images: ImageData[] = Array.from({ length: 5 }, (_, i) => ({
  id: `image1-${i}`,
  url: `${CLOUDFRONT_URL}/eleven${101 + i}.webp`,
}));

// 200번대 이미지
const group200Images: ImageData[] = Array.from({ length: 13 }, (_, i) => ({
  id: `image2-${i + 5}`,
  url: `${CLOUDFRONT_URL}/eleven${201 + i}.webp`,
}));

// 모든 이미지 합치기
const images: ImageData[] = [...group100Images, ...group200Images];

const Container = styled.div`
  background: ${colorToken.black};
  padding: 0px 15px 40px 15px;
`;

const GalleryGrid = styled.ul`
  display: grid;
  list-style: none;
  max-width: 1000px;
  margin: 0 auto;
  /* basic */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  /* tablet */
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }
  /* mobile */
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 8px;
  }
`;

const GalleryItem = styled(motion.li)`
  position: relative;
  aspect-ratio: 20/21;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  contain: paint;
  will-change: transform;
`;

const GalleryImage = styled(motion.img)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  border-radius: 10px;
  will-change: opacity;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10;
`;

const ExpandedImageContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  width: 90vw;
  max-width: 1200px;
  max-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ExpandedImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 1rem;
`;

interface GalleryProps {
  images: ImageData[];
  setSelectedId: (id: string | null) => void;
}

interface ExpandedViewProps {
  image: ImageData;
  onClick: () => void;
}

const GalleryImageComponent = memo(({ src }: { src: string }) => {
  return <GalleryImage src={src} loading="eager" />;
});

function Gallery({ images, setSelectedId }: GalleryProps) {
  return (
    <GalleryGrid>
      {images.map((image) => (
        <GalleryItem
          key={image.id}
          layoutId={image.id}
          onClick={() => setSelectedId(image.id)}
        >
          <GalleryImageComponent src={image.url} />
        </GalleryItem>
      ))}
    </GalleryGrid>
  );
}

function ExpandedView({ image, onClick }: ExpandedViewProps) {
  return (
    <ExpandedImageContainer onClick={onClick}>
      <ExpandedImage layoutId={image.id} src={image.url} />
    </ExpandedImageContainer>
  );
}

const OverlayExpandGallery = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedImage = images.find((img) => img.id === selectedId);

  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: colorToken.white,
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <div style={{ fontFamily: "PPEditorialOldItalic", fontSize: "4rem" }}>
          Gallery
        </div>
        <div
          style={{
            fontFamily: "SUITRegular",
            fontSize: "0.8rem",
            color: "#ffffffaa",
          }}
        >
          클릭하면 확대가 가능합니다
        </div>
      </div>
      <LayoutGroup>
        <Gallery images={images} setSelectedId={setSelectedId} />
        <AnimatePresence>
          {selectedId && selectedImage && (
            <>
              <Overlay
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <ExpandedView
                image={selectedImage}
                onClick={() => setSelectedId(null)}
              />
            </>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </Container>
  );
};

export default OverlayExpandGallery;
