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

export function StyleComponent({ content }) {
  if (typeof content !== "string") {
    console.log('undefined type')
    return;
  }
  else if (!content) {
    console.log('Content name isnt given')
    return;
  }
  else if (content === "CloseButton") {
    return (
      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="black" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    )
  }
  else if (content === "VerifyRoom") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
        <path d="M14.5 0.541992C6.91 0.541992 0.75 6.70199 0.75 14.292C0.75 21.882 6.91 28.042 14.5 28.042C22.09 28.042 28.25 21.882 28.25 14.292C28.25 6.70199 22.09 0.541992 14.5 0.541992ZM10.7738 20.1907L5.8375 15.2545C5.30125 14.7182 5.30125 13.852 5.8375 13.3157C6.37375 12.7795 7.24 12.7795 7.77625 13.3157L11.75 17.2757L21.21 7.81574C21.7462 7.27949 22.6125 7.27949 23.1488 7.81574C23.685 8.35199 23.685 9.21824 23.1488 9.75449L12.7125 20.1907C12.19 20.727 11.31 20.727 10.7738 20.1907Z" fill="#6724F7" />
      </svg>
    )
  }
  else if (content === "UnverifyRoom") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
        <path d="M14.5 0.929199C6.91 0.929199 0.75 7.0892 0.75 14.6792C0.75 22.2692 6.91 28.4292 14.5 28.4292C22.09 28.4292 28.25 22.2692 28.25 14.6792C28.25 7.0892 22.09 0.929199 14.5 0.929199ZM10.7738 20.5779L5.8375 15.6417C5.30125 15.1054 5.30125 14.2392 5.8375 13.7029C6.37375 13.1667 7.24 13.1667 7.77625 13.7029L11.75 17.6629L21.21 8.20295C21.7462 7.6667 22.6125 7.6667 23.1488 8.20295C23.685 8.7392 23.685 9.60545 23.1488 10.1417L12.7125 20.5779C12.19 21.1142 11.31 21.1142 10.7738 20.5779Z" fill="#616161" />
      </svg>
    )
  }
  else if (content === "ImageDrop") {
    return (
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <svg className="w-8 h-8 mb-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
          <path stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
        </svg>
        <p className="mb-2 text-sm text-gray-500 "><span className="font-semibold">Click to upload</span> or drag and drop</p>
        <p className="text-xs text-gray-500 ">JPG파일만 가능합니다(MAX. 800x400px)</p>
      </div>
    )
  }
  else {
    console.log('check content name')
    return;
  }


}

export function Information({ title, info }) {
  return (
    <div>
      <p className="ml-1 text-m font-bold">• {title}</p>
      <p className="ml-4 text-sm font-medium">{info}</p>
    </div>
  )
}