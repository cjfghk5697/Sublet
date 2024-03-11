import {create} from 'zustand';
import {DateFormat} from '../StaticComponents';

export const bookingPopUpStore = create((set) => ({
  temp_start_day: DateFormat(Date.now()),
  temp_end_day: '2024.02.11',
  day_pay: 1,
  total_pay: 2913136,
  post_key: '0',
  setTempStartDayState: (day) => set(() => ({
    temp_start_day: day,
  })),
  setTempEndDayState: (day) => set(() => ({
    temo_end_day: day,
  })),
  setDayPayState: (pay) => set(() => ({
    day_pay: pay,
  })),
  setTotalPayState: (pay) => set(() => ({
    total_pay: pay,
  })),
  setPostKey: (key) => set(() => ({
    post_key: key,
  })),
}));


