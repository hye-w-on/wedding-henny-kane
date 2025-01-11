import styled from "@emotion/styled";
import React, { useState } from "react";
import { SlideUpText } from "./CommonStyled";
import { motion, useScroll, useSpring } from "motion/react";
import ScrollProgressBar from "../../components/ScrollProgressBar";
import colorToken from "../../utils/colorToken";
import StarSvg from "../../assets/icons/star.svg?react";

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box; /* 패딩 포함한 전체 크기 조정 */
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: black;
  z-index: 1000;
`;

const HeaderItem = styled.div`
  font-family: "satoshi";
  font-size: 1.1rem;
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
  "&:last-child": {
    marginBottom: 0,
  },
  variants: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  initial: "hidden",
  animate: isOpen ? "visible" : "hidden",
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
  color: "black",
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
});

const menuVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const MainFrame: React.FC<{ children?: React.ReactNode }> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <ScrollProgressBar />
      <Header>
        <HeaderItem>
          <StarSvg
            style={{ width: "20px", height: "20px", color: colorToken.black }}
          />
        </HeaderItem>
        <HeaderItem onClick={toggleMenu}>Menu</HeaderItem>
      </Header>
      {/* Overlay */}
      <Overlay isOpen={isOpen} onClick={toggleMenu} />
      {/* Menu List */}
      <MenuList
        isOpen={isOpen}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.3, // 각 항목당 0.1초 딜레이
            },
          },
        }}
      >
        {isOpen && (
          <>
            <MenuItem
              onClick={toggleMenu}
              variants={menuVariants}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <SlideUpText>About</SlideUpText>
              <MenuDescription>------------------ 소개</MenuDescription>
            </MenuItem>
            <MenuItem
              onClick={toggleMenu}
              variants={menuVariants}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <MenuDescription>사진 ----------</MenuDescription>
              <SlideUpText>Gallery</SlideUpText>
            </MenuItem>
            <MenuItem
              onClick={toggleMenu}
              variants={menuVariants}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <SlideUpText>Location</SlideUpText>
              <MenuDescription>-- 오시는 길</MenuDescription>
            </MenuItem>
            <MenuItem
              onClick={toggleMenu}
              variants={menuVariants}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <MenuDescription>식순 및 식사--------------</MenuDescription>
              <SlideUpText>Detail</SlideUpText>
            </MenuItem>
            <MenuItem
              onClick={toggleMenu}
              variants={menuVariants}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <SlideUpText>BBS</SlideUpText>
              <MenuDescription>------------------- 축하말</MenuDescription>
            </MenuItem>
          </>
        )}
      </MenuList>
    </>
  );
};

export default MainFrame;
