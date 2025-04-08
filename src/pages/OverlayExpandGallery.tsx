import { memo, useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import {
  motion,
  LayoutGroup,
  AnimatePresence,
  useInView,
  PanInfo,
} from "motion/react";
import colorToken from "@/utils/colorToken";
import ShowText from "@/components/showText";

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
  padding: 50px 15px 40px 15px;
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
  z-index: 999999;
`;

const ExpandedWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000000;
`;

const ExpandedImageContainer = styled(motion.div)`
  width: 90vw;
  max-width: 1200px;
  max-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  touch-action: none;
`;

const ExpandedImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 1rem;
`;

const InfoContainer = styled(motion.div)`
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 1000001;
  font-family: "SUITRegular";
  font-size: 0.8rem;
  color: #ffffffaa;
`;

// 새로운 스타일 컴포넌트 추가
const ClickArea = styled.div<{ position: 'left' | 'center' | 'right' }>`
  position: absolute;
  top: 0;
  bottom: 0;
  ${({ position }) => {
    switch (position) {
      case 'left':
        return `
          left: 0;
          width: 25%;
          cursor: w-resize;
        `;
      case 'right':
        return `
          right: 0;
          width: 25%;
          cursor: e-resize;
        `;
      case 'center':
        return `
          left: 25%;
          width: 50%;
          cursor: zoom-out;
        `;
    }
  }}
`;

const LockScrollStyle = styled.div<{ isLocked: boolean }>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  z-index: 999998;
  display: ${props => props.isLocked ? 'block' : 'none'};
`;

interface GalleryProps {
  images: ImageData[];
  setSelectedId: (id: string | null) => void;
}

interface ExpandedViewProps {
  image: ImageData;
  onClick: () => void;
  onNext: () => void;
  onPrev: () => void;
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
          whileTap={{ scale: 1.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <GalleryImageComponent src={image.url} />
        </GalleryItem>
      ))}
    </GalleryGrid>
  );
}

function ExpandedView({ image, onClick, onNext, onPrev }: ExpandedViewProps) {
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const SWIPE_THRESHOLD = 50;
    if (info.offset.x > SWIPE_THRESHOLD) {
      onPrev();
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      onNext();
    }
  };

  return (
    <ExpandedWrapper>
      <ExpandedImageContainer
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        dragElastic={0.2}
      >
        <ExpandedImage layoutId={image.id} src={image.url} />
        <ClickArea position="left" onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }} />
        <ClickArea position="center" onClick={(e) => {
          e.stopPropagation();
          onClick();
        }} />
        <ClickArea position="right" onClick={(e) => {
          e.stopPropagation();
          onNext();
        }} />
      </ExpandedImageContainer>
    </ExpandedWrapper>
  );
}

const OverlayExpandGallery = () => {
  const infoRef = useRef(null);
  const isInfoInView = useInView(infoRef, { once: false });
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedImage = images.find((img) => img.id === selectedId);

  // Overlay가 표시될 때 body 스크롤 제어
  useEffect(() => {
    const handleScroll = (e: Event) => {
      if (selectedId) {
        e.preventDefault();
        window.scrollTo(window.scrollX, window.scrollY);
      }
    };

    if (selectedId) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      window.addEventListener('scroll', handleScroll, { passive: false });
      window.addEventListener('touchmove', handleScroll, { passive: false });
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [selectedId]);

  const handleNext = () => {
    if (!selectedId) return;
    const currentIndex = images.findIndex((img) => img.id === selectedId);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedId(images[nextIndex].id);
  };

  const handlePrev = () => {
    if (!selectedId) return;
    const currentIndex = images.findIndex((img) => img.id === selectedId);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedId(images[prevIndex].id);
  };

  return (
    <>
      <Container>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: colorToken.white,
            gap: "11px",
            marginBottom: "15px",
          }}
          ref={infoRef}
        >
          <motion.div
            style={{ fontFamily: "PPEditorialOldItalic", fontSize: "4rem" }}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{
              opacity: isInfoInView ? 1 : 0,
              x: isInfoInView ? 0 : -20,
              filter: isInfoInView ? "blur(0px)" : "blur(10px)",
            }}
            transition={{ duration: 0.5 }}
          >
            Gallery
          </motion.div>
          <motion.div
            style={{
              fontFamily: "SUITRegular",
              fontSize: "0.8rem",
              color: "#ffffffaa",
            }}
          >
            <ShowText isInView={isInfoInView}>
              클릭하면 확대가 가능합니다
            </ShowText>
          </motion.div>
        </div>
        <LayoutGroup>
          <Gallery images={images} setSelectedId={setSelectedId} />
        </LayoutGroup>
      </Container>
      <AnimatePresence>
        {selectedId && selectedImage && (
          <>
            <LockScrollStyle isLocked={!!selectedId} />
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <InfoContainer 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ gap: "3px" }}
            >
              <ShowText isInView={true}>
              이미지를 넘기려면 양끝을 클릭하거나 스와이프하세요
              </ShowText>
              <ShowText isInView={true}>
              이미지 닫으려면 중앙을 클릭하세요 
              </ShowText>
            </InfoContainer>
            <ExpandedView
              image={selectedImage}
              onClick={() => setSelectedId(null)}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default OverlayExpandGallery;
