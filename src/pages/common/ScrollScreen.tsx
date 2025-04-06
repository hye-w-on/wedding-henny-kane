import styled from "@emotion/styled";
import { useRef } from "react";
import ProfileScrollPage from "@/pages/ProfileScrollPage";
import NamePage from "@/pages/NamePage";
import EnvelopePage from "@/pages/EnvelopePage";
import WeddingDayPage from "@/pages/WeddingDayPage";
import LocationPage from "@/pages/LocationPage";
import colorToken from "@/utils/colorToken";
import MainFrame from "@/pages/common/MainFrame";
import TimetablePage from "@/pages/TimetablePage";
import ContactPage from "@/pages/ContactPage";
import PhotoSlideCard from "@/components/PhotoSlideCard";
import OverlayExpandGallery from "@/pages/OverlayExpandGallery";
import FlexExpandGallery from "@/pages/FlexExpandGallery";
import CarouselGallery from "@/pages/CarouselGallery";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "100%",
  maxWidth: "100vw",
  margin: 0,
  padding: 0,
  boxSizing: "border-box",
  zIndex: 1,
  position: "relative",
  msOverflowStyle: "none",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  touchAction: "pan-y",
});

const ScrollScreen: React.FC = () => {
  const nameCardRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const timetableRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <MainFrame
        scrollToSection={scrollToSection}
        refs={{
          nameCardRef,
          profileRef,
          galleryRef,
          locationRef,
          timetableRef,
          envelopeRef,
          contactRef,
        }}
      />
      <MovingBackground />
      <Container id="container">
        <Background />
        <div ref={nameCardRef}>
          <NamePage />
        </div>
        <div>
          <WeddingDayPage />
        </div>
        <div>
          <PhotoSlideCard />
        </div>
        <div ref={envelopeRef}>
          <EnvelopePage />
        </div>
        <div ref={locationRef}>
          <LocationPage />
        </div>
        <div ref={timetableRef}>
          <TimetablePage />
        </div>
        <div ref={profileRef}>
          <ProfileScrollPage />
        </div>
        <div ref={galleryRef}>
          <OverlayExpandGallery />
        </div>
        <div>
          <FlexExpandGallery />
        </div>
        <div>
          <CarouselGallery />
        </div>
        <div ref={contactRef}>
          <ContactPage />
        </div>
      </Container>
    </>
  );
};

export default ScrollScreen;

const Background = styled.div({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100vh",
  zIndex: -2,

  "--hdr-gradient": `radial-gradient(
    farthest-side circle at 59% 40% in oklch,
    oklch(100% 0 0) 63% 63%,
    62%,
    oklch(100% 0.01 360) 45% 45%,
    73%,
    oklch(93% 0.08 294) 76% 83%,
    92%,
    oklch(100% 0.01 0) 100%
  )`,
  "--sdr-gradient": `radial-gradient(
    farthest-side circle at 59% 40%,
    #fff 63% 63%,
    62%,
    #fffcff 45% 45%,
    73%,
    #eadeff 76% 83%,
    92%,
    #fffcff 100%
  )`,
  //background: "var(--hdr-gradient)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
});

const MovingBackground = styled("div")`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${colorToken.gray100};
  overflow: hidden;
  z-index: -1;

  &::before {
    content: "We're getting married";
    position: absolute;
    white-space: nowrap;
    font-size: 10rem;
    font-family: helvetica;
    letter-spacing: -0.08em;
    color: rgba(0, 0, 0, 1);
    animation: moveText 20s linear infinite;
    top: 50%;
    transform: translateY(-50%);
  }

  @keyframes moveText {
    0% {
      transform: translate(0, -50%);
    }
    25% {
      transform: translate(-25%, -50%);
    }
    50% {
      transform: translate(-50%, -50%);
    }
    75% {
      transform: translate(-25%, -50%);
    }
    100% {
      transform: translate(0, -50%);
    }
  }
`;
