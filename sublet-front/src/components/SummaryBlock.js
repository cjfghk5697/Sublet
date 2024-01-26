import { useState } from "react";
import { DateFormat, priceToString } from "./StaticComponents.js";
import * as s from './styles/SummaryBlock.styles.js'
import './styles/Popup.styles.css'
import { Reservation_Dialog } from "./Popup.js";

function SummaryBlock({ title, start_day, end_day, pay, host, room_image, key_num }) {
  const [popupState, setpopupState] = useState(false)
  const startStr = DateFormat(start_day)
  const endStr = DateFormat(end_day)

  const clickHandler = () => {
    setpopupState(!popupState)
  }

  const image_link = `${process.env.REACT_APP_BACKEND_URL}/public/${room_image}.jpg`
  const main_text = "예약중인 숙소를 취소하시겠습니까?"
  const sub_text = "환불규정 및 취급 수수료를 확인했습니다"

  pay = priceToString(pay)

  return (
    <div className="flex grid grid-cols-5 mt-4 ml-4">
      <div>
        <img
          className="objec t-scale-down rounded-lg"
          src={image_link}></img>
      </div>
      <div className="mb-2 ml-3 col-span-4">
        <h2 className="text-2xl font-extrabold">{title}</h2>
        <p className="ml-3 text-lg font-medium">호스트: {host}</p>
        <p className="ml-3 text-lg font-medium">기간: {startStr} ~ {endStr}</p>
        <p className="ml-3 text-lg font-medium">비용: {pay}</p>
        <div>
          <s.block_cancel_button
            onClick={clickHandler}>
            취소하기
          </s.block_cancel_button>
          {popupState &&
            (<Reservation_Dialog
              main_text={main_text}
              sub_text={sub_text}
              key_num={key_num}
            />)}
          <s.block_detail_button>
            상세정보
          </s.block_detail_button>
        </div>
      </div>
    </div >

  );
}

export default SummaryBlock