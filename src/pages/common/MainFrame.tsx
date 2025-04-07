import styled from "@emotion/styled";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import colorToken from "@/utils/colorToken";
import StarSvg from "@/assets/icons/star.svg?react";

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
  //background-color: rgba(255, 255, 255, 0.1);
  //backdrop-filter: blur(10px);
  color: black;
  z-index: 1000;
`;

const HeaderItem = styled.div`
  font-family: satoshi;
  font-size: 0.9rem;
  font-weight: 100;
  cursor: pointer;
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  backdrop-filter: blur(10px);
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 998;
`;

const MenuList = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 999;
`;

const MenuItem = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  font-family: helvetica;
  font-size: 4rem;
  height: 40px;
  //border: 1px solid red;
  letter-spacing: -0.08em;
  color: ${colorToken.white};
  cursor: pointer;
  text-transform: uppercase;
  margin: 5px 0;
  position: relative;
`;

const MenuItemText = styled.div`
  display: inline-block;
  height: 100%;
  padding: 0px 0;
`;

const MenuDescription = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  font-family: SUITRegular;
  font-size: 0.8rem;
  color: #fff;
  letter-spacing: -0.1em;
  line-height: 1;
  padding-bottom: 5px;
  margin: auto 5px;
`;

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

const HeaderText = styled(motion.span)`
  display: inline-block;
`;

const headerTextVariants = {
  initial: {
    opacity: 0,
    x: -20,
    filter: "blur(10px)",
  },
  animate: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    x: 20,
    filter: "blur(10px)",
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
              whileTap={{ scale: 0.9 }}
              onClick={() => handleMenuClick(refs.envelopeRef)}
            >
              <MenuItemText>RSVP</MenuItemText>
              <MenuDescription>참석회신</MenuDescription>
            </MenuItem>
            <MenuItem
              variants={menuVariants}
              transition={{ duration: 0.3 }}
              onClick={() => handleMenuClick(refs.locationRef)}
              whileTap={{ scale: 0.9 }}
            >
              <MenuItemText>LOCATION</MenuItemText>
              <MenuDescription>오시는 길</MenuDescription>
            </MenuItem>
            <MenuItem
              variants={menuVariants}
              transition={{ duration: 0.3 }}
              onClick={() => handleMenuClick(refs.timetableRef)}
              whileTap={{ scale: 0.9 }}
            >
              <MenuDescription>식순</MenuDescription>
              <MenuItemText>TIMETABLE</MenuItemText>
            </MenuItem>
            <MenuItem
              variants={menuVariants}
              transition={{ duration: 0.3 }}
              onClick={() => handleMenuClick(refs.profileRef)}
              whileTap={{ scale: 0.9 }}
            >
              <MenuItemText>ABOUT</MenuItemText>
              <MenuDescription>소개</MenuDescription>
            </MenuItem>
            <MenuItem
              variants={menuVariants}
              transition={{ duration: 0.3 }}
              onClick={() => handleMenuClick(refs.galleryRef)}
              whileTap={{ scale: 0.9 }}
            >
              <MenuDescription>사진</MenuDescription>
              <MenuItemText>GALLERY</MenuItemText>
            </MenuItem>
            <MenuItem
              variants={menuVariants}
              transition={{ duration: 0.3 }}
              onClick={() => handleMenuClick(refs.contactRef)}
              whileTap={{ scale: 0.9 }}
            >
              <MenuItemText>CONTACT</MenuItemText>
              <MenuDescription>연락</MenuDescription>
            </MenuItem>
            <div
              style={{
                position: "fixed",
                bottom: "20px",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                textAlign: "center",
                fontSize: "0.8rem",
                color: colorToken.white,
                fontFamily: "integralCF",
              }}
            >
              made by <br />
              hyewon and myeongjin
            </div>
          </MenuList>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainFrame;
