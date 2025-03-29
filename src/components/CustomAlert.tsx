import styled from "@emotion/styled";
import { motion, AnimatePresence } from "motion/react";
import { useEffect } from "react";
import colorToken from "../utils/colorToken";

interface CustomAlertProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

function CustomAlert({ message, type, onClose }: CustomAlertProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <AlertContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <AlertContent type={type}>
          <AlertMessage>{message}</AlertMessage>
          <CloseButton onClick={onClose}>×</CloseButton>
        </AlertContent>
      </AlertContainer>
    </AnimatePresence>
  );
}

export default CustomAlert;

const AlertContainer = styled(motion.div)({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
});

const AlertContent = styled.div<{ type: "success" | "error" }>(({ type }) => ({
  display: "flex",
  alignItems: "center",
  padding: "12px 24px",
  borderRadius: "4px",
  backgroundColor: type === "success" ? "#121212" : "#ff4444",
  color: "#fff",
  fontFamily: "SUITRegular",
  fontSize: "0.9rem",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  minWidth: "200px",
  textAlign: "center",
  position: "relative",
}));

const AlertMessage = styled.div({
  flex: 1,
  textAlign: "center",
});

const CloseButton = styled.button({
  background: "none",
  border: "none",
  color: "#fff",
  fontSize: "1.2rem",
  cursor: "pointer",
  padding: "0 0 0 12px",
  opacity: 0.8,
  "&:hover": {
    opacity: 1,
  },
}); 