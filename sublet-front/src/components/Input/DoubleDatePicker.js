import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ko";
import dayjs from "dayjs";

export const DoubleDatePicker = ({ searchDate, setSearchDate }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
        <span>
          <DatePicker
            value={dayjs(searchDate[0])}
            onChange={(newDate) => {
              if (newDate.$d > searchDate[1]) {
                setSearchDate(newDate.$d, newDate.$d);
              } else {
                setSearchDate(newDate.$d, searchDate[1]);
              }
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
            }}
          />
        </span>
    </LocalizationProvider>
  );
};
