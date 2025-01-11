import styled from "@emotion/styled";
import { motion, useScroll, useSpring } from "motion/react";

const ProgressBar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: #fff4fd;
  transform-origin: left; /* 왼쪽에서 시작 */
  width: 100%; /* 기본 너비 설정 */
  z-index: 10001;
`;
const ProgressBarBack = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: #000;
  width: 100%; /* 기본 너비 설정 */
  z-index: 10000;
`;

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
