import React, { useState, TouchEvent } from "react";
import "./styles.css";
import { AnimatePresence, motion } from "motion/react";
import { SlideUpText } from "./common/CommonStyled";

const PageOne: React.FC = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: "#ffddcc",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Page 1</h1>
        <SlideUpText>This is the first page.</SlideUpText>
      </div>
    </>
  );
};

const PageTwo = () => (
  <div
    style={{
      backgroundColor: "#ccffdd",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <h1>Page 2</h1>
    <SlideUpText>This is the 2 page.</SlideUpText>
  </div>
);

const SwipeableScreen: React.FC = () => {
  const [page, setPage] = useState(0);
  const maxPages = 3;

  const handleNextPage = () => {
    setPage((prev) => (prev + 1) % maxPages);
  };

  const handlePrevPage = () => {
    setPage((prev) => (prev - 1 + maxPages) % maxPages);
  };

  // Wheel event for desktop
  const handleWheel = (event: React.WheelEvent) => {
    if (event.deltaY > 0) {
      handleNextPage();
    } else {
      handlePrevPage();
    }
  };

  // Touch events for mobile
  let startY = 0;

  const handleTouchStart = (event: TouchEvent) => {
    startY = event.touches[0].clientY;
  };

  const handleTouchEnd = (event: TouchEvent) => {
    const endY = event.changedTouches[0].clientY;
    const deltaY = startY - endY;

    if (deltaY > 50) {
      handleNextPage();
    } else if (deltaY < -50) {
      handlePrevPage();
    }
  };

  // 페이지 배열에 각 컴포넌트 추가
  const pages = [<PageOne key={0} />, <PageTwo key={1} />];

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      y: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <div
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        width: "100vh",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <AnimatePresence custom={page}>
        <motion.div
          key={page}
          custom={page}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
          }}
        >
          {pages[page]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SwipeableScreen;
