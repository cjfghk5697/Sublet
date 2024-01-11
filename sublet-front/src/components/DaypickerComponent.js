import React, { useState, useRef } from 'react';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ko';


const DaypickerComponent = () => {
  const [isListVisible, setIsListVisible] = useState(false);
  const [startDate, setStartDate] = useState(); // [start, end]
  const buttonRef = useRef(null);

  const styles = {
    serachByDate: {
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 1)',
    },
    calanderStyle: {
      backgroundColor: 'white',
      border: '1px solid black',
      position: 'absolute',
      top: `${buttonRef.current ? buttonRef.current.offsetTop + buttonRef.current.offsetHeight : 0}px`,
      left: `${buttonRef.current ? buttonRef.current.offsetLeft : 0}px`,
      zIndex: 101
    },
  };

  const toggleCalander = () => {
    setIsListVisible(true);
  };

  if (isListVisible) {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
        <DatePicker
          startText="시작일"
          endText="종료일"
          value={startDate}
          onChange={(newDate) => {
            setStartDate(newDate);
          }}
        />
      </LocalizationProvider>
    );
  }
  else if (false) { // 만약 DatePicker에서 날짜가 선택되었다면 else if로 startProps와 endProps를 띄워준다.
    return (
      <></>
    );
  }
  else {
    return (
      <button ref={buttonRef} onClick={toggleCalander}>
        <div style={styles.serachByDate}>
          날짜
          <DateRangeOutlinedIcon />
        </div>
      </button>
    );
  }
}
export default DaypickerComponent;
