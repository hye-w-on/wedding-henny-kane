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
import Balloon from "./Balloon";
import { Radar } from "react-chartjs-2";

Chart.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const data = {
  labels: ["", "", "", "", "", ""],
  datasets: [
    {
      data: [9, 9, 9, 9, 9, 9],
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

interface ProfileProps {
  isVisible?: boolean;
  type: "groom" | "bride";
}

function ProfileBack({ isVisible, type }: ProfileProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const kaneBalloons = [
    {
      id: 1,
      x: 40,
      y: 30,
      width: 105,
      height: 19,
      text: "일하는 모습이 멋있어",
    },
    {
      id: 1,
      x: 110,
      y: 70,
      width: 75,
      height: 19,
      text: "집안일도 잘함",
    },
    { id: 3, x: -10, y: 100, width: 95, height: 19, text: "운동신경이 좋아요" },
    { id: 3, x: 60, y: 160, width: 70, height: 19, text: "차분한 성격" },
  ];

  const hennyBalloons = [
    {
      id: 1,
      x: 20,
      y: 30,
      width: 105,
      height: 19,
      text: "비슷한 사고방식, 웃음코드",
    },
    {
      id: 1,
      x: 110,
      y: 80,
      width: 75,
      height: 19,
      text: "주량도 비슷함",
    },
    { id: 3, x: 30, y: 65, width: 95, height: 19, text: "이쁨" },
    { id: 3, x: 50, y: 160, width: 70, height: 19, text: "적극적인 성격" },
  ];

  const labels = [
    { text: "", value: "00" },
    { text: "", value: "00" },
    { text: "", value: "00" },
    { text: "", value: "00" },
    { text: "", value: "00" },
    { text: "", value: "00" },
  ];

  const getPosition = (index: number, total: number, radius: number) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2; // 시작 각도 조정
    return {
      left: `${50 + radius * Math.cos(angle)}%`,
      top: `${55 + radius * Math.sin(angle)}%`,
    };
  };

  return (
    <>
      <div
        ref={chartContainerRef}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          width: "220px",
          height: "220px",
          margin: "20px",
          padding: "8px",
        }}
      >
        <Radar data={data} options={options} />

        {type === "groom"
          ? kaneBalloons.map((balloon) => (
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
                  height: "1.5rem",
                  top: balloon.y,
                  left: balloon.x,
                }}
              >
                {balloon.text}
              </Balloon>
            ))
          : hennyBalloons.map((balloon) => (
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
                  height: "1.5rem",
                  top: balloon.y,
                  left: balloon.x,
                }}
              >
                {balloon.text}
              </Balloon>
            ))}

        {labels.map((label, index) => {
          const position = getPosition(index, labels.length, 50);
          return (
            <div
              key={index}
              style={{
                width: "30px",
                height: "30px",
                position: "absolute",
                color: "#121212",
                fontWeight: "100",
                top: position.top,
                left: position.left,
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "SUITRegular",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                {label.text}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: "0px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "4px",
            fontWeight: "800",
            marginLeft: "4px",
          }}
        >
          <div>취미 |</div>
          <div>같이하는 것 |</div>
          <div>MBTI |</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "4px",
            fontWeight: "100",
            marginLeft: "4px",
          }}
        >
          <div>{type === "groom" ? "골프" : "무언가 만들기"}</div>
          <div>누워있기, 잠자기, 골프</div>
          <div>{type === "groom" ? "ISFJ" : "ENTP"}</div>
        </div>
      </div>
    </>
  );
}

export default ProfileBack;
