import { useEffect, useRef } from "react";
import BrideProfile from "../components/BrideProfile";
import GroomProfile from "../components/GroomProfile";
import ProfileCard, { CardHole } from "../components/ProfileCard";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

const ProfileScrollPage: React.FC = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start start", "end end"],
  });

  const x = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -window.innerWidth * 0.85]),
    {
      stiffness: 100,
      damping: 30,
    }
  );

  return (
    <>
      <section
        ref={galleryRef}
        style={{
          height: "100vh",
          position: "relative",
          overflow: "clip",
        }}
      >
        <div
          ref={containerRef}
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            alignItems: "center",
            width: "30px",
            padding: "100px 50px",
            transform: "translateZ(0)",
            touchAction: "pan-y",
          }}
        >
          <motion.div
            style={{ display: "flex", x }}
            drag="x"
            dragConstraints={{ left: -window.innerWidth * 0.85, right: 0 }}
            dragElastic={0.2}
            dragMomentum={false}
          >
            <ProfileCard
              animate={{
                y: [-10, 20],
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
