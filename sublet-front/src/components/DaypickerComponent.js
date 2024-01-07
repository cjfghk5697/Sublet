import React, { useState, useRef } from 'react';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

const DaypickerComponent = (children) => {
  const [isListVisible, setIsListVisible] = useState(false);
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

  return (
    <div>
      <button ref={buttonRef} onClick={toggleCalander}>
        <div style={styles.serachByDate}>
          날짜
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateRangeOutlinedIcon />
          </LocalizationProvider>
        </div>
      </button>
      {isListVisible && (

        <DatePicker />
      )}
    </div>
  );
}
export default DaypickerComponent;
