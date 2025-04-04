import { useEffect, useRef, useState } from "react";
import BrideProfile from "../components/BrideProfile";
import GroomProfile from "../components/GroomProfile";
import ProfileCard, { CardHole } from "../components/ProfileCard";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import styled from "@emotion/styled";

const DraggableContainer = styled(motion.div)<{ $isDraggable: boolean }>`
  display: flex;
  gap: 20px;
  justify-content: ${(props) => (props.$isDraggable ? "flex-start" : "center")};
  width: ${(props) => (props.$isDraggable ? "auto" : "100vw")};
  pointer-events: ${(props) => (props.$isDraggable ? "auto" : "none")};
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
  height: 450px;
  border-radius: 15px;
  background-color: #fffe;
  padding: 10px;
`;

const ProfileScrollPage: React.FC = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isDraggable, setIsDraggable] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsDraggable(window.innerWidth <= 500);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start start", "end end"],
  });

  const x = useSpring(
    useTransform(
      scrollYProgress,
      [0, 1],
      [0, isDraggable ? -window.innerWidth * 0.9 : 0]
    ),
    {
      stiffness: 100,
      damping: 30,
    }
  );

  return (
    <section
      ref={galleryRef}
      style={{
        height: isDraggable ? "180vh" : "100vh",
        position: "relative",
        overflow: "clip",
      }}
    >
      <div
        style={{
          position: isDraggable ? "sticky" : "relative",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: isDraggable ? "flex-start" : "center",
          padding: "100px 50px",
          transform: "translateZ(0)",
          touchAction: isDraggable ? "pan-y" : "none",
        }}
      >
        <DraggableContainer
          $isDraggable={isDraggable}
          style={{ x }}
          drag={isDraggable ? "x" : false}
          dragConstraints={
            isDraggable
              ? { left: -window.innerWidth * 0.5, right: 0 }
              : undefined
          }
          dragElastic={0.2}
          dragMomentum={false}
        >
          <ProfileCard
            animate={{ y: [-10, 20] }}
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
            <CardContent>
              <GroomProfile isVisible={true} />
            </CardContent>
          </ProfileCard>
          <ProfileCard
            animate={{ y: [-10, 10] }}
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
            <CardContent>
              <BrideProfile isVisible={true} />
            </CardContent>
          </ProfileCard>
        </DraggableContainer>
      </div>
    </section>
  );
};

export default ProfileScrollPage;
