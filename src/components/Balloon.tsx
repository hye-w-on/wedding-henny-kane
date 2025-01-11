import styled from "@emotion/styled";
import { motion } from "motion/react";

const Balloon = styled(motion.div)`
  position: absolute;
  background-color: #19181d;
  color: #f2cedb;
  font-size: 0.8rem;
  font-weight: 400;
  padding: 2px 3px;
  border-radius: 10px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
  transform-origin: bottom center;

  /* 화살표 */
  &:after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(80%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #19181d;
  }
`;

export default Balloon;
