import styled from "@emotion/styled";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartOptions,
} from "chart.js";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import Balloon from "../components/Balloon";
import colorToken from "../utils/colorToken";

// Chart.js에서 사용하는 요소 등록
Chart.register(BarElement, CategoryScale, LinearScale);

const options = {
  indexAxis: "y",
  borderSkipped: "left",
  reverse: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      reverse: true, // X축 방향을 반대로 설정 (값의 방향 반전)
    },
    y: {
      position: "right", // Y축을 오른쪽에 배치
      ticks: {
        mirror: false, // 라벨을 반대쪽으로 배치
      },
    },
  },
  layout: {
    width: 200,
  },
};

const data = {
  labels: ["장점1", "장점1", "장점1", "장점1", "장점1", "장점1"],
  datasets: [
    {
      axis: "y",
      fill: false,
      data: [29, 44, 10, 40, 90, 100],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
      ],
      borderColor: [
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
      ],
      borderWidth: 1,
    },
  ],
};

function Profile() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [balloons] = useState([
    {
      id: 1,
      x: 50,
      y: 50,
      width: 30,
      height: 20,
      text: "대충아무말비밀입니다",
    },
    { id: 2, x: 100, y: 150, width: 30, height: 20, text: "여기에 있습니다" },
  ]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          fontFamily: "helvetica",
          color: colorToken.black,
          //lineHeight: "0.6em",
          letterSpacing: "-0.05em",
        }}
      >
        INTRODUCE
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "300px",
          height: "300px",
        }}
      >
        <img src={"https://placehold.co/300"} />
      </div>
      <div
        ref={chartContainerRef}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          width: "90%",
          height: "150px",
        }}
      >
        <Bar options={options} data={data} />

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
