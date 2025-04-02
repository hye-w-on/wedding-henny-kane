import { useState } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { motion } from "framer-motion";
import { colorToken } from "../utils/colorToken";
import PhoneIcon from "../assets/icons/phone.svg";
import MessageIcon from "../assets/icons/message.svg";
import CopyIcon from "../assets/icons/copy.svg";

interface ContactInfo {
  role: string;
  name: string;
  bank: string;
  account: string;
  phone: string;
}

const groomContacts: ContactInfo[] = [
  {
    role: "신랑",
    name: "이명진",
    bank: "우리은행",
    account: "12232131231223",
    phone: "010-1234-5678",
  },
  {
    role: "신랑 어버지",
    name: "이영길",
    bank: "국민은행",
    account: "12232131231223",
    phone: "010-1234-5678",
  },
  {
    role: "신랑 어머니",
    name: "김영숙",
    bank: "신한은행",
    account: "12232131231223",
    phone: "010-1234-5678",
  },
];

const brideContacts: ContactInfo[] = [
  {
    role: "신부",
    name: "윤혜원",
    bank: "우리은행",
    account: "12232131231223",
    phone: "010-1234-5678",
  },
  {
    role: "신부 어버지",
    name: "윤창기",
    bank: "국민은행",
    account: "12232131231223",
    phone: "010-1234-5678",
  },
  {
    role: "신부 어머니",
    name: "송영희",
    bank: "신한은행",
    account: "12232131231223",
    phone: "010-1234-5678",
  },
];

const Container = styled("div")({
  position: "relative",
  padding: "80px 0",
  width: "100%",
  margin: "0 auto",
  textAlign: "center",
  minHeight: "100vh",
  fontSize: "0.8rem",
  background: "#121212",
  overflow: "hidden",
  zIndex: 0,
  fontFamily: "KoPubDotum",
});

const Background = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: -1,
});

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
  fontSize: "0.7rem",
  marginBottom: "20px",
  position: "relative",
  zIndex: 1,
});

const TabContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  margin: "0 auto",
  width: "80%",
  maxWidth: "800px",
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
    height: "22px",
    background: colorToken.white,
    zIndex: -1,
  },
});

const Tab = styled(motion.button)<{ active: boolean }>((props) => ({
  flex: 1,
  height: props.active ? "35px" : "28px",
  border: "none",
  background: colorToken.gray100,
  color: props.active ? colorToken.gray600 : colorToken.gray200,
  fontFamily: "KoPubDotum",
  fontWeight: props.active ? 700 : 500,
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
  width: "80%",
  maxWidth: "800px",
  flexDirection: "column",
  borderRadius: "0 0 8px 8px",
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(80px)",
  border: `1px solid rgba(255, 255, 255, 0.1)`,
  padding: "10px 0px",
  gap: "15px",
  margin: "0 auto",
});

const ContactCard = styled("div")({
  padding: "0px 15px 0px 20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  textAlign: "center",
});

const ContactRole = styled("div")({
  color: colorToken.beige,
  fontSize: "0.7rem",
  marginBottom: "5px",
  textAlign: "center",
});

const ContactName = styled("div")({
  fontSize: "0.9rem",
  fontWeight: "bold",
  color: colorToken.white,
  textAlign: "center",
});

const ButtonGroup = styled("div")({
  display: "flex",
  gap: "5px",
  justifyContent: "center",
  marginBottom: "5px",
  width: "100%",
});

const IconButton = styled("button")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "5px",
  width: "80px",
  padding: "8px 10px",
  borderRadius: "6px",
  background: "rgba(255, 255, 255, 0.1)",
  color: "white",
  cursor: "pointer",
  transition: "all 0.2s ease",
  fontSize: "0.7rem",
  backdropFilter: "blur(10px)",
  "& img": {
    width: "15px",
    height: "15px",
    filter: "brightness(0) invert(1)",
  },
  "&:hover": {
    background: "rgba(255, 255, 255, 0.2)",
  },
});

const AccountButton = styled("button")({
  width: "100%",
  padding: "10px 10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s ease",
  height: "auto",
  overflow: "hidden",
});

const AccountInfo = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  width: "100%",
  marginTop: "10px",
  opacity: 1,
  transition: "all 0.3s ease",
  transform: "translateY(0)",
});

const BankLabel = styled("div")({
  fontFamily: "KoPubDotum",
  fontSize: "0.7rem",
  fontWeight: 700,
  color: colorToken.beige,
});

const AccountNumber = styled("div")({
  fontFamily: "KoPubDotum",
  fontSize: "0.7rem",
  fontWeight: 500,
  color: colorToken.white,
});

const CopyButton = styled("div")({
  fontSize: "0.6rem",
  fontWeight: 400,
  color: "var(--color-gray-800)",
  cursor: "pointer",
  border: "1px solid var(--color-gray-100)",
  borderRadius: "5px",
  padding: "4px 8px",
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

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleMessage = (phone: string) => {
    window.location.href = `sms:${phone}`;
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
                <stop offset="0%" stopColor="#D9D4CF" />
                <stop offset="100%" stopColor="#D9D4CF00" />
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
                <stop offset="0%" stopColor="#D9D4CF" />
                <stop offset="100%" stopColor="#D9D4CF00" />
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
            <div key={index}>
              <ContactCard>
                <div style={{ width: "100%" }}>
                  <ContactRole>{contact.role}</ContactRole>
                  <ContactName>{contact.name}</ContactName>
                </div>
                <div>
                  <ButtonGroup>
                    <IconButton
                      onClick={() => handleCopyAccount(contact.account)}
                    >
                      <img src={CopyIcon} alt="copy" />
                      번호복사
                    </IconButton>
                    <IconButton onClick={() => handleCall(contact.phone)}>
                      <img src={PhoneIcon} alt="phone" />
                      전화
                    </IconButton>
                    <IconButton onClick={() => handleMessage(contact.phone)}>
                      <img src={MessageIcon} alt="message" />
                      문자
                    </IconButton>
                  </ButtonGroup>
                  <AccountButton
                    onClick={() => toggleAccountModal(contact.name)}
                  >
                    <div>
                      계좌번호 확인하기
                      {showAccountModals.includes(contact.name) ? "-" : "+"}
                    </div>
                    {showAccountModals.includes(contact.name) && (
                      <AccountInfo>
                        <BankLabel>{contact.bank}</BankLabel>
                        <AccountNumber>{contact.account}</AccountNumber>
                        <CopyButton
                          onClick={() => handleCopyAccount(contact.account)}
                        >
                          복사
                        </CopyButton>
                      </AccountInfo>
                    )}
                  </AccountButton>
                </div>
              </ContactCard>
            </div>
          )
        )}
      </ContactList>

      {showToast && <Toast>복사되었습니다</Toast>}
    </Container>
  );
};

export default ContactPage;
