import styled from "@emotion/styled";
import { motion } from "motion/react";
import colorToken from "@/utils/colorToken";
import StarSvg from "@/assets/icons/star.svg?react";

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
  gap: 10px;
  margin-top: 10px;
`;

const StarWrapper = styled(motion.div)`
  width: 25px;
  height: 25px;
  color: ${colorToken.white};
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
      <LoaderWrapper>
        {[0, 1, 2].map((index) => (
          <StarWrapper
            key={index}
            initial={{ scale: 1 }}
            animate={{
              scale: [1, 1.3, 1],
              rotate: 180,
              y: [0, -2, 0],
              transition: {
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.3,
              },
            }}
          >
            <StarSvg width="100%" height="100%" />
          </StarWrapper>
        ))}
      </LoaderWrapper>
    </Container>
  );
};

export default Splash;
