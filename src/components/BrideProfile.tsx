import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartOptions,
} from "chart.js";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import colorToken from "../utils/colorToken";
import IdBride from "@/assets/images/id_henny.webp";
import Balloon from "./Balloon";
import { Bar } from "react-chartjs-2";

// Chart.js에서 사용하는 요소 등록
Chart.register(BarElement, CategoryScale, LinearScale);

const options: ChartOptions<"bar"> = {
  indexAxis: "y" as const, // 타입을 명시적으로 지정
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
};

const data = {
  labels: ["장점1", "장점2", "장점3", "장점4", "장점5", "요리"],
  datasets: [
    {
      data: [90, 90, 90, 90, 90, 100],
      backgroundColor: "rgba(50, 50, 50, 1)",
      borderColor: "rgba(50, 50, 50, 1)",
      borderWidth: 1,
      borderSkipped: "left" as const, // 타입을 명시적으로 지정
      fill: false,
    },
  ],
};

interface BrideProfileProps {
  isVisible?: boolean;
}

function BrideProfile({ isVisible }: BrideProfileProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [balloons] = useState([
    {
      id: 1,
      x: 50,
      y: 50,
      width: 100,
      height: 20,
      text: "아무말 입니다",
    },
    { id: 2, x: 100, y: 150, width: 30, height: 20, text: "여기에 있습니다" },
  ]);

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
          BRIDE
        </div>
        <div
          style={{
            fontFamily: "helvetica",
            fontSize: "2rem",
            color: colorToken.black,
            lineHeight: "0.9em",
            letterSpacing: "-0.05em",
          }}
        >
          HYEWON YOON
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
          src={IdBride}
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
    </>
  );
}

export default BrideProfile;
