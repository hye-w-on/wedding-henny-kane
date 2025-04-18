import styled from "@emotion/styled";
import { motion } from "framer-motion";

const ProfileCard = styled(motion.div)({
  position: "absolute",
  width: "300px",
  height: "500px",
  backgroundColor: "#fff",
  fontSize: "1.5rem",
  fontWeight: "bold",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "15px",
  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
  padding: "40px 10px 10px 10px",
  background: "rgba(255, 255, 255, 0.5)", // 반투명 배경
  backdropFilter: "blur(5px)", // 블러 효과
  WebkitBackdropFilter: "blur(10px)", // Safari 지원
  backfaceVisibility: "hidden",
  transformOrigin: "center",
  top: 0,
  left: 0,
});

export default ProfileCard;

export const CardHole = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "12px",
        height: "16px",
        width: "80px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: "0",
          backgroundColor: "#121212",
          width: "100%",
          height: "12px",
          borderRadius: "10px",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#121212",
          width: "20px",
          height: "16px",
          borderRadius: "10px",
        }}
      />
    </div>
  );
};
