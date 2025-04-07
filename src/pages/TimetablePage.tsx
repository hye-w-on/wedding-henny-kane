import { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { motion, useScroll, AnimatePresence } from "motion/react";
import React from "react";
import StarSvg from "@/assets/icons/star.svg?react";
import WineSvg from "@/assets/icons/wine.svg?react";
import CocktailSvg from "@/assets/icons/cocktail.svg?react";
import BeerSvg from "@/assets/icons/beer.svg?react";
import ToastSvg from "@/assets/icons/toast.svg?react";
import ForkandknifeSvg from "@/assets/icons/forkandknife.svg?react";
import HeartSvg from "@/assets/icons/heart.svg?react";
import HandsHeartSvg from "@/assets/icons/handheart.svg?react";

import colorToken from "@/utils/colorToken";

const Container = styled("div")({
  height: "400vh",
  position: "relative",
  overflow: "hidden",
});

const StickyContainer = styled("div")({
  height: "100vh",
  width: "100%",
  position: "sticky",
  top: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "background-color 0.5s ease",
  zIndex: 10,
});

const CircleWrapper = styled("div")({
  transform: "translateX(-45vh)",
});

const Circle = styled(motion.div)({
  width: "300px",
  height: "300px",
  border: "1px solid #ddd",
  borderRadius: "50%",
  position: "relative",
});

const Session = styled("div")<{ angle: number }>(({ angle }) => ({
  position: "absolute",
  left: "50%",
  top: "50%",
  transformOrigin: "0 0",
  transform: `rotate(${angle}deg) translate(144px) rotate(0deg)`,
  display: "flex",
  alignItems: "center",
  gap: "10px",
  minWidth: "200px",
  whiteSpace: "nowrap",
}));

const SmallCircle = styled("div")<{ isActive: boolean }>(({ isActive }) => ({
  width: "10px",
  height: "10px",
  backgroundColor: isActive ? "#000" : "#ddd",
  borderRadius: "50%",
  transition: "background-color 0.3s ease",
}));

const Description = styled("div")({
  position: "absolute",
  left: "50%",
  top: "60%",
  transform: "translate(-50%, -50%)",
  fontSize: "0.8rem",
  textAlign: "center",
  transition: "color 0.5s ease",
});

const DescriptionText = styled(motion.div)({
  display: "inline-block",
});

const descriptionVariants = {
  initial: {
    opacity: 0,
    x: -20,
    filter: "blur(10px)",
  },
  animate: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    x: 20,
    filter: "blur(10px)",
  },
};

const PageTitle = styled("div")({
  position: "absolute",
  top: "10%",
  left: "50%",
  transform: "translateX(-50%)",
  fontFamily: "integralCF",
  fontSize: "2rem",
  fontWeight: "bold",
  transition: "color 0.5s ease",
});

const PageImage = styled("div")({
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translateX(-50%)",
  fontFamily: "integralCF",
  fontSize: "2rem",
  fontWeight: "bold",
  transition: "color 0.5s ease",
});

const StarWrapper = styled(motion.div)({
  position: "absolute",
  width: "20px",
  height: "20px",
  zIndex: 2,
  color: colorToken.black,
});

const StyledForkKnife = styled(ForkandknifeSvg)({
  width: "30px",
  height: "30px",
  "& path:nth-of-type(2)": {
    fill: "currentColor",
  },
});

const StyledWine = styled(WineSvg)({
  width: "20px",
  height: "20px",
  fill: "currentColor",
  "& *": {
    fill: "currentColor",
  },
});

const StyledCocktail = styled(CocktailSvg)({
  width: "20px",
  height: "20px",
  fill: "currentColor",
  "& *": {
    fill: "currentColor",
  },
});

const StyledBeer = styled(BeerSvg)({
  width: "20px",
  height: "20px",
  fill: "currentColor",
  "& *": {
    fill: "currentColor",
  },
});

const StyledHandHeart = styled(HandsHeartSvg)({
  width: "25px",
  height: "25px",
  "& *": {
    fill: "currentColor",
  },
});

const DrinkCard = ({ isDarkTheme }: { isDarkTheme: boolean }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        color: isDarkTheme ? "white" : "black",
      }}
    >
      <StyledWine />
      <StyledCocktail />
      <StyledBeer />
    </div>
  );
};

const ToastCard = ({ isDarkTheme }: { isDarkTheme: boolean }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        color: isDarkTheme ? "white" : "black",
      }}
    >
      <ToastSvg
        style={{
          width: "25px",
          height: "25px",
        }}
      />
    </div>
  );
};

const HeartCard = ({ isDarkTheme }: { isDarkTheme: boolean }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        color: isDarkTheme ? "white" : "black",
      }}
    >
      <HeartSvg
        style={{
          width: "22px",
          height: "22px",
        }}
      />
    </div>
  );
};

const DinnerCard = ({ isDarkTheme }: { isDarkTheme: boolean }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        color: isDarkTheme ? "white" : "black",
      }}
    >
      <StyledForkKnife />
    </div>
  );
};

const HandHeartCard = ({ isDarkTheme }: { isDarkTheme: boolean }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        color: isDarkTheme ? "white" : "black",
      }}
    >
      <StyledHandHeart />
    </div>
  );
};
const TimetablePage: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = 4;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const updateIndex = () => {
      const progress = scrollYProgress.get();
      const newIndex = Math.min(
        maxIndex,
        Math.floor(progress * (maxIndex + 1))
      );
      setCurrentIndex(newIndex);
    };

    const unsubscribe = scrollYProgress.on("change", updateIndex);
    return () => unsubscribe();
  }, [scrollYProgress, maxIndex]);

  const numbers = [
    {
      time: "5PM",
      title: "OPENING",
      angle: 0,
      description: (
        <div>
          환영합니다!
          <br />
          웰컴푸드와 샴페인이 준비되어있으니
          <br />
          식전에 즐겨주세요
        </div>
      ),
      component: <ToastCard isDarkTheme={currentIndex >= 2} />,
    },
    {
      time: "6PM",
      title: "CEREMONY",
      angle: 45,
      description: "결혼식이 시작됩니다",
      component: <HeartCard isDarkTheme={currentIndex >= 2} />,
    },
    {
      time: "7PM",
      title: "DINNER",
      angle: 90,
      description: (
        <div>
          예식이 진행된 같은 장소에서
          <br />
          뷔페식으로 식사를 제공합니다
        </div>
      ),
      component: <DinnerCard isDarkTheme={currentIndex >= 2} />,
    },
    {
      time: "8PM",
      title: "RECEPTION",
      angle: 135,
      description: (
        <div>
          이어서 애프터 파티를 진행합니다
          <br />
          함께 먹고 마시고 얘기해요
        </div>
      ),
      component: <DrinkCard isDarkTheme={currentIndex >= 2} />,
    },
    {
      time: "9PM",
      title: "CLOSING",
      angle: 180,
      description: (
        <div>
          저희의 결혼을 축하해주고,
          <br />
          함께 즐겨주셔서 감사합니다
        </div>
      ),
      component: <HandHeartCard isDarkTheme={currentIndex >= 2} />,
    },
  ];

  const isDarkTheme = currentIndex >= 2;

  return (
    <section
      ref={sectionRef}
      style={{
        height: "400vh",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isDarkTheme ? colorToken.nightGray : "white",
          transition: "background-color 0.5s ease",
        }}
      >
        <StarWrapper
          style={{
            top: "15%",
            left: "15%",
            color: isDarkTheme ? "white" : colorToken.black,
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <StarSvg width="100%" height="100%" />
        </StarWrapper>

        <StarWrapper
          style={{
            top: "25%",
            right: "20%",
            color: isDarkTheme ? "white" : colorToken.black,
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <StarSvg width="100%" height="100%" />
        </StarWrapper>

        <StarWrapper
          style={{
            bottom: "25%",
            left: "25%",
            color: isDarkTheme ? "white" : colorToken.black,
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <StarSvg width="100%" height="100%" />
        </StarWrapper>

        <PageTitle style={{ color: isDarkTheme ? "white" : "black" }}>
          TIMETABLE
        </PageTitle>
        <PageImage style={{ color: isDarkTheme ? "white" : "black" }}>
          <DescriptionText
            key={currentIndex}
            variants={descriptionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {numbers[currentIndex].component}
          </DescriptionText>
        </PageImage>
        <CircleWrapper>
          <Circle
            animate={{ rotate: currentIndex * -45 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              borderColor: isDarkTheme ? "rgba(255, 255, 255, 0.3)" : "#ddd",
            }}
          >
            {numbers.map(({ time, title, angle }, index) => (
              <Session key={time} angle={angle}>
                <SmallCircle
                  isActive={index === currentIndex}
                  style={{
                    backgroundColor:
                      index === currentIndex
                        ? isDarkTheme
                          ? "white"
                          : "#000"
                        : "#ddd",
                  }}
                />
                <div
                  style={{
                    fontFamily: "integralCF",
                    fontSize: "1.5rem",
                    filter: index === currentIndex ? "blur(0)" : "blur(3px)",
                    color:
                      index === currentIndex
                        ? isDarkTheme
                          ? "white"
                          : "#000"
                        : "#ddd",
                    transition: "filter 0.3s ease, color 0.3s ease",
                  }}
                >
                  {time}
                </div>
                <div
                  style={{
                    fontFamily: "integralCF",
                    fontSize: "1rem",
                    filter: index === currentIndex ? "blur(0)" : "blur(3px)",
                    color:
                      index === currentIndex
                        ? isDarkTheme
                          ? "white"
                          : "#000"
                        : "#ddd",
                    transition: "filter 0.3s ease, color 0.3s ease",
                  }}
                >
                  {title}
                </div>
              </Session>
            ))}
          </Circle>
        </CircleWrapper>
        <Description style={{ color: isDarkTheme ? "white" : "black" }}>
          <AnimatePresence mode="wait">
            <DescriptionText
              key={currentIndex}
              variants={descriptionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              {numbers[currentIndex].description}
            </DescriptionText>
          </AnimatePresence>
        </Description>
      </div>
    </section>
  );
};

export default TimetablePage;
