import { create } from 'zustand';
import { DateFormat } from '../StaticComponents';

export const bookingPopUpStore = create(set => ({
<<<<<<< HEAD
  startDay: DateFormat(Date.now()),
  endDay: DateFormat('2000.01.01'),
  dayPay: 1,
  totalPay: 2913136,
  postKey: '0',
  setTempStartDayState: day =>
    set(() => ({
      startDay: DateFormat(day),
    })),
  setTempEndDayState: day =>
    set(() => ({
      endDay: DateFormat(day),
    })),
  setDayPayState: pay =>
    set(() => ({
      dayPay: pay,
    })),
  setTotalPayState: pay =>
    set(() => ({
      totalPay: pay,
    })),
  setPostKey: key =>
    set(() => ({
      postKey: key,
=======
  temp_start_day: DateFormat(Date.now()),
  temp_end_day: DateFormat('2000.01.01'),
  day_pay: 1,
  total_pay: 2913136,
  post_key: '0',
  setTempStartDayState: day =>
    set(() => ({
      temp_start_day: DateFormat(day),
    })),
  setTempEndDayState: day =>
    set(() => ({
      temp_end_day: DateFormat(day),
    })),
  setDayPayState: pay =>
    set(() => ({
      day_pay: pay,
    })),
  setTotalPayState: pay =>
    set(() => ({
      total_pay: pay,
    })),
  setPostKey: key =>
    set(() => ({
      post_key: key,
>>>>>>> b919846fdafbfe84247b149e8a2381ea5ba2b2a7
    })),
}));
