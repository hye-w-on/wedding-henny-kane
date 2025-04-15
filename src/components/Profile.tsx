import {
  Chart,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { useRef, useState } from "react";
import colorToken from "../utils/colorToken";
import IdGroom from "@/assets/images/id_kane.webp";
import IdBride from "@/assets/images/id_henny.webp";
import { motion } from "motion/react";
import Star5Svg from "@/assets/icons/star5.svg?react";

Chart.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface ProfileProps {
  isVisible?: boolean;
  type: "groom" | "bride";
}

function Profile({ isVisible, type }: ProfileProps) {
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "18px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "helvetica",
            fontWeight: "bold",
            fontSize: "12px",
            color: colorToken.black,
            //backgroundColor: colorToken.black,
            border: "1px solid #121212",
            borderRadius: "40%",
            lineHeight: "0.6em",
            letterSpacing: "-0.05em",
            marginBottom: "8px",
          }}
        >
          {type === "groom" ? "GROOM" : "BRIDE"}
        </div>
        <div
          style={{
            fontFamily: "helvetica",
            fontWeight: "bold",
            fontSize: "32px",
            color: colorToken.black,
            lineHeight: "0.9em",
            letterSpacing: "-0.09em",
          }}
        >
          {type === "groom" ? "MYEONGJIN LEE" : "HYEWON YOON"}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            borderRadius: "5px",
            marginTop: "5px",
            border: "1px solid #12121299",
            width: "200px",
            height: "200px",
            overflow: "hidden",
          }}
        >
          <motion.img
            src={type === "groom" ? IdGroom : IdBride}
            initial={{ scale: 1.2 }}
            animate={{ scale: isVisible ? 1 : 1.2 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: "easeOut",
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <div
          style={{
            marginTop: "8px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            fontFamily: "helvetica",
            fontSize: "1rem",
            color: colorToken.black,
            //lineHeight: "0.6em",
            //letterSpacing: "-0.05em",
          }}
        >
          <Star5Svg style={{ width: "14px", height: "14px" }} />
          <Star5Svg style={{ width: "14px", height: "14px" }} />
          <Star5Svg style={{ width: "14px", height: "14px" }} />
          <Star5Svg style={{ width: "14px", height: "14px" }} />
          <Star5Svg style={{ width: "14px", height: "14px" }} />
        </div>
        <div
          style={{
            marginTop: "10px",
            fontFamily: "SUITRegular",
            fontSize: "0.8rem",
            color: colorToken.black,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <div style={{ fontSize: "1rem" }}>
            {type === "groom" ? "이명진" : "윤혜원"}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <div>
              직업 |
              <span style={{ fontWeight: "100", marginLeft: "4px" }}>
                {type === "groom" ? "개발자" : "그 뒷자리 개발자"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
