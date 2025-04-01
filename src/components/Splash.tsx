import styled from "@emotion/styled";
import { motion } from "framer-motion";
import colorToken from "../utils/colorToken";

const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: ${colorToken.black};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const LoaderWrapper = styled(motion.div)`
  display: flex;
  gap: 8px;
`;

const Dot = styled(motion.div)`
  width: 12px;
  height: 12px;
  background: ${colorToken.white};
  border-radius: 50%;
`;

const dotVariants = {
  initial: {
    y: 0,
  },
  animate: {
    y: [-10, 0, -10],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

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
          <Dot
            key={index}
            variants={dotVariants}
            initial="initial"
            animate="animate"
            transition={{
              delay: index * 0.1,
            }}
          />
        ))}
      </LoaderWrapper>
    </Container>
  );
};

export default Splash;
