import styled from "@emotion/styled";
import { DateCalendar } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { motion } from "motion/react";
import colorToken from "../utils/colorToken";
import { useEffect, useState } from "react";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const targetDate = dayjs("2025-06-21 18:00:00");

const Card = styled(motion.div)({
  height: "100vh",
  backgroundColor: "#ffffff0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  filter: "blur(0.3px)",
});

const InnerBox = styled(motion.div)({
  //backgroundColor: "#fff",
  //border: "1px solid #000",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "300px",
  position: "relative",
});

const DateNumber = styled.div({
  fontFamily: "PPEditorialOld",
  fontSize: "2.5rem",
  fontWeight: "400",
  textAlign: "center",
});

const DateSlotWrapper = styled(motion.div)({
  display: "flex",
  flexDirection: "row",
  gap: "2px",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#fff",
});
const DateSlot = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "absolute",
});
const DateSlotNumber = styled.div({
  fontFamily: "PPEditorialNew",
  fontSize: "1rem",
  textAlign: "center",
  paddingLeft: "4px",
});
const DateSlotLabel = styled.div({
  fontFamily: "PPEditorialNew",
  fontSize: "0.8rem",
  textAlign: "center",
  //borderTop: `1.2px solid #121212`,
  paddingTop: "4px",
});

const Square = styled.div({
  position: "absolute",
  width: "10px",
  height: "10px",
});

const TopLeftSquare = styled(Square)({
  top: 0,
  left: 0,
  borderLeft: "1px solid #121212",
  borderTop: "1px solid #121212",
});

const TopRightSquare = styled(Square)({
  top: 0,
  right: 0,
  borderRight: "1px solid #121212",
  borderTop: "1px solid #121212",
});

const BottomLeftSquare = styled(Square)({
  bottom: 0,
  left: 0,
  borderLeft: "1px solid #121212",
  borderBottom: "1px solid #121212",
});

const BottomRightSquare = styled(Square)({
  bottom: 0,
  right: 0,
  borderRight: "1px solid #121212",
  borderBottom: "1px solid #121212",
});

function WeddingDayCard() {
  const [remainingTime, setRemainingTime] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = dayjs();
      const diff = targetDate.diff(now);
      const duration = dayjs.duration(diff);

      const months = duration.months();
      const days = duration.days();
      const hours = duration.hours();
      const minutes = duration.minutes();

      setRemainingTime({ months, days, hours, minutes });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000 * 60);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card>
      <InnerBox>
        <TopLeftSquare />
        <TopRightSquare />
        <BottomLeftSquare />
        <BottomRightSquare />
        <div style={{ height: "1.6rem", marginTop: "10px" }}>
          <span
            style={{
              fontFamily: "helvetica",
              fontSize: "1rem",
              letterSpacing: "-0.09em",
            }}
          >
            SAVE{" "}
          </span>
          <span style={{ fontFamily: "PPPlayground", fontSize: "2rem" }}>
            The{" "}
          </span>
          <span
            style={{
              fontFamily: "helvetica",
              fontSize: "1rem",
              letterSpacing: "-0.09em",
            }}
          >
            DATE
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.3rem",
          }}
        >
          <DateNumber>2025.</DateNumber>
          <DateNumber>06.</DateNumber>
          <DateNumber>21</DateNumber>
        </div>
        <div style={{ fontSize: "0.6rem", fontFamily: "satoshi" }}>
          ✸ SUMMER NIGHT ✸
        </div>
        <DateNumber>6PM</DateNumber>
        <div
          style={{
            fontSize: "0.5rem",
            fontFamily: "satoshi",
            marginTop: "10px",
          }}
        >
          COMING SOON
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "2px" }}>
          <DateSlotNumber>
            {String(remainingTime.months).padStart(2, "0")}
          </DateSlotNumber>
          <DateSlotLabel>Months</DateSlotLabel>
          <DateSlotNumber>
            {String(remainingTime.days).padStart(2, "0")}
          </DateSlotNumber>
          <DateSlotLabel>Days</DateSlotLabel>
          <DateSlotNumber>
            {String(remainingTime.hours).padStart(2, "0")}
          </DateSlotNumber>
          <DateSlotLabel>Hours</DateSlotLabel>
          <DateSlotNumber>
            {String(remainingTime.minutes).padStart(2, "0")}
          </DateSlotNumber>
          <DateSlotLabel>Minutes</DateSlotLabel>
        </div>
      </InnerBox>

      <DateCalendar
        defaultValue={targetDate}
        readOnly
        views={["day"]}
        slots={{
          leftArrowIcon: () => null,
          rightArrowIcon: () => null,
        }}
        sx={{
          "& .MuiPickersDay-root.Mui-selected": {
            backgroundColor: colorToken.black,
            color: colorToken.babyPink,
            borderRadius: "15px",
          },
        }}
      />
    </Card>
  );
}

export default WeddingDayCard;
