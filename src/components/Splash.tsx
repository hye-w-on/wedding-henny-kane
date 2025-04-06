import styled from "@emotion/styled";
import { motion } from "motion/react";
import colorToken from "@/utils/colorToken";

const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: ${colorToken.realBlack};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const LoaderWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  display: flex;
  gap: 6px;
  margin-top: 11px;
`;

const Dot = styled(motion.div)`
  width: 11px;
  height: 11px;
  background: ${colorToken.white};
  border-radius: 50%;
`;

const containerVariants = {
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

interface PreloaderProps {
  isLoading: boolean;
}

const Splash = ({ isLoading }: PreloaderProps) => {
  if (!isLoading) return null;

  return (
    <Container
      initial={{ opacity: 1 }}
      exit="exit"
      variants={containerVariants}
    >
      <img src="/logo.webp" alt="logo" />
      <LoaderWrapper>
        {[0, 1, 2].map((index) => (
          <Dot
            key={index}
            initial="initial"
            animate={{
              y: [0, -10, 0],
              transition: {
                duration: 0.7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2,
              },
            }}
          />
        ))}
      </LoaderWrapper>
    </Container>
  );
};

export default Splash;
