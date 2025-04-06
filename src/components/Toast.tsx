import { motion, AnimatePresence } from "motion/react";
import styled from "@emotion/styled";

interface ToastProps {
  message: string;
  isVisible: boolean;
}

const ToastContainer = styled(motion.div)({
  position: "fixed",
  bottom: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  textAlign: "center",
  margin: "0 auto",
  zIndex: 9999,
  whiteSpace: "nowrap",
});

export default function Toast({ message, isVisible }: ToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <ToastContainer
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          <div
            style={{
              minWidth: "300px",
              background: "rgba(0, 0, 0, 0.8)",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              fontSize: "14px",
              fontFamily: "SUITRegular",
            }}
          >
            {message}
          </div>
        </ToastContainer>
      )}
    </AnimatePresence>
  );
}
