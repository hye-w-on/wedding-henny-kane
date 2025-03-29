import styled from "@emotion/styled";
import { motion, useScroll, useSpring } from "motion/react";
import colorToken from "../utils/colorToken";

const ProgressBar = styled(motion.div)({
  position: "fixed",
  top: 0,
  left: 0,
  height: "5px",
  background: colorToken.beige,
  transformOrigin: "left",
  width: "100%",
  zIndex: 10001,
});

const ProgressBarBack = styled(motion.div)({
  position: "fixed",
  top: 0,
  left: 0,
  height: "5px",
  background: "#000",
  width: "100%",
  zIndex: 10000,
});

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <>
      <ProgressBar
        style={{
          scaleX,
        }}
      />
      <ProgressBarBack />
    </>
  );
}

export default ScrollProgressBar;
