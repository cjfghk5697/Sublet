import React, { useState, useRef } from "react";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IconButton } from "@mui/material";
import { useSearchDateStore } from "../../store/HeaderStore/searchDateStore.js";
import "dayjs/locale/ko";
import dayjs from "dayjs";
import * as s from "../styles/Header.styles.js";

const SearchDate = () => {
  const [isListVisible, setIsListVisible] = useState(false);
  const { searchDate, setSearchDate } = useSearchDateStore(); // useState([null, null]); // [start, end]
  const buttonRef = useRef(null);

  const styles = {
    calandersContainer: {
      justifyContent: "center",
      textAlign: "center",
      display: "flex",
      flexDirection: "row",
    },
    serachByDate: {
      fontWeight: "bold",
      color: "rgba(0, 0, 0, 1)",
    },
    calanderStyle: {
      backgroundColor: "white",
      border: "1px solid black",
      position: "absolute",
      top: `${buttonRef.current
          ? buttonRef.current.offsetTop + buttonRef.current.offsetHeight
          : 0
        }px`,
      left: `${buttonRef.current ? buttonRef.current.offsetLeft : 0}px`,
      zIndex: 101,
    },
  };

  const toggleCalander = () => {
    setIsListVisible(!isListVisible);
  };
  /* range로 해야 좋은데 계속 깨져서, 이걸로 임시 대체 합니다. */
  return isListVisible ? (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <div style={styles.calandersContainer}>
        <span>
          <DatePicker
            value={dayjs(searchDate[0])}
            onChange={(newDate) => {
              if (newDate.$d > searchDate[1]) {
                setSearchDate(newDate.$d, newDate.$d);
              } else {
                setSearchDate(newDate.$d, searchDate[1]);
              }
              // console.log(searchDate);
            }}
          />
        </span>
        ~
        <span>
          <DatePicker
            value={dayjs(searchDate[1])}
            onChange={(newDate) => {
              if (searchDate[0] > newDate.$d) {
                setSearchDate(newDate.$d, newDate.$d);
              } else {
                setSearchDate(searchDate[0], newDate.$d);
              }
              // console.log(searchDate);
            }}
          />
        </span>
      </div>
    </LocalizationProvider>
  ) : (
    <IconButton ref={buttonRef} onClick={toggleCalander}>
      <s.blackBoldFont>
        날짜
        <DateRangeOutlinedIcon />
      </s.blackBoldFont>
    </IconButton>
  );
};
export default SearchDate;
