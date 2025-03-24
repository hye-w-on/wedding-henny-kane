import { useState } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { motion } from "framer-motion";
import { colorToken } from "../utils/colorToken";

interface ContactInfo {
  role: string;
  name: string;
  account: string;
}

const groomContacts: ContactInfo[] = [
  {
    role: "신랑",
    name: "이명진",
    account: "12232131231223",
  },
  {
    role: "신랑 어버지",
    name: "이영길",
    account: "12232131231223",
  },
  {
    role: "신랑 어머니",
    name: "김영숙",
    account: "12232131231223",
  },
];

const brideContacts: ContactInfo[] = [
  {
    role: "신부",
    name: "윤혜원",
    account: "12232131231223",
  },
  {
    role: "신부 어버지",
    name: "이영길",
    account: "12232131231223",
  },
  {
    role: "신부 어머니",
    name: "김영숙",
    account: "12232131231223",
  },
];

const rotate = keyframes({
  from: {
    transform: "rotate(0deg)",
  },
  to: {
    transform: "rotate(360deg)",
  },
});

const Container = styled("div")({
  position: "relative",
  padding: "20px",
  maxWidth: "600px",
  margin: "0 auto",
  textAlign: "center",
  minHeight: "100vh",
  fontSize: "0.8rem",
  background: "#121212",
  overflow: "hidden",
  zIndex: 0,
  fontFamily: '"KoPubDotum", sans-serif',
});

const Background = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: -1,
});

const Star = styled("div")<{
  top: string;
  left: string;
  scale: number;
  rotation: number;
}>((props) => ({
  position: "absolute",
  top: props.top,
  left: props.left,
  width: "16px",
  height: "16px",
  color: "rgba(255, 255, 255, 0.1)",
  transform: `scale(${props.scale}) rotate(${props.rotation}deg)`,
  animation: `${rotate} 20s linear infinite`,
  "& svg": {
    width: "100%",
    height: "100%",
  },
}));

const GradientContainer = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: -1,
});

const Title = styled("h1")({
  fontSize: "5rem",
  fontWeight: "bold",
  fontFamily: '"PPPlayground"',
  color: "white",
  position: "relative",
  zIndex: 1,
});

const SubTitle = styled("p")({
  color: "rgba(255, 255, 255, 0.467)",
  lineHeight: 1.2,
  fontSize: "0.8rem",
  marginBottom: "10px",
  position: "relative",
  zIndex: 1,
});

const TabContainer = styled("div")({
  display: "flex",
  height: "35px",
  overflow: "hidden",
  backdropFilter: "blur(10px)",
  position: "relative",
  zIndex: 1,
  alignItems: "flex-end",
  "&::before": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "25px",
    background: colorToken.white,
    zIndex: -1,
  },
});

const Tab = styled(motion.button)<{ active: boolean }>((props) => ({
  flex: 1,
  height: props.active ? "35px" : "30px",
  border: "none",
  background: colorToken.gray100,
  color: colorToken.black,
  fontWeight: props.active ? "bold" : "normal",
  cursor: "pointer",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&::before": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: colorToken.white,
    transform: props.active ? "translateY(0)" : "translateY(100%)",
    transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    zIndex: -1,
    borderRadius: "inherit",
  },
  "&:first-of-type": {
    borderRadius: "5px 5px 70% 0px",
  },
  "&:last-of-type": {
    borderRadius: "5px 5px 0px 70%",
  },
}));

const ContactList = styled("div")({
  display: "flex",
  flexDirection: "column",
  border: `5px solid ${colorToken.white}`,
  borderRadius: "0 0 8px 8px",
});

const ContactCard = styled("div")({
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  padding: "15px",
  //border: "1px solid rgba(255, 255, 255, 0.1)",
});

const ContactRole = styled("div")({
  color: colorToken.pink200,
  fontSize: "0.7rem",
  marginBottom: "5px",
});

const ContactName = styled("div")({
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: "white",
  marginBottom: "15px",
});

const ButtonGroup = styled("div")({
  display: "flex",
  gap: "5px",
  justifyContent: "center",
  marginBottom: "5px",
});

const IconButton = styled("button")({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  padding: "8px 16px",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "8px",
  background: "rgba(255, 255, 255, 0.1)",
  color: "white",
  cursor: "pointer",
  transition: "all 0.2s ease",
  fontSize: "0.8rem",
  backdropFilter: "blur(10px)",
  "& svg": {
    width: "20px",
    height: "20px",
    fill: "currentColor",
  },
  "&:hover": {
    background: "rgba(255, 255, 255, 0.2)",
  },
});

const AccountButton = styled(IconButton)({
  width: "100%",
  justifyContent: "center",
  height: "1rem",
  padding: "15px",
  margin: "5px 0",
});

const AccountInfo = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "3px",
  width: "100%",
  padding: "10px",
});

const BankLabel = styled("div")({
  fontSize: "0.7rem",
  fontWeight: 400,
  color: "var(--color-gray-800)",
});

const AccountNumber = styled("div")({
  fontSize: "0.8rem",
  color: "var(--color-black)",
});

const CopyButton = styled("div")({
  fontSize: "0.7rem",
  fontWeight: 400,
  color: "var(--color-gray-800)",
  cursor: "pointer",
  border: "1px solid var(--color-gray-100)",
  borderRadius: "5px",
  padding: "5px 10px",
  marginLeft: "5px",
  backgroundColor: "var(--color-gray-100)",
});

const Toast = styled("div")({
  position: "fixed",
  bottom: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  padding: "12px 24px",
  background: "rgba(0, 0, 0, 0.8)",
  color: "white",
  borderRadius: "8px",
  zIndex: 1000,
  fontSize: "0.8rem",
});

const ContactPage = () => {
  const [activeTab, setActiveTab] = useState<"groom" | "bride">("groom");
  const [showToast, setShowToast] = useState(false);
  const [showAccountModals, setShowAccountModals] = useState<string[]>([]);

  const handleCopyAccount = async (account: string) => {
    try {
      await navigator.clipboard.writeText(account);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const toggleAccountModal = (name: string) => {
    setShowAccountModals((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const handleCall = (name: string) => {
    // 실제 전화번호로 교체 필요
    window.location.href = `tel:010-0000-0000`;
  };

  const handleMessage = (name: string) => {
    // 실제 전화번호로 교체 필요
    window.location.href = `sms:010-0000-0000`;
  };

  return (
    <Container>
      <Background>
        <GradientContainer>
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient
                id="Gradient1"
                cx="50%"
                cy="50%"
                fx="10%"
                fy="50%"
                r=".5"
              >
                <animate
                  attributeName="fx"
                  dur="34s"
                  values="0%;3%;0%"
                  repeatCount="indefinite"
                />
                <stop offset="0%" stopColor="#9055A2" />
                <stop offset="100%" stopColor="#9055A200" />
              </radialGradient>
              <radialGradient
                id="Gradient2"
                cx="50%"
                cy="50%"
                fx="10%"
                fy="50%"
                r=".5"
              >
                <animate
                  attributeName="fx"
                  dur="23.5s"
                  values="0%;3%;0%"
                  repeatCount="indefinite"
                />
                <stop offset="0%" stopColor="#9055A2" />
                <stop offset="100%" stopColor="#9055A200" />
              </radialGradient>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#Gradient1)">
              <animate
                attributeName="x"
                dur="20s"
                values="25%;0%;25%"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                dur="21s"
                values="0%;25%;0%"
                repeatCount="indefinite"
              />
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                dur="17s"
                repeatCount="indefinite"
              />
            </rect>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#Gradient2)">
              <animate
                attributeName="x"
                dur="23s"
                values="-25%;0%;-25%"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                dur="24s"
                values="0%;50%;0%"
                repeatCount="indefinite"
              />
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                dur="18s"
                repeatCount="indefinite"
              />
            </rect>
          </svg>
        </GradientContainer>
      </Background>

      <Title>Contact</Title>
      <SubTitle>
        방문이 어려우신 분들을 위해 기재하였습니다
        <br />
        너그러운 마음으로 양해 부탁드립니다
      </SubTitle>

      <TabContainer>
        <Tab
          active={activeTab === "groom"}
          onClick={() => setActiveTab("groom")}
        >
          신랑측
        </Tab>
        <Tab
          active={activeTab === "bride"}
          onClick={() => setActiveTab("bride")}
        >
          신부측
        </Tab>
      </TabContainer>

      <ContactList>
        {(activeTab === "groom" ? groomContacts : brideContacts).map(
          (contact, index) => (
            <ContactCard key={index}>
              <ContactRole>{contact.role}</ContactRole>
              <ContactName>{contact.name}</ContactName>

              <ButtonGroup>
                <IconButton onClick={() => handleCopyAccount(contact.account)}>
                  번호복사
                </IconButton>
                <IconButton onClick={() => handleCall(contact.name)}>
                  전화
                </IconButton>
                <IconButton onClick={() => handleMessage(contact.name)}>
                  문자
                </IconButton>
              </ButtonGroup>

              <AccountButton onClick={() => toggleAccountModal(contact.name)}>
                계좌번호 확인하기
              </AccountButton>

              {showAccountModals.includes(contact.name) && (
                <AccountInfo>
                  <BankLabel>우리은행</BankLabel>
                  <AccountNumber>{contact.account}</AccountNumber>
                  <CopyButton
                    onClick={() => handleCopyAccount(contact.account)}
                  >
                    복사하기
                  </CopyButton>
                </AccountInfo>
              )}
            </ContactCard>
          )
        )}
      </ContactList>

      {showToast && <Toast>복사되었습니다</Toast>}
    </Container>
  );
};

export default ContactPage;
