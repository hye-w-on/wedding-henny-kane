import { useEffect, useRef, useState } from "react";
import ProfileCard, { CardHole } from "@/components/ProfileCard";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import styled from "@emotion/styled";
import Profile from "@/components/Profile";
import colorToken from "@/utils/colorToken";
import ProfileBack from "@/components/ProfileBack";

const DraggableContainer = styled(motion.div)<{ $isDraggable: boolean }>`
  display: flex;
  gap: 20px;
  justify-content: ${(props) => (props.$isDraggable ? "flex-start" : "center")};
  width: ${(props) => (props.$isDraggable ? "auto" : "100vw")};
`;

const CardWrapper = styled(motion.div)`
  perspective: 1000px;
  transform-style: preserve-3d;
  cursor: pointer;
  position: relative;
  width: 300px;
  height: 500px;
  margin: 1rem;
  transform-origin: center;
  will-change: transform;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
  height: 100%;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  backface-visibility: hidden;
`;

const MovingBackground = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${colorToken.gray100};
  overflow: hidden;
  z-index: 0;
  opacity: 1;

  &::before {
    width: 100%;
    content: "We're getting married We're getting married We're getting married";
    position: absolute;
    white-space: nowrap;
    font-size: 10rem;
    font-family: helvetica;
    letter-spacing: -0.08em;
    color: rgba(0, 0, 0, 1);
    animation: moveText 20s linear infinite;
    top: 50%;
    transform: translateY(-50%);
  }

  @keyframes moveText {
    0% {
      transform: translate(0, -50%);
    }
    25% {
      transform: translate(-25%, -50%);
    }
    50% {
      transform: translate(-50%, -50%);
    }
    75% {
      transform: translate(-25%, -50%);
    }
    100% {
      transform: translate(0, -50%);
    }
  }
`;

const ProfileScrollPage: React.FC = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isDraggable, setIsDraggable] = useState(false);
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>(
    {}
  );

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

  const handleCardClick = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      ref={galleryRef}
      style={{
        height: isDraggable ? "180vh" : "100vh",
        position: "relative",
        overflow: "clip",
        backgroundColor: "transparent",
      }}
    >
      <MovingBackground />
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
          backgroundColor: "transparent",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "15px",
            left: "50%",
            transform: "translate(-50%)",
            height: "100%",
            fontFamily: "SUITRegular",
            fontSize: "0.8rem",
            color: "#000000aa",
          }}
        >
          위아래로 스크롤하세요
        </div>
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
          <CardWrapper
            onClick={() => handleCardClick("groom")}
            initial={{ y: 0 }}
            whileHover={{ scale: 1.05 }}
            animate={{
              rotateY: flippedCards["groom"] ? 180 : 0,
              y: [-10, 20],
            }}
            transition={{
              rotateY: {
                type: "spring",
                stiffness: 100,
                damping: 15,
              },
              y: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
          >
            <ProfileCard>
              <CardHole />
              <CardContent>
                <Profile isVisible={true} type="groom" />
              </CardContent>
            </ProfileCard>
            <ProfileCard
              style={{
                transform: "rotateY(180deg)",
              }}
            >
              <CardHole />
              <CardContent
                style={{
                  fontFamily: "SUITRegular",
                  fontWeight: "200",
                  fontSize: "0.8rem",
                }}
              >
                <ProfileBack type={"groom"} />
              </CardContent>
            </ProfileCard>
          </CardWrapper>
          <CardWrapper
            onClick={() => handleCardClick("bride")}
            initial={{ y: 0 }}
            whileHover={{ scale: 1.05 }}
            animate={{
              rotateY: flippedCards["bride"] ? 180 : 0,
              y: [-10, 10],
            }}
            transition={{
              rotateY: {
                type: "spring",
                stiffness: 100,
                damping: 15,
              },
              y: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.2,
              },
            }}
          >
            <ProfileCard>
              <CardHole />
              <CardContent>
                <Profile isVisible={true} type="bride" />
              </CardContent>
            </ProfileCard>
            <ProfileCard
              style={{
                transform: "rotateY(180deg)",
              }}
            >
              <CardHole />
              <CardContent
                style={{
                  fontFamily: "SUITRegular",
                  fontWeight: "200",
                  fontSize: "0.8rem",
                }}
              >
                <ProfileBack type={"bride"} />
              </CardContent>
            </ProfileCard>
          </CardWrapper>
        </DraggableContainer>
      </div>
    </section>
  );
};

export default ProfileScrollPage;
