import styled from "@emotion/styled";
import { motion } from "motion/react";
const ProfileCard = styled(motion.div)({
  width: "90%",
  height: "600px",
  backgroundColor: "#fff",
  color: "white",
  fontSize: "1.5rem",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "15px",
  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
});
export default ProfileCard;
