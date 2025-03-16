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

  return (
    <>
      <section
        ref={galleryRef}
        style={{
          height: "400vh",
          position: "relative",
          overflow: "clip",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            alignItems: "center",
            width: "30px",
            padding: "100px 50px",
            transform: "translateZ(0)",
          }}
        >
          <motion.div
            style={{
              display: "flex",
              x,
            }}
          >
            <ProfileCard
              animate={{
                y: [-10, 10],
              }}
              transition={{
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
                <GroomProfile isVisible={true} />
              </div>
            </ProfileCard>
            <ProfileCard
              animate={{
                y: [-10, 10],
              }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: 0.2,
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
                <BrideProfile isVisible={true} />
              </div>
            </ProfileCard>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ProfileScrollPage;
