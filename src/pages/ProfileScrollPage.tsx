import { useEffect, useRef, useState } from "react";
import "@/assets/styles/fonts.css";
import BrideProfile from "./BrideProfile";
import GroomProfile from "./GroomProfile";
import ProfileCard from "../components/ProfileCard";

/* scroll 값이 아닌 IntersectionObserver를 사용하여 특정 오브젝트의 가시성으로 처리 */
const ProfileScrollPage: React.FC = () => {
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
      { root: null, threshold: [0.2, 0.8] } // 20% 이상, 80% 이상
    );
    const secondObserver = new IntersectionObserver(
      ([entry]) => {
        setIsSecondCardVisible(entry.isIntersecting);
      },
      { root: null, threshold: [0.2, 0.8] }
    );

    if (firstCard) firstObserver.observe(firstCard);
    if (secondCard) secondObserver.observe(secondCard);

    return () => {
      if (firstCard) firstObserver.unobserve(firstCard);
      if (secondCard) secondObserver.unobserve(secondCard);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
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
        <GroomProfile />
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
        <BrideProfile />
      </ProfileCard>
    </div>
  );
};

export default ProfileScrollPage;
