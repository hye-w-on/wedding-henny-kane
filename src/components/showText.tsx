import styled from "@emotion/styled";
import { motion } from "motion/react";
import { ReactNode } from "react";

interface ShowTextProps {
  children: ReactNode;
  delay?: number;
  noSpace?: boolean;
  isInView?: boolean;
}

const TextWrapper = styled(motion.div)({
  overflow: "hidden",
  display: "inline-block",
  position: "relative",
});

const Text = styled(motion.span)({
  display: "inline-block",
  position: "relative",
  whiteSpace: "pre",
});

export default function ShowText({
  children,
  delay = 0,
  noSpace = false,
  isInView = true,
}: ShowTextProps) {
  return (
    <TextWrapper>
      <Text
        initial={{ y: 50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
        transition={{
          duration: 0.8,
          delay: delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
        {noSpace ? "" : " "}
      </Text>
    </TextWrapper>
  );
}
