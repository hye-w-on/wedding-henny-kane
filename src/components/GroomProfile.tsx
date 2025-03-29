import styled from "@emotion/styled";
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
import { Radar } from "react-chartjs-2";
import Balloon from "./Balloon";
import colorToken from "../utils/colorToken";
import image from "@/assets/images/p01.png";
import IdGroom from "@/assets/images/id_groom.webp";
import { motion } from "motion/react";

Chart.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const data = {
  labels: ["잘생김", "다정함", "멘탈힐링", "센스", "유머", "집안일"],
  datasets: [
    {
      data: [10, 10, 9, 9, 9, 9],
      backgroundColor: "rgba(50, 50, 50, 0.7)",
      borderColor: "rgba(50, 50, 50, 1)",
      borderWidth: 0,
      //pointBackgroundColor: "rgba(50, 50, 50, 1)",
      // pointBorderColor: "rgba(50, 50, 50, 1)",
      pointStyle: "circle",
    },
  ],
};
const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    r: {
      min: 0,
      max: 10,
      angleLines: {
        color: "rgba(0, 0, 0, .1)",
        lineWidth: 1,
        display: true,
      },
      grid: {
        color: "rgba(0, 0, 0, .2)",
      },
      ticks: {
        display: false,
        stepSize: 3,
        showLabelBackdrop: false,
      },
      pointLabels: {
        display: false,
      },
    },
  },
};

interface GroomProfileProps {
  isVisible?: boolean;
}

function GroomProfile({ isVisible }: GroomProfileProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [balloons] = useState([
    {
      id: 1,
      x: 50,
      y: 50,
      width: 40,
      height: 20,
      text: "대충아무말비밀입니다",
    },
    { id: 2, x: 100, y: 190, width: 40, height: 20, text: "여기에 있습니다" },
  ]);

  const labels = [
    { text: "귀여움", value: "00" },
    { text: "다정함", value: "00" },
    { text: "잘생김", value: "00" },
    { text: "", value: "00" },
    { text: "효율적", value: "00" },
    { text: "가정적", value: "00" },
  ];

  const getPosition = (index: number, total: number, radius: number) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2; // 시작 각도 조정
    return {
      left: `${50 + radius * Math.cos(angle)}%`,
      top: `${50 + radius * Math.sin(angle)}%`,
    };
  };

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
            fontWeight: "100",
            fontSize: "12px",
            color: colorToken.black,
            //backgroundColor: colorToken.black,
            border: "1px solid #121212",
            borderRadius: "40%",
            lineHeight: "0.6em",
            letterSpacing: "-0.05em",
          }}
        >
          GROOM
        </div>
        <div
          style={{
            fontFamily: "Freesentation",
            fontSize: "2rem",
            color: colorToken.black,
            lineHeight: "0.9em",
            letterSpacing: "-0.05em",
          }}
        >
          MYEONGJIN LEE
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          borderRadius: "5px",
          marginTop: "5px",
          border: "1px solid #12121299",
          width: "200px",
          height: "250px",
          overflow: "hidden",
        }}
      >
        <motion.img
          src={IdGroom}
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
          width: "100%",
          display: "flex",
          justifyContent: "center",
          fontFamily: "helvetica",
          fontSize: "14px",
          color: colorToken.black,
          //lineHeight: "0.6em",
          //letterSpacing: "-0.05em",
        }}
      >
        ★★★★★
      </div>
      {/*
      <div
        ref={chartContainerRef}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          width: "130px",
          height: "130px",
          margin: "20px",
          padding: "8px",
        }}
      >
        <Radar data={data} options={options} />

        {balloons.map((balloon) => (
          <Balloon
            key={balloon.id}
            initial={{ scale: 0, opacity: 0 }} // 초기 상태
            animate={{ scale: 1, opacity: 1 }} // 나타날 때
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 10,
            }}
            style={{
              top: balloon.y,
              left: balloon.x,
            }}
          >
            {balloon.text}
          </Balloon>
        ))}
        {labels.map((label, index) => {
          const position = getPosition(index, labels.length, 55);
          return (
            <div
              key={index}
              style={{
                width: "30px",
                height: "30px",
                position: "absolute",
                fontFamily: "SUITRegular",
                color: "#121212",
                fontSize: "0.6rem",
                fontWeight: "100",
                top: position.top,
                left: position.left,
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "PPEditorialNew",
                  fontSize: "1.2rem",
                  lineHeight: "0.8em",
                }}
              >
                xx
              </div>
              {label.text}
            </div>
          );
        })}
      </div>*/}
    </>
  );
}

export default GroomProfile;
