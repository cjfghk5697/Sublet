import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatepickerComponent = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      customInput={<ExampleCustomInput />}
    />
  );
};

const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => {
  return (
    <button className="example-custom-input" onClick={onClick} ref={ref}>
      <span>📅</span> {/* 여기에 달력 아이콘을 넣으세요 */}
      <span>{value}</span>
    </button>
  );
});

export default DatepickerComponent;
