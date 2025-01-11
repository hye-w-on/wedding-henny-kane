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
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { Radar } from "react-chartjs-2";
import Balloon from "../components/Balloon";
import colorToken from "../utils/colorToken";

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
      backgroundColor: "rgba(255, 77, 154, 0.2)",
      borderColor: "rgba(242, 107, 156, 1)",
      pointBackgroundColor: "rgba(100, 50, 50, 1)",
      poingBorderColor: "rgba(0, 50, 50, 1)",
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
        color: "rgba(242, 107, 156, .2)",
        lineWidth: 1,
        display: true, // 각 데이터 포인트의 각도선을 표시
      },
      grid: {
        color: "rgba(242, 107, 156, .2)",
      },
      ticks: {
        stepSize: 3,
        showLabelBackdrop: false,
      },
    },
  },
};
function Profile() {
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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: "80px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          fontFamily: "helvetica",
          color: colorToken.black,
          lineHeight: "0.6em",
          letterSpacing: "-0.05em",
        }}
      >
        INTRODUCE
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "90%",
          height: "300px",
        }}
      >
        <img src={"https://placehold.co/400x600"} />
      </div>
      <div
        ref={chartContainerRef}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          width: "90%",
          height: "200px",
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
      </div>
    </div>
  );
}

export default Profile;
