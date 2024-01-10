import React, { useState, useRef } from 'react';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ko';


const DaypickerComponent = (children) => {
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
    setIsListVisible(!isListVisible);
  };

  if (isListVisible) {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
        <DatePicker // date calander로 대체?
          open={isListVisible}
          onClose={toggleCalander}
          value={startDate}
          inputFormat={"yyyy-MM-dd"}
          mask={"____-__-__"}
          onChange={(newValue) => {
            setStartDate(newValue);
          }
          }
          style={styles.calanderStyle}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <input {...startProps} placeholder="시작 날짜" />
              <input {...endProps} placeholder="종료 날짜" />
            </React.Fragment>
          )}
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
