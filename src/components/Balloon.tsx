import styled from "@emotion/styled";
import { motion } from "motion/react";

const Balloon = styled(motion.div)({
  position: "absolute",
  backgroundColor: "#121212",
  color: "#fff",
  fontSize: "10px",
  fontWeight: 400,
  padding: "4px 10px",
  borderRadius: "10px",
  boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.2)",
  transformOrigin: "bottom center",

  // 화살표
  "&:after": {
    content: '""',
    position: "absolute",
    bottom: "-5px",
    left: "50%",
    transform: "translateX(10%)",
    width: 0,
    height: 0,
    borderLeft: "5px solid transparent",
    borderRight: "5px solid transparent",
    borderTop: "5px solid #19181d",
  },
});

export default Balloon;
