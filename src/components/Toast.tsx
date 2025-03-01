import { motion, AnimatePresence } from "motion/react";
import styled from "@emotion/styled";

interface ToastProps {
  message: string;
  isVisible: boolean;
}

const ToastContainer = styled(motion.div)({
  position: "fixed",
  bottom: "40px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "fit-content",
  textAlign: "center",
  margin: "0 auto",
  zIndex: 9999,
  background: "rgba(0, 0, 0, 0.7)",
  color: "white",
  padding: "10px 20px",
  borderRadius: "8px",
  fontSize: "14px",
  fontFamily: "SUITRegular",
});

export default function Toast({ message, isVisible }: ToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <ToastContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
        >
          {message}
        </ToastContainer>
      )}
    </AnimatePresence>
  );
}
