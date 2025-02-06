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

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

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
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            alignItems: "center",
            width: "3000px",
            padding: "200px 100px",
            //background: `url(${photo03})`,
            backgroundSize: "auto 100%",
            backgroundPosition: "left center",
            backgroundRepeat: "no-repeat",
            overflow: "hidden",
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
              initial={{ rotate: 30, x: -500 }}
              animate={{
                rotate: isFirstCardVisible ? 0 : 30,
                x: isFirstCardVisible ? 0 : -200,
              }}
              transition={{ duration: 0.5 }}
              style={{ zIndex: 100 }}
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
                <GroomProfile />
              </div>
            </ProfileCard>
            <ProfileCard
              ref={secondCardRef}
              initial={{ rotate: -30, x: 500 }}
              animate={{
                rotate: isSecondCardVisible ? 0 : -30,
                x: isSecondCardVisible ? 0 : 200,
              }}
              transition={{ duration: 0.5 }}
              style={{ zIndex: 101 }}
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
