import { useState } from "react";
import { DateFormat, priceToString } from "./StaticComponents.js";
import Modal from 'react-bootstrap/Modal';
import * as s from './styles/SummaryBlock.styles.js'
import './styles/Popup.styles.css'

function PopUp({ main_text, sub_text, key_num }) {
  const [show, setShow] = useState(true);
  const [checkState, setCheckState] = useState(false)
  const [deleteState, setDeleteState] = useState(true)

  const handleClose = () => setShow(false);

  const checkHandled = () => {
    setCheckState(!checkState)
  }

  const deleteHandled = async () => {

    const requestOptions = {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        key: key_num
      })
    };

    await (
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/reservation`
        , requestOptions)
    ).json();
    setDeleteState(false)

  };

  return (
    <>
      {deleteState && (
        <Modal show={show} className="container bg-white border border-gray-300 shadow-xl rounded-lg">
          <Modal.Body>
            <div className='text-center'>
              <p className="text-lg font-extrabold mt-3">{main_text}</p>
              <div>
                <p className="mt-3  font-medium">
                  <s.input_checkbox type="checkbox" checked={checkState} onChange={checkHandled} />
                  {sub_text}
                </p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className='mt-5'>
              <s.back_button onClick={handleClose} className="">
                나가기
              </s.back_button>
              {checkState ? (<s.delete_button_able onClick={deleteHandled} >
                취소하기
              </s.delete_button_able>) : (<s.delete_button_disabled disabled>
                취소하기
              </s.delete_button_disabled>)}
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}


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
          className="object-scale-down rounded-lg"
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
            (<PopUp
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