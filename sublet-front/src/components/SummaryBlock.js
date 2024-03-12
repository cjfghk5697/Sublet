import { useState } from 'react';
import { DateFormat, StyleComponent, priceToString } from './StaticComponents.js';
import * as s from './styles/Public.styles.js';

import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { DeletePost, DeleteRequest, FetchDeleteReservation, FetchGetRequestByRequestId } from './FetchList.js';
import { ReservationByPostKeyInfo } from './guestInfoComponents/Reservation.js';
import { PostRequest, RequestByPostKeyInfo } from './guestInfoComponents/Request.js';
import { PostEditDialog, PostSummaryDetailDialog, RequestSummaryDetailDialog } from './Popup.js';
import { useNavigate } from 'react-router-dom';

function RequsetSummaryBlock({ request_text, city, Post, request_key, gu, dong, accomodation_type, start_date, end_date, pay, complete, contract }) {
  const address = city + ' ' + gu + ' ' + dong;


  const [inputs, setInputs] = useState({
    detailPopUpState: false,
    respondPopUpState: false,
    deletePopUpState: false,

  });

  const {
    detailPopUpState,
    respondPopUpState,
    deletePopUpState,
  } = inputs;

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.currentTarget.name]: !inputs[e.currentTarget.name],
    });
  };

  const deleteHandle = () => {
    DeleteRequest(request_key);
  };

  return (
    <div className="ml-4">
      <s.SecondHead>• {address}</s.SecondHead>
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
        <s.InfoButton className="ml-4" name="detailPopUpState" onClick={onChange}>
          상세 정보
        </s.InfoButton>
        <s.InfoButton className="ml-4" name="respondPopUpState" onClick={onChange}>
          응답 리스트
        </s.InfoButton>
        <s.DeleteButton name="deletePopUpState" onClick={onChange}>
          삭제하기
        </s.DeleteButton>
      </div>

      <div name="requestDetailDialog">
        <Dialog open={detailPopUpState} className="border border-gray-300 shadow-xl rounded-lg">
          <DialogTitle>
            <form>
              <s.SvgHoverButton type="button" name="detailPopUpState" onClick={onChange} >
                <StyleComponent
                  content="CloseButton" />
              </s.SvgHoverButton>
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
              <s.SvgHoverButton type="button" name="respondPopUpState" onClick={onChange}>
                <StyleComponent
                  content="CloseButton" />
              </s.SvgHoverButton>
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
              <s.SvgHoverButton type="button" onClick={onChange} name="deletePopUpState">
                <StyleComponent
                  content="CloseButton" />
              </s.SvgHoverButton>
            </form>
          </DialogTitle>
          <DialogContent className='font-black text-center'>

            <p className="text-lg font-extrabold mt-3">요청서를 삭제하시겠습니까?</p>
            <p className="text-sm font-thin mt-1 float-left">삭제를 하실 경우 요청서 내역은 사라집니다.</p>

          </DialogContent>
          <DialogActions>

            <div>
              <form>
                <s.DeleteButton onClick={deleteHandle} >
                  삭제하기
                </s.DeleteButton>
              </form>
            </div>
          </DialogActions>
        </Dialog>

      </div>
    </div >
  );
}

function ReservationSummaryBlock({ room, start_day, end_day }) {
  const [popupState, setpopupState] = useState(false);
  const startStr = DateFormat(start_day);
  const endStr = DateFormat(end_day);
  const navigate = useNavigate();

  const clickHandler = () => {
    setpopupState(!popupState);
    setCheckState(false);
  };

  const [checkState, setCheckState] = useState(false);

  const checkHandled = () => {
    setCheckState(!checkState);
  };
  const deleteReservationHandle = () => {
    FetchDeleteReservation(room.key);
  };
  const image_link = `${process.env.REACT_APP_BACKEND_URL}/public/${room.Post.image_id[0]}.jpg`;

  const pay = priceToString(room.pay);

  const MoveToRoomInfo = ({ room }) => { // 일단 방 정보 넘김과 동시에 방 정보 페이지로 이동.
    console.log(room.Post);
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
        <s.SecondHead >
          <a href="" onClick={() => {
            MoveToRoomInfo({ room });
          }}>
            {room.Post.title}
          </a>
        </s.SecondHead>
        <s.DetailParagraph>호스트: {room.Post.postuser.user_id}</s.DetailParagraph>
        <s.DetailParagraph>기간: {startStr} ~ {endStr}</s.DetailParagraph>
        <s.DetailParagraph>비용: {pay}</s.DetailParagraph>
        <div>
          <div>
            <s.DeleteButton
              onClick={clickHandler}>
              취소하기
            </s.DeleteButton>

            <s.InfoButton className="ml-4">
              상세 정보
            </s.InfoButton>
          </div>
          <>
            <Dialog open={popupState} className="border border-gray-300 shadow-xl rounded-lg">
              <DialogTitle>
                <form>
                  <s.SvgHoverButton type="button" onClick={clickHandler}>
                    <StyleComponent
                      content="CloseButton" />
                  </s.SvgHoverButton>
                </form>
              </DialogTitle>
              <DialogContent className='font-black text-center'>
                <p className="text-lg font-extrabold mt-3">예약중인 숙소를 취소하시겠습니까?</p>
                <div>
                  <s.NormalText className="mt-3 ">
                    <s.Checkbox type="checkbox" checked={checkState} onChange={checkHandled} />
                    환불규정을 확인하였습니다.
                  </s.NormalText>
                </div>
              </DialogContent>
              <DialogActions>
                <div>
                  {checkState ? (
                    <form>
                      <s.DeleteButton onClick={deleteReservationHandle} >
                        취소하기
                      </s.DeleteButton>
                    </form>
                  ) : (<s.DisableButton disabled>
                    취소하기
                  </s.DisableButton>)}
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
  const image_link = `${process.env.REACT_APP_BACKEND_URL}/public/${room.image_id[0]}.jpg`;
  const [inputs, setInputs] = useState({
    detailDialogShow: false,
    reservationDialogShow: false,
    deletelDialogShow: false,
    requestDialogShow: false,
    editRoomDialogShow: false
  });

  const {
    detailDialogShow,
    reservationDialogShow,
    deletelDialogShow,
    requestDialogShow,
    editRoomDialogShow
  } = inputs;

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.currentTarget.name]: !inputs[e.currentTarget.name],
    });
  };

  const deleteHandle = () => {
    DeletePost(room.key);
  };
  const navigate = useNavigate();
  const MoveToRoomInfo = ({ room }) => { // 일단 방 정보 넘김과 동시에 방 정보 페이지로 이동.
    navigate(`/roominfo/${room.key}`, {
      room: room,
    });
  };
  const request_list = FetchGetRequestByRequestId(room.requestIDs);
  return (
    <div className="flex grid grid-cols-5 mt-4 ml-4">
      <div className="w-46 h-26">
        <img
          className="object-cover rounded-lg"
          src={image_link}></img>
      </div>
      <div className="mb-2 ml-3 col-span-4">
        <div className="inline-block">
          <s.SecondHead className="float-start mr-4">

            <a href="" onClick={() => {
              MoveToRoomInfo({ room });
            }}>
              {room.title}
            </a>
          </s.SecondHead>
          {room.contract ?
            (
              <StyleComponent
                content="VerifyRoom" />) :
            (
              <StyleComponent
                content="UnverifyRoom" />
            )}
        </div>

        <s.DetailParagraph>주소: {address}</s.DetailParagraph>
        <s.DetailParagraph>숙박료: {pay}</s.DetailParagraph>
        <div className="block">
          {guest_mode &&
            <>
              <s.InfoButton name="detailDialogShow" onClick={onChange}>
                상세 정보
              </s.InfoButton>

              <s.InfoButton className="ml-4" name="requestDialogShow" onClick={onChange}>
                받은 요청서
              </s.InfoButton>

              <s.InfoButton className="ml-4" name="reservationDialogShow" onClick={onChange}>
                예약현황
              </s.InfoButton>
              <s.InfoButton className="ml-4" name="editRoomDialogShow" onClick={onChange}>
                방 수정하기
              </s.InfoButton>

              <s.DeleteButton className="ml-4" name="deletelDialogShow" onClick={onChange}>
                삭제하기
              </s.DeleteButton>
            </>
          }

        </div>

        <div name="detailDialog">
          <Dialog open={detailDialogShow} className="border border-gray-300 shadow-xl rounded-lg">
            <DialogTitle>
              <form>
                <s.SvgHoverButton type="button" name="detailDialogShow" onClick={onChange}>
                  <StyleComponent
                    content="CloseButton" />
                </s.SvgHoverButton>
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
                <s.SvgHoverButton type="button" name="reservationDialogShow" onClick={onChange}>
                  <StyleComponent
                    content="CloseButton" />
                </s.SvgHoverButton>
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
                <s.SvgHoverButton type="button" onClick={onChange} name="deletelDialogShow">
                  <StyleComponent
                    content="CloseButton" />
                </s.SvgHoverButton>
              </form>
            </DialogTitle>
            <DialogContent className='font-black text-center'>

              <p className="text-lg font-extrabold ">게시글을 삭제하시겠습니까?</p>
              <p className="text-sm font-thin mt-1 float-left">삭제를 하실 경우 과거 예약정보까지 전부 사라짐을 동의합니다.</p>
            </DialogContent>
            <DialogActions>

              <div >
                <form>
                  <s.DeleteButton onClick={deleteHandle} >
                    삭제하기
                  </s.DeleteButton>
                </form>
              </div>
            </DialogActions>
          </Dialog>

        </div>

        <div name="requestDialog">
          <Dialog open={requestDialogShow} className="border border-gray-300 shadow-xl rounded-lg">
            <DialogTitle>
              <form>
                <s.SvgHoverButton type="button" name="requestDialogShow" onClick={onChange}>
                  <StyleComponent
                    content="CloseButton" />
                </s.SvgHoverButton>
              </form>
            </DialogTitle>
            <DialogContent sx={{ width: 512 }} className='text-left'>
              {request_list !== false &&
                <PostRequest
                  request_list={request_list} />}
            </DialogContent>

          </Dialog>

        </div>

        <div name="editRoomDialog">
          <Dialog
            open={editRoomDialogShow}
            className="border border-gray-300 shadow-xl rounded-lg"
          >
            <DialogTitle>
              <s.SvgHoverButton type="button" className="float-right" name="editRoomDialogShow" onClick={onChange}>
                <StyleComponent
                  content="CloseButton"
                />
              </s.SvgHoverButton>
            </DialogTitle>
            <PostEditDialog
              post={room}
            />
          </Dialog>
        </div>
      </div>
    </div>
  );
}


export { ReservationSummaryBlock, PostSummaryBlock, RequsetSummaryBlock };
