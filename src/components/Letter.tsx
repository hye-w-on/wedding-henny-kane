import styled from "@emotion/styled";
import { motion } from "motion/react";
import { useState } from "react";
import colorToken from "../utils/colorToken";
import { CircularProgress } from "@mui/material";
import CustomAlert from "./CustomAlert";
import PlusIcon from "../assets/icons/plus.svg";
import MinusIcon from "../assets/icons/minus.svg";

function Letter() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const ERROR_MESSAGE = "예상치 못한 에러가 있네요. 연락 해주실 수 있나요?:)";
  const SUCCESS_MESSAGE = "감사합니다. 언제든지 수정 가능합니다.";

  const handleFocus = () => {
    const container = document.querySelector(".envelope-container");
    if (container) {
      container.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleGuestCountChange = (count: number) => {
    if (count >= 0 && count <= 20) {
      setGuestCount(count);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    setIsSaved(false);

    setAlert({ message: "참석여부 확인이 끝났습니다. 연락 부탁드립니다.", type: "error" });
    setIsLoading(false);
    return;

    /*
    if (name.trim() === "") {
      setAlert({ message: "이름을 입력해 주세요", type: "error" });
      setIsLoading(false);
      return;
    }
    if (
      (phone.length !== 11 && phone.startsWith("010")) ||
      (phone.length !== 10 && !phone.startsWith("010"))
    ) {
      setAlert({ message: "전화번호를 올바르게 입력해 주세요", type: "error" });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://uhpvd8860b.execute-api.ap-northeast-2.amazonaws.com/default/saveWeddingGuest",
        {
          method: "POST",
          body: JSON.stringify({ name, phone, guestCount }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setAlert({ message: SUCCESS_MESSAGE, type: "success" });
        setTimeout(() => {
          setIsSaved(true);
        }, 2000);
        setIsLoading(false);
      } else {
        setAlert({ message: data.error || ERROR_MESSAGE, type: "error" });
        setIsLoading(false);
      }
    } catch (error) {
      setAlert({ message: ERROR_MESSAGE, type: "error" });
      setIsLoading(false);
    }
    */
  };

  return (
    <>
      <CustomAlert
        message={alert?.message}
        type={alert?.type}
        isOpen={!!alert}
        onClose={() => setAlert(null)}
      />

      <div
        style={{
          width: 330,
          height: 200,
          borderRadius: "5px",
          border: "outset 5px #12121222",
          backgroundColor: "#fff",
          boxSizing: "border-box",
          borderSpacing: "3px",
          position: "relative",
        }}
      >
        {isLoading && (
          <LoadingOverlay>
            <LoadingContent>
              <CircularProgress size={30} style={{ color: "#121212" }} />
            </LoadingContent>
          </LoadingOverlay>
        )}
        {isSaved && (
          <StampContainer
            initial={{ scale: 0.1, opacity: 0, y: 20 }}
            animate={{
              scale: [0.1, 1.2, 1],
              opacity: [0, 1, 1],
              y: [20, -10, 0],
            }}
            transition={{
              duration: 0.8,
              times: [0, 0.3, 1],
              ease: "easeOut",
            }}
          >
            <StampText>저장완료</StampText>
          </StampContainer>
        )}
        <FormContainer>
          <div
            style={{
              fontFamily: "PPEditorialOldItalic",
              fontSize: "1.8rem",
              color: colorToken.black,
              letterSpacing: "-0.05em",
            }}
          >
            RSVP
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <InputGroup>
              <NameInput
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={handleFocus}
                placeholder="성명"
                style={{ width: "80px" }}
              />
              <Label style={{ width: "80px" }}>NAME</Label>
            </InputGroup>
            <InputGroup>
              <NameInput
                value={phone}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/[^0-9]/g, "")
                    .slice(0, 11);
                  setPhone(value);
                }}
                type="tel"
                inputMode="numeric"
                placeholder="01099990000"
                pattern="[0-9]*"
                maxLength={11}
                onFocus={handleFocus}
                style={{ width: "140px" }}
              />
              <Label>PHONE</Label>
            </InputGroup>
          </div>

          <InputGroup>
            <GuestCountContainer>
              <CountButton
                onClick={() => handleGuestCountChange(guestCount - 1)}
                disabled={guestCount <= 0}
              >
                <img src={MinusIcon} alt="Decrease" />
              </CountButton>
              <CountDisplay>{guestCount}명</CountDisplay>
              <CountButton
                onClick={() => handleGuestCountChange(guestCount + 1)}
                disabled={guestCount >= 30}
              >
                <img src={PlusIcon} alt="Increase" />
              </CountButton>
            </GuestCountContainer>
            <Label style={{ fontSize: "0.7rem", fontFamily: "SUITRegular" }}>
              참석 인원
            </Label>
          </InputGroup>

          <InputGroup>
            <SaveButton
              onClick={handleSave}
              disabled={isLoading}
              isAbsent={guestCount === 0}
            >
              {guestCount === 0 ? "불참 회신하기" : "회신하기"}
            </SaveButton>
          </InputGroup>
        </FormContainer>
      </div>
    </>
  );
}

export default Letter;

const FormContainer = styled.div({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
});

const InputGroup = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "5px",
});

const Label = styled.label({
  display: "flex",
  justifyContent: "center",
  width: "140px",
  borderTop: "0.5px solid #121212",
  paddingTop: "3px",
  fontFamily: "satoshi",
  fontSize: "0.6rem",
  color: "#121212",
  textAlign: "center",
});

const NameInput = styled.input({
  //border: "0.5px solid #ccc",
  borderRadius: "2px",
  fontSize: "0.8rem",
  width: "140px",
  height: "25px",
  boxShadow:
    "inset 0 1px 1px rgba(0,0,0,0.05), inset 0 -1px 20px rgba(0,0,0,0.08)",
  textAlign: "center",
});

const GuestCountContainer = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  width: "150px",
  height: "17px",
});

const CountButton = styled.button<{ disabled?: boolean }>(({ disabled }) => ({
  width: "21px",
  height: "21px",
  padding: "5px",
  borderRadius: "50%",
  border: "1px solid #12121222",
  color: disabled ? "#ccc" : colorToken.black,
  cursor: disabled ? "not-allowed" : "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s ease",
  "& img": {
    width: "100%",
    height: "100%",
    opacity: disabled ? 0.3 : 1,
    transition: "opacity 0.2s ease",
  },
}));

const CountDisplay = styled.div({
  width: "60px",
  textAlign: "center",
  fontSize: "0.8rem",
  color: colorToken.black,
  fontWeight: "500",
});

const SaveButton = styled.button<{ isAbsent?: boolean }>(({ isAbsent }) => ({
  width: "250px",
  height: "28px",
  backgroundColor: isAbsent ? colorToken.gray500 : colorToken.black,
  color: "#fff",
  fontFamily: "SUITRegular",
  fontWeight: "700",
  fontSize: "0.8rem",
  textTransform: "none",
  borderRadius: "4px",
  border: "none",
  cursor: "pointer",
  transition: "all 0.2s ease",
  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },
}));

const StampContainer = styled(motion.div)({
  position: "absolute",
  bottom: "10px",
  right: "10px",
  transform: "rotate(-15deg)",
  width: "80px",
  height: "80px",
  border: "4px solid #ff4444",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1,
  backgroundColor: "rgba(255, 255, 255, 0.3)",
  backdropFilter: "blur(2px)",
  transformOrigin: "center center",
  boxShadow: "-1px 1px 1px rgba(255, 0, 0, 1)",
});

const StampText = styled.div({
  color: "#ff4444",
  fontFamily: "SUITRegular",
  fontSize: "0.9rem",
  fontWeight: "bold",
  transform: "rotate(15deg)",
  textShadow:
    "1px 1px 1px rgba(255, 255, 255, 0.5), -1px 1px 1px rgba(255, 255, 255, 0.5)",
  letterSpacing: "-0.5px",
});

const LoadingOverlay = styled.div({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  zIndex: 2,
  backdropFilter: "blur(1px)",
});

const LoadingContent = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
});
