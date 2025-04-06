import styled from "@emotion/styled";
import React, { useState, useRef } from "react";
import { SlideUpText } from "./CommonStyled";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import ScrollProgressBar from "../../components/ScrollProgressBar";
import colorToken from "../../utils/colorToken";
import StarSvg from "../../assets/icons/star.svg?react";
import CrushSvg from "@/assets/icons/crush.svg?react";
import HeartSvg from "@/assets/icons/heart.svg?react";

const Header = styled.header({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "45px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 20px",
  boxSizing: "border-box",
  //backgroundColor: "rgba(255, 255, 255, 0.1)",
  //backdropFilter: "blur(10px)",
  color: "black",
  zIndex: 1000,
});

const HeaderItem = styled.div({
  fontFamily: "satoshi",
  fontSize: "0.9rem",
  fontWeight: 100,
  cursor: "pointer",
});

const Overlay = styled.div<{ isOpen: boolean }>(({ isOpen }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  opacity: isOpen ? 1 : 0,
  visibility: isOpen ? "visible" : "hidden",
  backdropFilter: "blur(10px)",
  transition: "opacity 0.3s ease, visibility 0.3s ease",
  zIndex: 998,
}));

const MenuList = styled(motion.div)<{ isOpen: boolean }>(({ isOpen }) => ({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "8px",
  padding: "20px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  opacity: isOpen ? 1 : 0,
  visibility: isOpen ? "visible" : "hidden",
  transition: "opacity 0.3s ease, visibility 0.3s ease",
  zIndex: 999,
}));

const MenuItem = styled(motion.div)({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-end",
  //justifyContent: "flex-end",
  fontFamily: "helvetica",
  fontSize: "4rem",
  lineHeight: "0.7em",
  letterSpacing: "-0.06em",
  color: colorToken.white,
  cursor: "pointer",
  textTransform: "uppercase",
});

const MenuDescription = styled(motion.div)({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-end",
  justifyContent: "flex-end",
  fontFamily: "SUITRegular",
  fontSize: "0.8rem",
  color: "#fff",
  letterSpacing: "-0.1em",
  lineHeight: 1,
  paddingBottom: "5px",
  margin: "auto 5px",
});

const menuVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

interface MainFrameProps {
  scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
  refs: {
    profileRef: React.RefObject<HTMLDivElement>;
    galleryRef: React.RefObject<HTMLDivElement>;
    locationRef: React.RefObject<HTMLDivElement>;
    weddingDayRef: React.RefObject<HTMLDivElement>;
    envelopeRef: React.RefObject<HTMLDivElement>;
  };
}

const MainFrame: React.FC<MainFrameProps> = ({ scrollToSection, refs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setShowOverlay(!showOverlay);
  };

  const handleMenuClick = (ref: React.RefObject<HTMLDivElement>) => {
    setIsOpen(false);
    scrollToSection(ref);

    setTimeout(() => {
      setShowOverlay(false);
    }, 500);
  };

  return (
    <>
      <ScrollProgressBar />
      <Header>
        <HeaderItem>
          <StarSvg
            style={{ width: "20px", height: "20px", color: colorToken.black }}
          />
        </HeaderItem>
        <HeaderItem onClick={toggleMenu}>MENU</HeaderItem>
      </Header>

      <Overlay isOpen={showOverlay} />

      <MenuList isOpen={isOpen}>
        <MenuItem
          onClick={() => handleMenuClick(refs.locationRef)}
          variants={menuVariants}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <SlideUpText>Location</SlideUpText>
          <MenuDescription>오시는 길</MenuDescription>
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuClick(refs.weddingDayRef)}
          variants={menuVariants}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <MenuDescription>식순</MenuDescription>
          <SlideUpText>TIMETABLE</SlideUpText>
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuClick(refs.profileRef)}
          variants={menuVariants}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <SlideUpText>About</SlideUpText>
          <MenuDescription>소개</MenuDescription>
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuClick(refs.galleryRef)}
          variants={menuVariants}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <MenuDescription>사진</MenuDescription>
          <SlideUpText>Gallery</SlideUpText>
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuClick(refs.envelopeRef)}
          variants={menuVariants}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <SlideUpText>CONTACT</SlideUpText>
          <MenuDescription>연락</MenuDescription>
        </MenuItem>
      </MenuList>
      {/*
      <div style={{ position: "relative" }}>
        <CrushSvg
          style={{
            position: "absolute",
            top: -2,
            left: 8,
            width: "50px",
            height: "50px",
            color: "#ffffff",
            zIndex: 2,
          }}
        />
        <HeartSvg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "50px",
            height: "50px",
            color: colorToken.black,
            zIndex: 1,
          }}
        />
                  <CrushSvg
            style={{
              width: "40px",
              height: "40px",
              color: "#000",
            }}
          />
      </div>*/}
    </>
  );
};

export default MainFrame;
