import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const slideUp = keyframes`
  0% {
    transform: translateY(200%); /* 시작 위치: 아래 */
    opacity: 0; /* 투명 */
  }
  100% {
    transform: translateY(0); /* 최종 위치 */
    opacity: 1; /* 불투명 */
  }
`;

const SlideUpText = styled.p`
  display: inline-block;
  overflow: hidden;
  transform: translateY(100%);
  animation: ${slideUp} 1s ease-out forwards;
`;

export { SlideUpText };
