import { useState } from "react";
import { DateFormat, priceToString } from "./StaticComponents.js";
import * as s from './styles/SummaryBlock.styles.js'
import './styles/Popup.styles.css'
import { ReservationDialog } from "./Popup.js";

function ReservationSummaryBlock({ title, start_day, end_day, pay, host, room_image, key_num }) {
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
            (<ReservationDialog
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

function PostSummaryBlock({ title, accomodation_type, post_date, price, request, contract, private_post, address, room_image }) {

  const image_link = `${process.env.REACT_APP_BACKEND_URL}/public/${room_image}.jpg`
  console.log('[PostSummary]', title, image_link)
  return (
    <div className="flex grid grid-cols-5 mt-4 ml-4">
      <div>
        <img
          className="objec t-scale-down rounded-lg"
          src={image_link}></img>
      </div>
      <div className="mb-2 ml-3 col-span-4">
        <h2 className="text-2xl font-extrabold">{title}</h2>
        <p className="ml-3 text-lg font-medium">주소: {address}</p>
        <p className="ml-3 text-lg font-medium">숙소 유형: {accomodation_type}</p>
        <p className="ml-3 text-lg font-medium">비용: {price}</p>
        <p className="ml-3 text-lg font-medium">게시일: {post_date}</p>
        <p className="ml-3 text-lg font-medium">요청서 상황: {request ? "진행 중" : "x"}</p>
        <p className="ml-3 text-lg font-medium">계약 {contract ? "인증 완료" : "인증 안됨"}</p>
        <p className="ml-3 text-lg font-medium">공개 여부: {private_post ? "공개" : "비공개"}</p>
      </div>
    </div>
  )
}


export { ReservationSummaryBlock, PostSummaryBlock }