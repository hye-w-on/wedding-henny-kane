import styled from "styled-components";
import { motion } from "framer-motion";

const GalleryItem = styled(motion.li)`
  position: relative;
  aspect-ratio: 1/1; /* 정사각형 비율로 변경 */
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;

  /* tablet */
  @media (max-width: 768px) {
    aspect-ratio: 3/4; /* 태블릿에서는 세로로 좀 더 길게 */
  }

  /* mobile */
  @media (max-width: 480px) {
    aspect-ratio: 1/1; /* 모바일에서는 다시 정사각형으로 */
  }
`;

export default GalleryItem;
