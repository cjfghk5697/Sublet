import { useState } from "react";
import { DateFormat, StyleComponent, priceToString } from "./StaticComponents.js";
import * as s from './styles/SummaryBlock.styles.js'
import * as w from './styles/Wrapper.style.js'

import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { DeletePost, DeleteRequest, FetchDeleteReservation, FetchGetRequestByRequestId } from "./FetchList.js";
import { ReservationByPostKeyInfo } from "./guestInfoComponents/Reservation.js";
import { PostRequest, RequestByPostKeyInfo } from "./guestInfoComponents/Request.js";
import { PostSummaryDetailDialog, RequestSummaryDetailDialog } from "./Popup.js";
import { useNavigate } from "react-router-dom";

function RequsetSummaryBlock({ request_text, city, Post, request_key, gu, dong, accomodation_type, start_date, end_date, pay, complete, contract }) {
  const address = city + ' ' + gu + ' ' + dong;


  const [inputs, setInputs] = useState({
    detailPopUpState: false,
    respondPopUpState: false,
    deletePopUpState: false,

  })

  const {
    detailPopUpState,
    respondPopUpState,
    deletePopUpState,
  } = inputs;

  const onChange = e => {
    setInputs({
      ...inputs,
      [e.currentTarget.name]: !inputs[e.currentTarget.name]
    });
  };

  const deleteHandle = () => {
    DeleteRequest(request_key)
  }

  return (
    <div className="ml-4">
      <w.SecondHead>• {address}</w.SecondHead>
      {/*  */}
      <div className="ml-2">
        {complete ?
          (
            <p className="ml-3 text-lg text-[#F62424] font-medium">
              요청서 완료
            </p>) :
          (
            <p className="ml-3 text-sm text-blue-700 font-bold">
              요청서 진행중
            </p>
          )}
      </div>
      {/* 공개 변경 버튼 추가 */}
      <div className="block">
        <s.post_detail_button className="ml-4" name="detailPopUpState" onClick={onChange}>
          상세 정보
        </s.post_detail_button>
        <s.post_detail_button className="ml-4" name="respondPopUpState" onClick={onChange}>
          응답 리스트
        </s.post_detail_button>
        <s.delete_button_able name="deletePopUpState" onClick={onChange}>
          삭제하기
        </s.delete_button_able>
      </div>

      <div name="requestDetailDialog">
        <Dialog open={detailPopUpState} className="border border-gray-300 shadow-xl rounded-lg">
          <DialogTitle>
            <form>
              <s.change_button type="button" name="detailPopUpState" onClick={onChange} >
                <StyleComponent
                  content="CloseButton" />
              </s.change_button>
            </form>
          </DialogTitle>
          <DialogContent sx={{ width: 512 }} className='text-left'>
            <RequestSummaryDetailDialog
              address={address}
              contract={contract}
              accomodation_type={accomodation_type}
              pay={pay}
              start_date={start_date}
              end_date={end_date}
              request_text={request_text}
            />
          </DialogContent>
        </Dialog>

      </div>

      <div name="respondDialog">
        <Dialog open={respondPopUpState} className="border border-gray-300 shadow-xl rounded-lg">
          <DialogTitle>
            <form>
              <s.change_button type="button" name="respondPopUpState" onClick={onChange}>
                <StyleComponent
                  content="CloseButton" />
              </s.change_button>
            </form>
          </DialogTitle>
          <DialogContent className='text-left'>

            {Post.length > 0 ?
              <RequestByPostKeyInfo
                Post={Post} /> :
              <p>아직 매칭이 되지 않았습니다.</p>
            }
          </DialogContent>
        </Dialog>

      </div>

      <div name="deletePopUpState">
        <Dialog open={deletePopUpState} className="border border-gray-300 shadow-xl rounded-lg">
          <DialogTitle>
            <form>
              <s.change_button type="button" onClick={onChange} name="deletePopUpState">
                <StyleComponent
                  content="CloseButton" />
              </s.change_button>
            </form>
          </DialogTitle>
          <DialogContent className='font-black text-center'>

            <p className="text-lg font-extrabold mt-3">요청서를 삭제하시겠습니까?</p>
            <p className="text-sm font-thin mt-1 float-left">삭제를 하실 경우 요청서 내역은 사라집니다.</p>

          </DialogContent>
          <DialogActions>

            <div>
              <form>
                <s.delete_button_able onClick={deleteHandle} >
                  삭제하기
                </s.delete_button_able>
              </form>
            </div>
          </DialogActions>
        </Dialog>

      </div>
    </div >
  );
}

function ReservationSummaryBlock({ room, start_day, end_day }) {
  const [popupState, setpopupState] = useState(false)
  const startStr = DateFormat(start_day)
  const endStr = DateFormat(end_day)
  const navigate = useNavigate();

  const clickHandler = () => {
    setpopupState(!popupState)
    setCheckState(false)
  }

  const [checkState, setCheckState] = useState(false)

  const checkHandled = () => {
    setCheckState(!checkState)
  }
  const deleteReservationHandle = () => {
    FetchDeleteReservation(room.key)
  }
  const image_link = `${process.env.REACT_APP_BACKEND_URL}/public/${room.Post.image_id[0]}.jpg`

  const pay = priceToString(room.pay)

  const MoveToRoomInfo = ({ room }) => { // 일단 방 정보 넘김과 동시에 방 정보 페이지로 이동.
    console.log(room.Post)
    navigate(`/roominfo/${room.Post.key}`, {
      room: room.Post,
    });
  };

  return (

    <div className="flex grid grid-cols-5 mt-4 ml-4">
      <div className="w-46 h-26">
        <img
          className="object-cover rounded-lg"
          src={image_link}></img>
      </div>
      <div className="mb-2 ml-3 col-span-4">
        <w.SecondHead >
          <a href="" onClick={() => { MoveToRoomInfo({ room }) }}>
            {room.Post.title}
          </a>
        </w.SecondHead>
        <w.DetailParagraph>호스트: {room.Post.postuser.user_id}</w.DetailParagraph>
        <w.DetailParagraph>기간: {startStr} ~ {endStr}</w.DetailParagraph>
        <w.DetailParagraph>비용: {pay}</w.DetailParagraph>
        <div>
          <div>
            <s.delete_button_able
              onClick={clickHandler}>
              취소하기
            </s.delete_button_able>

            <s.post_detail_button className="ml-4">
              상세 정보
            </s.post_detail_button>
          </div>
          <>
            <Dialog open={popupState} className="border border-gray-300 shadow-xl rounded-lg">
              <DialogTitle>
                <form>
                  <s.change_button type="button" onClick={clickHandler}>
                    <StyleComponent
                      content="CloseButton" />
                  </s.change_button>
                </form>
              </DialogTitle>
              <DialogContent className='font-black text-center'>
                <p className="text-lg font-extrabold mt-3">예약중인 숙소를 취소하시겠습니까?</p>
                <div>
                  <s.info_text className="mt-3 ">
                    <s.input_checkbox type="checkbox" checked={checkState} onChange={checkHandled} />
                    환불규정을 확인하였습니다.
                  </s.info_text>
                </div>
              </DialogContent>
              <DialogActions>
                <div>
                  {checkState ? (
                    <form>
                      <s.delete_button_able onClick={deleteReservationHandle} >
                        취소하기
                      </s.delete_button_able>
                    </form>
                  ) : (<s.delete_button_disabled disabled>
                    취소하기
                  </s.delete_button_disabled>)}
                </div>
              </DialogActions>

            </Dialog>
          </>
        </div>
      </div>
    </div >

  );
}


function PostSummaryBlock({ room, guest_mode = true, post_date, pay, address }) {

  const image_link = `${process.env.REACT_APP_BACKEND_URL}/public/${room.image_id[0]}.jpg`
  const [inputs, setInputs] = useState({
    detailDialogShow: false,
    reservationDialogShow: false,
    deletelDialogShow: false,
    requestDialogShow: false,
  })

  const {
    detailDialogShow,
    reservationDialogShow,
    deletelDialogShow,
    requestDialogShow,
  } = inputs;

  const onChange = e => {
    setInputs({
      ...inputs,
      [e.currentTarget.name]: !inputs[e.currentTarget.name]
    });
  };

  const deleteHandle = () => {
    DeletePost(room.key)

  }
  const navigate = useNavigate();
  const MoveToRoomInfo = ({ room }) => { // 일단 방 정보 넘김과 동시에 방 정보 페이지로 이동.
    navigate(`/roominfo/${room.key}`, {
      room: room,
    });
  };
  const request_list = FetchGetRequestByRequestId(room.requestIDs)
  return (
    <div className="flex grid grid-cols-5 mt-4 ml-4">
      <div className="w-46 h-26">
        <img
          className="object-cover rounded-lg"
          src={image_link}></img>
      </div>
      <div className="mb-2 ml-3 col-span-4">
        <div className="inline-block">
          <w.SecondHead className="float-start mr-4">

            <a href="" onClick={() => { MoveToRoomInfo({ room }) }}>
              {room.title}
            </a>
          </w.SecondHead>
          {room.contract ?
            (
              <StyleComponent
                content="VerifyRoom" />) :
            (
              <StyleComponent
                content="UnverifyRoom" />
            )}
        </div>

        <w.DetailParagraph>주소: {address}</w.DetailParagraph>
        <w.DetailParagraph>숙박료: {pay}</w.DetailParagraph>
        <div className="block">
          {guest_mode &&
            <>
              <s.post_detail_button name="detailDialogShow" onClick={onChange}>
                상세 정보
              </s.post_detail_button>

              <s.post_detail_button className="ml-4" name="requestDialogShow" onClick={onChange}>
                받은 요청서
              </s.post_detail_button>

              <s.post_detail_button className="ml-4" name="reservationDialogShow" onClick={onChange}>
                예약현황
              </s.post_detail_button>

              <s.delete_button_able className="ml-4" name="deletelDialogShow" onClick={onChange}>
                삭제하기
              </s.delete_button_able>
            </>
          }

        </div>

        <div name="detailDialog">
          <Dialog open={detailDialogShow} className="border border-gray-300 shadow-xl rounded-lg">
            <DialogTitle>
              <form>
                <s.change_button type="button" name="detailDialogShow" onClick={onChange}>
                  <StyleComponent
                    content="CloseButton" />
                </s.change_button>
              </form>
            </DialogTitle>
            <DialogContent sx={{ width: 512 }} className='text-left'>
              <PostSummaryDetailDialog
                title={room.title}
                contract={room.contract}
                private_post={room.private}
                accomodation_type={room.accomodation_type}
                post_date={post_date}
                pay={pay}
                address={address}
              />
            </DialogContent>

          </Dialog>

        </div>

        <div name="reservationDialog">
          <Dialog open={reservationDialogShow} className="border border-gray-300 shadow-xl rounded-lg">
            <DialogTitle>
              <form>
                <s.change_button type="button" name="reservationDialogShow" onClick={onChange}>
                  <StyleComponent
                    content="CloseButton" />
                </s.change_button>
              </form>
            </DialogTitle>
            <DialogContent sx={{ width: 512 }} className='text-left'>
              <ReservationByPostKeyInfo
                post_key={room.key} />
            </DialogContent>

          </Dialog>

        </div>

        <div name="deleteDialog">
          <Dialog open={deletelDialogShow} className="border border-gray-300 shadow-xl rounded-lg">
            <DialogTitle>

              <form>
                <s.change_button type="button" onClick={onChange} name="deletelDialogShow">
                  <StyleComponent
                    content="CloseButton" />
                </s.change_button>
              </form>
            </DialogTitle>
            <DialogContent className='font-black text-center'>

              <p className="text-lg font-extrabold ">게시글을 삭제하시겠습니까?</p>
              <p className="text-sm font-thin mt-1 float-left">삭제를 하실 경우 과거 예약정보까지 전부 사라짐을 동의합니다.</p>
            </DialogContent>
            <DialogActions>

              <div >
                <form>
                  <s.delete_button_able onClick={deleteHandle} >
                    삭제하기
                  </s.delete_button_able>
                </form>
              </div>
            </DialogActions>
          </Dialog>

        </div>

        <div name="requestDialog">
          <Dialog open={requestDialogShow} className="border border-gray-300 shadow-xl rounded-lg">
            <DialogTitle>
              <form>
                <s.change_button type="button" name="requestDialogShow" onClick={onChange}>
                  <StyleComponent
                    content="CloseButton" />
                </s.change_button>
              </form>
            </DialogTitle>
            <DialogContent sx={{ width: 512 }} className='text-left'>
              {request_list !== false &&
                <PostRequest
                  request_list={request_list} />}
            </DialogContent>

          </Dialog>

        </div>
      </div>
    </div>
  )
}


export { ReservationSummaryBlock, PostSummaryBlock, RequsetSummaryBlock }