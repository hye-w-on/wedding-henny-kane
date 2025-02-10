import { useEffect, useRef, useState } from "react";
import "@/assets/styles/fonts.css";
import BrideProfile from "../components/BrideProfile";
import GroomProfile from "../components/GroomProfile";
import ProfileCard, { CardHole } from "../components/ProfileCard";
import styled from "@emotion/styled";
import { motion, useScroll, useTransform } from "motion/react";
import photo03 from "@/assets/photos/photo03.png";

/* scroll 값이 아닌 IntersectionObserver를 사용하여 특정 오브젝트의 가시성으로 처리 */
const ProfileScrollPage: React.FC = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "-150%"] // 출력 범위를 더 넓게 설정하여 더 큰 이동거리
  );

  const firstCardRef = useRef<HTMLDivElement>(null);
  const secondCardRef = useRef<HTMLDivElement>(null);

  const [isFirstCardVisible, setIsFirstCardVisible] = useState(false);
  const [isSecondCardVisible, setIsSecondCardVisible] = useState(false);

  useEffect(() => {
    const firstCard = firstCardRef.current;
    const secondCard = secondCardRef.current;

    const firstObserver = new IntersectionObserver(
      ([entry]) => {
        setIsFirstCardVisible(entry.isIntersecting);
      },
      { root: null, threshold: [0.7, 0.1] } // 20% 이상, 80% 이상
    );
    const secondObserver = new IntersectionObserver(
      ([entry]) => {
        setIsSecondCardVisible(entry.isIntersecting);
      },
      { root: null, threshold: [0.7, 0.1] }
    );

    if (firstCard) firstObserver.observe(firstCard);
    if (secondCard) secondObserver.observe(secondCard);

    return () => {
      if (firstCard) firstObserver.unobserve(firstCard);
      if (secondCard) secondObserver.unobserve(secondCard);
    };
  }, []);

  return (
    <>
      <section
        ref={galleryRef}
        style={{
          height: "800vh",
          position: "relative",
          overflow: "clip", // hidden 대신 clip 사용
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            alignItems: "center",
            width: "2500px", // 너비를 더 넓게 설정
            padding: "200px 100px",
            //background: `url(${photo03})`,
            backgroundSize: "auto 100%",
            backgroundPosition: "left center",
            backgroundRepeat: "no-repeat",
            transform: "translateZ(0)", // 추가: 하드웨어 가속 활성화
          }}
        >
          <motion.div
            style={{
              display: "flex",
              x,
            }}
          >
            <ProfileCard
              ref={firstCardRef}
              initial={{ rotate: -30, x: 500, y: 0 }}
              animate={{
                rotate: isFirstCardVisible ? 5 : -30,
                x: isFirstCardVisible ? 0 : 200,
                y: isFirstCardVisible ? [-10, 10] : 0,
              }}
              transition={{
                duration: 0.5,
                y: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
              }}
              style={{
                zIndex: 100,
                filter: "drop-shadow(0px 10px 15px rgba(0, 0, 0, 0.15))",
              }}
            >
              <CardHole />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "280px",
                  height: "450px",
                  borderRadius: "15px",
                  backgroundColor: "#fffe",
                  padding: "10px",
                }}
              >
                <GroomProfile isVisible={isFirstCardVisible} />
              </div>
            </ProfileCard>
            <ProfileCard
              ref={secondCardRef}
              initial={{ rotate: -30, x: 500, y: 0 }}
              animate={{
                rotate: isSecondCardVisible ? -5 : -30,
                x: isSecondCardVisible ? 0 : 200,
                y: isSecondCardVisible ? [-10, 10] : 0,
              }}
              transition={{
                duration: 0.5,
                y: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
              }}
              style={{
                zIndex: 101,
                filter: "drop-shadow(0px 10px 15px rgba(0, 0, 0, 0.15))",
              }}
            >
              <CardHole />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "280px",
                  height: "450px",
                  borderRadius: "15px",
                  backgroundColor: "#fffe",
                  padding: "10px",
                }}
              >
                <BrideProfile />
              </div>
            </ProfileCard>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ProfileScrollPage;
