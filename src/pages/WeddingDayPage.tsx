import styled from "@emotion/styled";
import { DateCalendar } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { motion, useInView, animate, cubicBezier } from "motion/react";
import colorToken from "@/utils/colorToken";
import { useEffect, useState, useRef } from "react";

import duration from "dayjs/plugin/duration.js";
import ShowText from "@/components/showText";
dayjs.extend(duration);

const targetDate = dayjs("2025-06-21 18:00:00");

const Card = styled(motion.div)({
  width: "100%",
  height: "100%",
  backgroundColor: "#ffffff",
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
  paddingTop: "4px",
});

const Square = styled(motion.div)({
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

const squareAnimation = {
  initial: {
    x: "-50%",
    y: "-50%",
    top: "50%",
    left: "50%",
    filter: "blur(4px)",
  },
  whileInView: {
    x: 0,
    y: 0,
    top: "0%",
    left: "0%",
    filter: "blur(0px)",
  },
  transition: { duration: 0.8 },
  viewport: { once: false },
};

function WeddingDayPage() {
  const [remainingTime, setRemainingTime] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
  });

  const dateRef = useRef(null);
  const isDateInView = useInView(dateRef, { once: false });

  const countRef = useRef(null);
  const isCountInView = useInView(countRef, { once: false });

  const [displayNumbers, setDisplayNumbers] = useState({
    months: Number(String(remainingTime.months).padStart(2, "0")),
    days: Number(String(remainingTime.days).padStart(2, "0")),
    hours: Number(String(remainingTime.hours).padStart(2, "0")),
    minutes: Number(String(remainingTime.minutes).padStart(2, "0")),
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

  useEffect(() => {
    if (isCountInView) {
      const animateNumber = (key: keyof typeof displayNumbers) => {
        const startValue = remainingTime[key] + 12;
        animate(startValue, remainingTime[key], {
          duration: 3,
          ease: cubicBezier(0.33, 1, 0.68, 1),
          onUpdate: (value) => {
            setDisplayNumbers((prev) => ({
              ...prev,
              [key]: Math.round(value),
            }));
          },
        });
      };

      setTimeout(() => animateNumber("months"), 0);
      setTimeout(() => animateNumber("days"), 400);
      setTimeout(() => animateNumber("hours"), 800);
      setTimeout(() => animateNumber("minutes"), 1200);
    }
  }, [isCountInView, remainingTime]);

  return (
    <Card>
      <InnerBox ref={dateRef}>
        <TopLeftSquare {...squareAnimation} />
        <TopRightSquare
          {...{
            ...squareAnimation,
            initial: { ...squareAnimation.initial, left: "50%" },
            whileInView: {
              ...squareAnimation.whileInView,
              left: "auto",
              right: "0%",
            },
          }}
        />
        <BottomLeftSquare
          {...{
            ...squareAnimation,
            initial: { ...squareAnimation.initial, top: "50%" },
            whileInView: {
              ...squareAnimation.whileInView,
              top: "auto",
              bottom: "0%",
            },
          }}
        />
        <BottomRightSquare
          {...{
            ...squareAnimation,
            initial: { ...squareAnimation.initial, left: "50%", top: "50%" },
            whileInView: {
              ...squareAnimation.whileInView,
              left: "auto",
              top: "auto",
              right: "0%",
              bottom: "0%",
            },
          }}
        />
        <div style={{ height: "1.6rem", marginTop: "10px" }}>
          <span
            style={{
              fontFamily: "helvetica",
              fontSize: "1rem",
              letterSpacing: "-0.09em",
            }}
          >
            SAVE
          </span>
          <span style={{ fontFamily: "PPPlayground", fontSize: "2rem" }}>
            The
          </span>
          <span
            style={{
              fontFamily: "helvetica",
              fontSize: "1rem",
              letterSpacing: "-0.09em",
            }}
          >
            {" "}
            DATE
          </span>
        </div>

        <motion.div
          initial={{ filter: "blur(8px)", opacity: 0 }}
          animate={
            isDateInView
              ? { filter: "blur(0px)", opacity: 1 }
              : { filter: "blur(8px)", opacity: 0 }
          }
          transition={{ duration: 0.3 }}
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
        </motion.div>

        <div style={{ fontSize: "0.6rem", fontFamily: "satoshi" }}>
          <ShowText isInView={isDateInView}>SATURDAY</ShowText>
          <ShowText delay={0.2} isInView={isDateInView}>
            SUMMER
          </ShowText>
          <ShowText delay={0.4} noSpace isInView={isDateInView}>
            NIGHT
          </ShowText>
        </div>

        <motion.div
          initial={{ filter: "blur(8px)", opacity: 0 }}
          animate={
            isDateInView
              ? { filter: "blur(0px)", opacity: 1 }
              : { filter: "blur(8px)", opacity: 0 }
          }
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <DateNumber>6PM</DateNumber>
        </motion.div>

        <div
          style={{
            fontSize: "0.6rem",
            fontFamily: "satoshi",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <ShowText delay={0.6} noSpace isInView={isDateInView}>
            ✶ COMING SOON ✶
          </ShowText>
        </div>

        <motion.div
          ref={countRef}
          style={{ display: "flex", flexDirection: "row", gap: "2px" }}
        >
          <DateSlotNumber>
            {String(displayNumbers.months).padStart(2, "0")}
          </DateSlotNumber>
          <DateSlotLabel>Months</DateSlotLabel>
          <DateSlotNumber>
            {String(displayNumbers.days).padStart(2, "0")}
          </DateSlotNumber>
          <DateSlotLabel>Days</DateSlotLabel>
          <DateSlotNumber>
            {String(displayNumbers.hours).padStart(2, "0")}
          </DateSlotNumber>
          <DateSlotLabel>Hours</DateSlotLabel>
          <DateSlotNumber>
            {String(displayNumbers.minutes).padStart(2, "0")}
          </DateSlotNumber>
          <DateSlotLabel>Minutes</DateSlotLabel>
        </motion.div>
      </InnerBox>

      <DateCalendar
        defaultValue={targetDate}
        readOnly
        disableHighlightToday
        showDaysOutsideCurrentMonth={false}
        disabled
        views={["day"]}
        slots={{
          leftArrowIcon: () => null,
          rightArrowIcon: () => null,
          day: (props) => {
            // 현재 월에 속하는 날짜인지 확인
            const isCurrentMonth = props.day.month() === targetDate.month();

            // 현재 월에 속하지 않으면 빈 div 반환
            if (!isCurrentMonth) {
              return <div style={{ width: "28px", height: "28px" }}></div>;
            }

            // 선택된 날짜(결혼 날짜)만 특별 스타일링
            const isWeddingDay = targetDate.isSame(props.day, "day");
            if (isWeddingDay) {
              return (
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    backgroundColor: colorToken.beige,
                    color: colorToken.black,
                    fontWeight: 800,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.7rem",
                    fontFamily: "SUITRegular",
                  }}
                >
                  {props.day.date()}
                </div>
              );
            }

            // 현재 월의 다른 날짜
            return (
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.7rem",
                  fontFamily: "SUITRegular",
                }}
              >
                {props.day.date()}
              </div>
            );
          },
        }}
        sx={{
          "& .MuiPickersDay-root.Mui-selected": {
            backgroundColor: colorToken.beige,
            color: colorToken.black,
            fontWeight: "800",
          },
          "& .MuiPickersDay-root:focus.Mui-selected": {
            backgroundColor: colorToken.beige,
          },
          "& .MuiPickersDay-root:hover": {
            backgroundColor: "transparent",
            cursor: "default",
          },
          "& .MuiPickersDay-root.Mui-selected:focus": {
            backgroundColor: colorToken.beige,
          },
          "& .MuiPickersDay-root.Mui-selected:hover": {
            backgroundColor: colorToken.beige,
          },
          "& .MuiDayCalendar-header": {
            paddingTop: "0px",
            paddingLeft: "4px",
            paddingRight: "4px",
            "& .MuiTypography-root": {
              fontSize: "0.6rem",
              fontFamily: "PPEditorialNew",
              fontWeight: "800",
              color: colorToken.black,
              width: "28px",
              height: "24px",
              margin: "0px",
              lineHeight: "1em",
            },
          },
          "& .MuiPickersCalendar-root": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          "& .MuiPickersDay-root": {
            fontSize: "0.7rem",
            fontFamily: "SUITRegular",
            fontWeight: "800",
            margin: "0px",
            lineHeight: "1",
            padding: "0 0 0 0",
          },
          "& .MuiPickersCalendarHeader-root": {
            marginBottom: "10px",
            minHeight: "10px",
            "& .MuiPickersCalendarHeader-label": {
              fontSize: "1.2rem",
              fontWeight: "400",
              fontFamily: "PPEditorialNew",
              paddingBottom: "0px",
            },
          },
          "& .MuiDayCalendar-monthContainer": {
            margin: "0px",
          },
          width: "250px",
          height: "200px",
          marginTop: "30px",
          marginBottom: "20px",
        }}
      />
    </Card>
  );
}

export default WeddingDayPage;
