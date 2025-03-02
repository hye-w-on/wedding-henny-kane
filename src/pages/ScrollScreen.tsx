import styled from "@emotion/styled";
import { motion } from "motion/react";
import { useEffect, useState, useRef } from "react";
import HeartPage from "../pages/HeartPage";

import "@/assets/styles/fonts.css";
import ProfileScrollPage from "./ProfileScrollPage";
import NamePage from "./NamePage";
import EnvelopePage from "./EnvelopePage";
import WeddingDayCard from "../components/WeddingDayCard";
import LocationPage from "./LocationPage";
import PhotoSlide from "../components/PhotoSlide";
import colorToken from "../utils/colorToken";
import MainFrame from "../pages/common/MainFrame";
import temp3d from "@/assets/images/temp3d.png";
import TimetablePage from "./TimetablePage";

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
  const photoSlideRef = useRef<HTMLDivElement>(null);
  const weddingDayRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);

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
          profileRef,
          photoSlideRef,
          locationRef,
          weddingDayRef,
          envelopeRef,
        }}
      />
      <MovingBackground />
      <Container id="container">
        <Background />
        <div ref={nameCardRef}>
          <NamePage />
        </div>
        <div ref={weddingDayRef}>
          <WeddingDayCard />
        </div>
        <div>
          <TimetablePage />
        </div>
        <div ref={photoSlideRef}>
          <PhotoSlide />
        </div>
        <div ref={locationRef}>
          <LocationPage />
        </div>
        <div ref={profileRef}>
          <ProfileScrollPage />
        </div>
        <div ref={envelopeRef}>
          <EnvelopePage />
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

const MovingBackground = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100vh",
  //backgroundColor: colorToken.babyPink,
  overflow: "hidden",
  zIndex: -1,

  "&::before": {
    content: '"We’re getting married"',
    position: "absolute",
    whiteSpace: "nowrap",
    fontSize: "10rem",
    fontFamily: "helvetica",
    letterSpacing: "-0.08em",
    color: "rgba(0, 0, 0, 1)",
    animation: "slideText 10s linear infinite",
    top: "50%",
    transform: "translateY(-50%)",
  },

  "@keyframes slideText": {
    from: {
      transform: "translateX(0)",
    },
    to: {
      transform: "translateX(-50%)",
    },
  },
});
