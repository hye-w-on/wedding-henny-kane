import styled from "@emotion/styled";
import { motion, AnimatePresence } from "motion/react";
import { useEffect } from "react";
import colorToken from "../utils/colorToken";
import CancleSvg from "../assets/icons/cancle.svg?react";

interface CustomAlertProps {
  message?: string;
  type?: "success" | "error";
  isOpen?: boolean;
  onClose: () => void;
}

function CustomAlert({
  message = "",
  type = "success",
  isOpen = true,
  onClose,
}: CustomAlertProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [onClose, isOpen]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <AlertContainer
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
        >
          <AlertContent type={type}>
            <AlertMessage>{message}</AlertMessage>
            <CloseButton onClick={onClose}>
              <CancleSvg
                style={{
                  width: "12px",
                  height: "12px",
                  filter: "brightness(0) invert(1)",
                }}
              />
            </CloseButton>
          </AlertContent>
        </AlertContainer>
      )}
    </AnimatePresence>
  );
}

export default CustomAlert;

const AlertContainer = styled(motion.div)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  borderRadius: "5px",
});

const AlertContent = styled.div<{ type: "success" | "error" }>(({ type }) => ({
  display: "flex",
  alignItems: "center",
  padding: "12px 12px",
  borderRadius: "4px",
  backgroundColor: type === "success" ? "#121212" : "#ff4444",
  color: "#fff",
  fontFamily: "KoPubDotum",
  fontSize: "0.8rem",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  minWidth: "200px",
  textAlign: "center",
  position: "relative",
}));

const AlertMessage = styled.div({
  flex: 1,
  textAlign: "center",
  fontWeight: "500",
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
