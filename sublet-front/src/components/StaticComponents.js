import 'animate.css';

export function priceToString(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export function getDateDiff(d1, d2) {
  const date1 = new Date(d1);
  const date2 = new Date(d2);

  const diffDate = date1.getTime() - date2.getTime(); //gettime 함수는  number of milliseconds로 return함

  return Math.abs(diffDate / (1000 * 60 * 60 * 24)); // 밀리세컨 * 초 * 분 * 시 = 일
};

export function DateFormat(day) {
  const dayformat = `${new Date(day).getFullYear()}.${new Date(day).getMonth() + 1}.${new Date(day).getDate()}`;
  return dayformat
}

export function CalulateDate(date, days) {
  const clone_date = new Date(date)
  const cal_date = new Date()
  cal_date.setDate(clone_date.getDate() + days)
  return DateFormat(cal_date)
}

export function Alert() {
  return (
    <div className="animate__animated  animate__delay-1s animate__slower animate__fadeOut shadow p-2 bg-white items-center text-indigo-100 boarder-black leading-none lg:rounded-full flex lg:inline-flex" role="alert">
      <span className="flex rounded-full bg-green-500 uppercase px-2 py-1 text-xs font-bold mr-3"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" /></svg></span>
      <span className="font-semibold text-black mr-2 text-left flex-auto">완료되었습니다!</span>
    </div>
  )
}

