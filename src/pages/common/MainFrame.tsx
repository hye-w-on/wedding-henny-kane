import styled from "@emotion/styled";
import React, { useState } from "react";
import { SlideUpText } from "./CommonStyled";
import { motion, AnimatePresence } from "motion/react";
import ScrollProgressBar from "../../components/ScrollProgressBar";
import colorToken from "../../utils/colorToken";
import StarSvg from "../../assets/icons/star.svg?react";

const Header = styled.header({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "45px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 15px",
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

const MenuList = styled(motion.div)({
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
  zIndex: 999,
});

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
  hidden: { opacity: 0, x: -20, y: 20 },
  visible: { opacity: 1, x: 0, y: 0 },
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const HeaderText = styled(motion.span)({
  display: "inline-block",
});

const headerTextVariants = {
  initial: {
    opacity: 0,
    x: -20,
    filter: "blur(10px)",
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    x: 0,
  },
  exit: {
    opacity: 0,
    filter: "blur(10px)",
    x: 20,
  },
};

interface MainFrameProps {
  scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
  refs: {
    nameCardRef: React.RefObject<HTMLDivElement>;
    envelopeRef: React.RefObject<HTMLDivElement>;
    locationRef: React.RefObject<HTMLDivElement>;
    timetableRef: React.RefObject<HTMLDivElement>;
    profileRef: React.RefObject<HTMLDivElement>;
    galleryRef: React.RefObject<HTMLDivElement>;
    contactRef: React.RefObject<HTMLDivElement>;
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
    <div>
      <ScrollProgressBar />
      <Header>
        <HeaderItem>
          <StarSvg
            style={{ width: "20px", height: "20px", color: colorToken.black }}
            onClick={() => handleMenuClick(refs.nameCardRef)}
          />
        </HeaderItem>
        <HeaderItem onClick={toggleMenu}>
          <AnimatePresence mode="wait">
            <HeaderText
              key={isOpen ? "close" : "menu"}
              variants={headerTextVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              {isOpen ? "CLOSE" : "MENU"}
            </HeaderText>
          </AnimatePresence>
        </HeaderItem>
      </Header>

      <Overlay isOpen={showOverlay} />
      <AnimatePresence>
        {isOpen && (
          <MenuList
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.5 }}
          >
            <MenuItem
              variants={menuVariants}
              transition={{ duration: 0.3 }}
              onClick={() => handleMenuClick(refs.envelopeRef)}
            >
              <SlideUpText>RSVP</SlideUpText>
              <MenuDescription>참석회신</MenuDescription>
            </MenuItem>
            <MenuItem
              variants={menuVariants}
              transition={{ duration: 0.3 }}
              onClick={() => handleMenuClick(refs.locationRef)}
            >
              <SlideUpText>Location</SlideUpText>
              <MenuDescription>오시는 길</MenuDescription>
            </MenuItem>
            <MenuItem
              variants={menuVariants}
              transition={{ duration: 0.3 }}
              onClick={() => handleMenuClick(refs.timetableRef)}
            >
              <MenuDescription>식순</MenuDescription>
              <SlideUpText>TIMETABLE</SlideUpText>
            </MenuItem>
            <MenuItem
              variants={menuVariants}
              transition={{ duration: 0.3 }}
              onClick={() => handleMenuClick(refs.profileRef)}
            >
              <SlideUpText>About</SlideUpText>
              <MenuDescription>소개</MenuDescription>
            </MenuItem>
            <MenuItem
              variants={menuVariants}
              transition={{ duration: 0.3 }}
              onClick={() => handleMenuClick(refs.galleryRef)}
            >
              <MenuDescription>사진</MenuDescription>
              <SlideUpText>Gallery</SlideUpText>
            </MenuItem>
            <MenuItem
              variants={menuVariants}
              transition={{ duration: 0.3 }}
              onClick={() => handleMenuClick(refs.contactRef)}
            >
              <SlideUpText>CONTACT</SlideUpText>
              <MenuDescription>연락</MenuDescription>
            </MenuItem>
          </MenuList>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainFrame;
