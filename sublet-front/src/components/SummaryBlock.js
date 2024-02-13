import { useState } from "react";
import { DateFormat, priceToString } from "./StaticComponents.js";
import * as s from './styles/SummaryBlock.styles.js'
import './styles/Popup.styles.css'
import { DeletePostDialog, PostDetailDialog, ReservationDialog, ReservationListDialog } from "./Popup.js";

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
          <s.reservation_cancel_button
            onClick={clickHandler}>
            취소하기
          </s.reservation_cancel_button>
          {popupState &&
            (<ReservationDialog
              main_text={main_text}
              sub_text={sub_text}
              key_num={key_num}
            />)}
          <s.reservation_detail_button>
            상세정보
          </s.reservation_detail_button>
        </div>
      </div>
    </div >

  );
}

function PostSummaryBlock({ title, post_key, accomodation_type, post_date, pay, request, contract, private_post, address, room_image }) {

  const image_link = `${process.env.REACT_APP_BACKEND_URL}/public/${room_image}.jpg`

  const [detailPopUpState, setDetailPopupState] = useState(false)
  const [reservationPopUpState, setReservationPopupState] = useState(false)
  const [deletePopUpState, setDeletePopupState] = useState(false)

  const detailPopUpHandle = () => {
    setDetailPopupState(!detailPopUpState)
  }
  const reservationPopUpHandle = () => {
    setReservationPopupState(!reservationPopUpState)
  }
  const deletePopUpHandle = () => {
    setDeletePopupState(!deletePopUpState)
  }

  return (
    <div className="flex grid grid-cols-5 mt-4 ml-4">
      <div>
        <img
          className="objec t-scale-down rounded-lg"
          src={image_link}></img>
      </div>
      <div className="mb-2 ml-3 col-span-4">
        <div className="inline-block">
          <h2 className="text-2xl font-extrabold float-start mr-4">{title} </h2>
          {contract ?
            (
              <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                <path d="M14.5 0.541992C6.91 0.541992 0.75 6.70199 0.75 14.292C0.75 21.882 6.91 28.042 14.5 28.042C22.09 28.042 28.25 21.882 28.25 14.292C28.25 6.70199 22.09 0.541992 14.5 0.541992ZM10.7738 20.1907L5.8375 15.2545C5.30125 14.7182 5.30125 13.852 5.8375 13.3157C6.37375 12.7795 7.24 12.7795 7.77625 13.3157L11.75 17.2757L21.21 7.81574C21.7462 7.27949 22.6125 7.27949 23.1488 7.81574C23.685 8.35199 23.685 9.21824 23.1488 9.75449L12.7125 20.1907C12.19 20.727 11.31 20.727 10.7738 20.1907Z" fill="#6724F7" />
              </svg>) :
            (
              <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                <path d="M14.5 0.929199C6.91 0.929199 0.75 7.0892 0.75 14.6792C0.75 22.2692 6.91 28.4292 14.5 28.4292C22.09 28.4292 28.25 22.2692 28.25 14.6792C28.25 7.0892 22.09 0.929199 14.5 0.929199ZM10.7738 20.5779L5.8375 15.6417C5.30125 15.1054 5.30125 14.2392 5.8375 13.7029C6.37375 13.1667 7.24 13.1667 7.77625 13.7029L11.75 17.6629L21.21 8.20295C21.7462 7.6667 22.6125 7.6667 23.1488 8.20295C23.685 8.7392 23.685 9.60545 23.1488 10.1417L12.7125 20.5779C12.19 21.1142 11.31 21.1142 10.7738 20.5779Z" fill="#616161" />
              </svg>
            )}
        </div>

        <p className="ml-3 text-lg font-medium">주소: {address}</p>
        <p className="ml-3 text-lg font-medium">숙박료: {pay}</p>
        <s.post_detail_button onClick={detailPopUpHandle}>
          상세정보
        </s.post_detail_button>

        <s.post_detail_button className="ml-4">
          요청서 {request ? "진행 중" : "진행하기"}
        </s.post_detail_button>

        <s.post_detail_button className="ml-4" onClick={reservationPopUpHandle}>
          예약현황
        </s.post_detail_button>

        <s.delete_button_able className="ml-4" onClick={deletePopUpHandle}>
          삭제하기
        </s.delete_button_able>

        {detailPopUpState && <PostDetailDialog
          title={title}
          accomodation_type={accomodation_type}
          post_date={post_date}
          pay={pay}
          request={request}
          private_post={private_post}
          contract={contract}
          address={address}
          room_image={image_link}
        />}
        {reservationPopUpState &&
          <ReservationListDialog
            post_key={post_key}
          />}

        {deletePopUpState &&
          <DeletePostDialog
            key_num={post_key}
          />}

      </div>
    </div>
  )
}


export { ReservationSummaryBlock, PostSummaryBlock }