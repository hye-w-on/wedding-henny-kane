import styled from "@emotion/styled";
import { motion } from "motion/react";
import { useState } from "react";
import colorToken from "../utils/colorToken";
import { Button, CircularProgress } from "@mui/material";
import CustomAlert from "./CustomAlert";

function Letter() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedType, setSelectedType] = useState("A");
  const [attendance, setAttendance] = useState<"Y" | "N">("Y");
  const [guestCount, setGuestCount] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const ERROR_MESSAGE = "예상치 못한 에러가 있네요. 연락 해주실 수 있나요?:)";
  const SUCCESS_MESSAGE = "감사합니다. 언제든지 수정 가능합니다.";

  const handleFocus = () => {
    const container = document.querySelector('.envelope-container');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleGuestCountChange = (count: number) => {
    if (count >= 1 && count <= 20) {
      setGuestCount(count);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    setIsSaved(false);

    if (name.trim() === "") {
      setAlert({ message: "이름을 입력해 주세요", type: "error" });
      setIsLoading(false);
      return;
    }
    if ((phone.length !== 11 && phone.startsWith("010")) || (phone.length !== 10 && !phone.startsWith("010"))) {
      setAlert({ message: "전화번호를 올바르게 입력해 주세요", type: "error" });
      setIsLoading(false);
      return;
    }
    if (guestCount <= 0) {
      setAlert({ message: "참석 인원을 선택해 주세요", type: "error" });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("https://5qaikiqqnb.execute-api.ap-northeast-2.amazonaws.com/default/saveWeddingGuest", {
        method: "POST",
        body: JSON.stringify({ name, phone, guestCount }),
      });
      const data = await response.json();

      if (response.ok) {
        setAlert({ message: SUCCESS_MESSAGE, type: "success" });
        setTimeout(() => {
          setIsSaved(true);
        }, 1600);
        setIsLoading(false);
      } else {
        setAlert({ message: data.error || ERROR_MESSAGE, type: "error" });
        setIsLoading(false);  
      }
    } catch (error) {
      setAlert({ message: ERROR_MESSAGE, type: "error" });
      setIsLoading(false);
    }  
  };

  return (
    <>
      {alert && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <div
        style={{
          width: 330,
          height: 200,
          borderRadius: "5px",
          border: "double 3px #121212",
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
              y: [20, -10, 0]
            }}
            transition={{
              duration: 0.8,
              times: [0, 0.3, 1],
              ease: "easeOut"
            }}
          >
            <StampText>저장완료</StampText>
          </StampContainer>
        )}
        <FormContainer>
          <div
            style={{
              fontFamily: "helvetica",
              fontSize: "1.5rem",
              color: colorToken.black,
              letterSpacing: "-0.05em",
            }}
          >
            RSVP
          </div>
          <InputGroup>
            <NameInput 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              onFocus={handleFocus}
            />
            <Label>NAME</Label>
          </InputGroup>
          <InputGroup>
            <NameInput 
              value={phone} 
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11);
                setPhone(value);
              }}
              type="tel"
              inputMode="numeric"
              placeholder="01012345678"
              pattern="[0-9]*"
              maxLength={11}
              onFocus={handleFocus}
            />
            <Label>PHONE</Label>
          </InputGroup>

          <InputGroup>
            <GuestCountContainer>
              <CountButton 
                onClick={() => handleGuestCountChange(guestCount - 1)}
                disabled={guestCount <= 1}
              >
                -
              </CountButton>
              <CountDisplay>{guestCount}명</CountDisplay>
              <CountButton 
                onClick={() => handleGuestCountChange(guestCount + 1)}
                disabled={guestCount >= 30}
              >
                +
              </CountButton>
            </GuestCountContainer>
            <Label>참석 인원</Label>
          </InputGroup>

          <InputGroup>
            <SaveButton
              variant="contained"
              onClick={handleSave}
              disabled={isLoading}
            >
              저장하기
            </SaveButton>
          </InputGroup>

          {/* <InputGroup>
            <SwitchToggle
              style={{ width: "160px" }}
              onClick={() => setSelectedType(selectedType === "A" ? "B" : "A")}
            >
              <ToggleCircle
                animate={{
                  x: selectedType === "A" ? 2 : 95,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              />
              <ToggleText
                style={{ padding: "0 0 0 25px" }}
                isActive={selectedType === "A"}
              >
                신랑측
              </ToggleText>
              <ToggleText
                style={{ padding: "0 25px 0 0 " }}
                isActive={selectedType === "B"}
              >
                신부측
              </ToggleText>
            </SwitchToggle>
            <Label style={{ width: "100px" }}></Label>
          </InputGroup> */}

          {/* <InputGroup>
            <SwitchToggle
              style={{ width: "120px" }}
              onClick={() => setAttendance(attendance === "Y" ? "N" : "Y")}
            >
              <ToggleCircle
                animate={{
                  x: attendance === "Y" ? 5 : 50,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              />
              <ToggleText
                style={{ padding: "0 0 0 22px" }}
                isActive={attendance === "Y"}
              >
                참석
              </ToggleText>
              <ToggleText
                style={{ padding: "0 22px 0 0" }}
                isActive={attendance === "N"}
              >
                불참
              </ToggleText>
            </SwitchToggle>
            <Label style={{ width: "100px" }}>attendance</Label>
          </InputGroup> */}
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
  gap: "5px",
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
  width: "150px",
  borderTop: "1px solid #121212",
  fontFamily: "SUITRegular",
  fontSize: "0.6rem",
  color: "#121212",
  textAlign: "center",
});

const NameInput = styled.input({
  padding: "4px",
  border: "0.5px solid #ccc",
  borderRadius: "2px",
  fontSize: "0.8rem",
  width: "150px",
  textAlign: "center",
});

const SwitchToggle = styled.div({
  position: "relative",
  width: "140px",
  height: "30px",
  backgroundColor: "#fff",
  borderRadius: "5px",
  padding: "1px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow:
    "inset 0 2px 4px rgba(0,0,0,0.1), inset 0 -1px 2px rgba(0,0,0,0.05)",
  overflow: "hidden", // 추가: 내부 요소가 밖으로 나가지 않도록
});

const ToggleCircle = styled(motion.div)({
  position: "absolute",
  width: "50px",
  height: "22px",
  backgroundColor: "#fff0",
  border: "1px solid #121212",
  filter: "blur(0.3px)",
  borderRadius: "15px",
  // boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
});

const ToggleText = styled.span<{ isActive: boolean }>(({ isActive }) => ({
  color: isActive ? "#121212" : "#121212",
  fontSize: "12px",
  fontWeight: isActive ? "600" : "400",
  zIndex: 1,
  padding: "0 20px",
  transition: "all 0.3s",
}));

const GuestCountContainer = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  width: "150px",
});

const CountButton = styled.button<{ disabled?: boolean }>(({ disabled }) => ({
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  border: "1px solid #ccc",
  backgroundColor: "#fff",
  color: disabled ? "#ccc" : "#121212",
  fontSize: "1.2rem",
  cursor: disabled ? "not-allowed" : "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: disabled ? "#fff" : "#f5f5f5",
  },
  "&:active": {
    backgroundColor: disabled ? "#fff" : "#e5e5e5",
  },
}));

const CountDisplay = styled.div({
  width: "60px",
  textAlign: "center",
  fontSize: "0.9rem",
  color: "#121212",
  fontWeight: "500",
});

const SaveButton = styled(Button)({
  width: "150px",
  height: "30px",
  backgroundColor: "#121212",
  color: "#fff",
  fontFamily: "SUITRegular",
  fontSize: "0.8rem",
  textTransform: "none",
  borderRadius: "2px",
  "&:hover": {
    backgroundColor: "#333",
  },
  "&:active": {
    backgroundColor: "#000",
  },
});

const StampContainer = styled(motion.div)({
  position: "absolute",
  bottom: "10px",
  right: "10px",
  transform: "rotate(-15deg)",
  width: "80px",
  height: "80px",
  border: "3px solid #ff4444",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0.95,
  zIndex: 1,
  boxShadow: "0 0 15px rgba(255, 68, 68, 0.4)",
  backgroundColor: "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(2px)",
  transformOrigin: "center center",
});

const StampText = styled.div({
  color: "#ff4444",
  fontFamily: "SUITRegular",
  fontSize: "0.9rem",
  fontWeight: "bold",
  transform: "rotate(15deg)",
  textShadow: "0 0 8px rgba(255, 68, 68, 0.6)",
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

const LoadingText = styled.div({
  fontFamily: "SUITRegular",
  fontSize: "0.8rem",
  color: "#121212",
  letterSpacing: "-0.5px",
});
