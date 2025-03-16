import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/colors.css";

import App from "./App";

createRoot(document.getElementById("root")!).render(
  // <StrictMode> 주석 처리
  <App />
  // </StrictMode>
);
