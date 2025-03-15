import styled from "@emotion/styled";
import { motion } from "motion/react";
import { useState } from "react";
import colorToken from "../utils/colorToken";

function Letter() {
  const [name, setName] = useState("");
  const [selectedType, setSelectedType] = useState("A");
  const [attendance, setAttendance] = useState<"Y" | "N">("Y");

  return (
    <div
      style={{
        width: 330,
        height: 200,
        borderRadius: "5px",
        border: "double 3px #121212",
        backgroundColor: "#fff",
        boxSizing: "border-box",
        borderSpacing: "3px",
      }}
    >
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
          <NameInput value={name} onChange={(e) => setName(e.target.value)} />
          <Label style={{ width: "150px" }}>NAME</Label>
        </InputGroup>

        <InputGroup>
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
        </InputGroup>

        <InputGroup>
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
        </InputGroup>
      </FormContainer>
    </div>
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
});

const NameInput = styled.input({
  padding: "4px",
  border: "0.5px solid #ccc",
  borderRadius: "2px",
  fontSize: "0.8rem",
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
