import { useState } from "react";
import PopUp from "./Popup";
import DateFormat from "./Date";
function SummaryBlock({ title, start_day, end_day, pay, host, room_image, key_num }) {
  console.log('[SummaryBlock]', title, start_day, end_day, pay, host, room_image, key_num)
  const [popupState, setpopupState] = useState(false)
  const startStr = DateFormat(start_day)
  const endStr = DateFormat(end_day)

  const clickHandler = () => {
    setpopupState(!popupState)
  }

  const image_link = `${env.FRONTEND_URL}/${room_image}.jpg`
  const main_text = "예약중인 숙소를 취소하시겠습니까?"
  const sub_text = "환불규정 및 취급 수수료를 확인했습니다"

  return (
    <div className="flex grid grid-cols-5 mt-4 ml-4">
      <div>
        <img
          className="object-scale-down rounded-lg"
          src={image_link}></img>
      </div>
      <div className="mb-2 ml-3 col-span-4">
        <h2 className="text-2xl font-extrabold">{title}</h2>
        <p className="ml-3 text-lg font-medium">호스트: {host}</p>
        <p className="ml-3 text-lg font-medium">기간: {startStr} ~ {endStr}</p>
        <p className="ml-3 text-lg font-medium">비용: {pay}</p>
        <div>
          <button
            onClick={clickHandler}
            className="bg-white hover:bg-gray-100 text-[#F62424] font-semibold py-2 px-4 border border-gray-200 shadow-xl rounded-lg">
            취소하기
          </button>
          {popupState ?
            (<PopUp
              main_text={main_text}
              sub_text={sub_text}
              key_num={key_num}
            />) : ("")}
          <button className="bg-white hover:bg-gray-100 text-black font-semibold py-2 px-4 border border-gray-200 shadow-xl rounded-lg ml-4">
            상세정보
          </button>
        </div>
      </div>
    </div >

  );
}

export default SummaryBlock