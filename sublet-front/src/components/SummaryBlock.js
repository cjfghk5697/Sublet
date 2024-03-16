import { useState } from 'react';
import {
  DateFormat,
  StyleComponent,
  priceToString,
} from './StaticComponents.js';
import * as s from './styles/Public.styles.js';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import {
  FetchDeletePost,
  FetchDeleteRequest,
  FetchDeleteReservation,
  FetchGetRequestByRequestId,
} from './FetchList.js';
import { ReservationByPostKeyInfo } from './guestInfoComponents/Reservation.js';
import {
  PostRequest,
  RequestByPostKeyInfo,
} from './guestInfoComponents/Request.js';
import {
  DialogForm,
  PostEditDialog,
  PostSummaryDetailDialog,
  RequestSummaryDetailDialog,
} from './Popup.js';
import { useNavigate } from 'react-router-dom';

function RequsetSummaryBlock({ request, startDate, endDate, price }) {
  const address = request.city + ' ' + request.gu + ' ' + request.dong;

  const [inputs, setInputs] = useState({
    detailPopUpState: false,
    respondPopUpState: false,
    deletePopUpState: false,
  });
  const { detailPopUpState, respondPopUpState, deletePopUpState } = inputs;
  const infoButtonList = {
    detailPopUpState: '상세 정보',
    respondPopUpState: '응답 리스트',
  };
  const onChange = e => {
    setInputs({
      ...inputs,
      [e.currentTarget.name]: !inputs[e.currentTarget.name],
    });
  };

  const deleteHandle = () => {
    FetchDeleteRequest(request.key);
  };

  return (
    <div className="ml-4">
      <s.SecondHead>• {address}</s.SecondHead>
      {/*  */}
      <div className="ml-2">
        {request.complete ? (
          <p className="ml-3 text-lg text-[#F62424] font-medium">요청서 완료</p>
        ) : (
          <p className="ml-3 text-sm text-blue-700 font-bold">요청서 진행중</p>
        )}
      </div>
      {/* 공개 변경 버튼 추가 */}
      <div className="block">
        {Object.keys(infoButtonList).map(k => {
          return (
            <s.InfoButton className="ml-4" name={k} onClick={onChange}>
              {infoButtonList[k]}
            </s.InfoButton>
          );
        })}
        <s.DeleteButton name="deletePopUpState" onClick={onChange}>
          삭제하기
        </s.DeleteButton>
      </div>

      <div name="requestDetailDialog">
        <DialogForm
          openState={detailPopUpState}
          handleClose={onChange}
          name="detailPopUpState"
          render={() => (
            <label
              htmlFor="test"
              className="block mb-2 text-sm font-medium text-gray-900 float-left">
              test
            </label>
          )}>
          <DialogContent sx={{ width: 512 }} className="text-left">
            <RequestSummaryDetailDialog
              request={request}
              address={address}
              price={price}
              startDate={startDate}
              endDate={endDate}
            />
          </DialogContent>
        </DialogForm>
      </div>

      <div name="respondDialog">
        <DialogForm
          openState={respondPopUpState}
          handleClose={onChange}
          name="respondPopUpState"
          render={() => (
            <label
              htmlFor="test"
              className="block mb-2 text-sm font-medium text-gray-900 float-left">
              test
            </label>
          )}>
          <DialogContent className="text-left">
            {request.Post.length > 0 ? (
              <RequestByPostKeyInfo Post={request.Post} />
            ) : (
              <p>아직 매칭이 되지 않았습니다.</p>
            )}
          </DialogContent>
        </DialogForm>
      </div>

      <div name="deletePopUpState">
        <DialogForm
          openState={deletePopUpState}
          handleClose={onChange}
          name="deletePopUpState"
          render={() => (
            <label
              htmlFor="test"
              className="block mb-2 text-sm font-medium text-gray-900 float-left">
              test
            </label>
          )}>
          <DialogContent className="font-black text-center">
            <p className="text-lg font-extrabold mt-3">
              요청서를 삭제하시겠습니까?
            </p>
            <p className="text-sm font-thin mt-1 float-left">
              삭제를 하실 경우 요청서 내역은 사라집니다.
            </p>
          </DialogContent>
          <DialogActions>
            <div>
              <form>
                <s.DeleteButton onClick={deleteHandle}>삭제하기</s.DeleteButton>
              </form>
            </div>
          </DialogActions>
        </DialogForm>
      </div>
    </div>
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

  const MoveToRoomInfo = ({ room }) => {
    // 일단 방 정보 넘김과 동시에 방 정보 페이지로 이동.
    console.log(room.Post);
    navigate(`/roominfo/${room.Post.key}`, {
      room: room.Post,
    });
  };

  return (
    <div className="flex grid grid-cols-5 mt-4 ml-4">
      <div className="w-46 h-26">
        <img className="object-cover rounded-lg" src={image_link}></img>
      </div>
      <div className="mb-2 ml-3 col-span-4">
        <s.SecondHead>
          <a
            href=""
            onClick={() => {
              MoveToRoomInfo({ room });
            }}>
            {room.Post.title}
          </a>
        </s.SecondHead>
        <s.DetailParagraph>
          호스트: {room.Post.postuser.user_id}
        </s.DetailParagraph>
        <s.DetailParagraph>
          기간: {startStr} ~ {endStr}
        </s.DetailParagraph>
        <s.DetailParagraph>비용: {pay}</s.DetailParagraph>
        <div>
          <div>
            <s.DeleteButton onClick={clickHandler}>취소하기</s.DeleteButton>

            <s.InfoButton className="ml-4">상세 정보</s.InfoButton>
          </div>
          <>
            <Dialog
              open={popupState}
              className="border border-gray-300 shadow-xl rounded-lg">
              <DialogTitle>
                <form>
                  <s.SvgHoverButton type="button" onClick={clickHandler}>
                    <StyleComponent content="CloseButton" />
                  </s.SvgHoverButton>
                </form>
              </DialogTitle>
              <DialogContent className="font-black text-center">
                <p className="text-lg font-extrabold mt-3">
                  예약중인 숙소를 취소하시겠습니까?
                </p>
                <div>
                  <s.NormalText className="mt-3 ">
                    <s.Checkbox
                      type="checkbox"
                      checked={checkState}
                      onChange={checkHandled}
                    />
                    환불규정을 확인하였습니다.
                  </s.NormalText>
                </div>
              </DialogContent>
              <DialogActions>
                <div>
                  {checkState ? (
                    <form>
                      <s.DeleteButton onClick={deleteReservationHandle}>
                        취소하기
                      </s.DeleteButton>
                    </form>
                  ) : (
                    <s.DisableButton disabled>취소하기</s.DisableButton>
                  )}
                </div>
              </DialogActions>
            </Dialog>
          </>
        </div>
      </div>
    </div>
  );
}

function PostSummaryBlock({
  room,
  guestMode = true,
  postDate,
  price,
  address,
}) {
  const image_link = `${process.env.REACT_APP_BACKEND_URL}/public/${room.image_id[0]}.jpg`;
  const [requestInfo, setRequestInfo] = useState([]);

  const [inputs, setInputs] = useState({
    detailDialogShow: false,
    reservationDialogShow: false,
    deletelDialogShow: false,
    requestDialogShow: false,
    editRoomDialogShow: false,
  });

  const {
    detailDialogShow,
    reservationDialogShow,
    deletelDialogShow,
    requestDialogShow,
    editRoomDialogShow,
  } = inputs;
  const infoButtonList = {
    detailDialogShow: '상세 정보',
    requestDialogShow: '받은 요청서',
    reservationDialogShow: '예약현황',
    editRoomDialogShow: '방 수정하기',
  };
  const onChange = e => {
    setInputs({
      ...inputs,
      [e.currentTarget.name]: !inputs[e.currentTarget.name],
    });
  };

  const deleteHandle = () => {
    FetchDeletePost(room.key);
  };
  const navigate = useNavigate();
  const MoveToRoomInfo = ({ room }) => {
    // 일단 방 정보 넘김과 동시에 방 정보 페이지로 이동.
    navigate(`/roominfo/${room.key}`, {
      room: room,
    });
  };
  FetchGetRequestByRequestId(room.requestIDs, setRequestInfo);
  return (
    <div className="flex grid grid-cols-5 mt-4 ml-4">
      <div className="w-46 h-26">
        <img className="object-cover rounded-lg" src={image_link}></img>
      </div>
      <div className="mb-2 ml-3 col-span-4">
        <div className="inline-block">
          <s.SecondHead className="float-start mr-4">
            <a
              href=""
              onClick={() => {
                MoveToRoomInfo({ room });
              }}>
              {room.title}
            </a>
          </s.SecondHead>
          {room.contract ? (
            <StyleComponent content="VerifyRoom" />
          ) : (
            <StyleComponent content="UnverifyRoom" />
          )}
        </div>

        <s.DetailParagraph>주소: {address}</s.DetailParagraph>
        <s.DetailParagraph>숙박료: {price}</s.DetailParagraph>
        <div className="block">
          {guestMode && (
            <>
              {Object.keys(infoButtonList).map(k => {
                return (
                  <s.InfoButton className="ml-4" name={k} onClick={onChange}>
                    {infoButtonList[k]}
                  </s.InfoButton>
                );
              })}

              <s.DeleteButton
                className="ml-4"
                name="deletelDialogShow"
                onClick={onChange}>
                삭제하기
              </s.DeleteButton>
            </>
          )}
        </div>

        <div name="detailDialog">
          <DialogForm
            openState={detailDialogShow}
            handleClose={onChange}
            name="detailDialogShow"
            render={() => (
              <label
                htmlFor="test"
                className="block mb-2 text-sm font-medium text-gray-900 float-left">
                test
              </label>
            )}>
            <DialogContent sx={{ width: 512 }} className="text-left">
              <PostSummaryDetailDialog
                room={room}
                postDate={postDate}
                price={price}
                address={address}
              />
            </DialogContent>
          </DialogForm>
        </div>

        <div name="reservationDialog">
          <DialogForm
            openState={reservationDialogShow}
            handleClose={onChange}
            name="reservationDialogShow"
            render={() => (
              <label
                htmlFor="test"
                className="block mb-2 text-sm font-medium text-gray-900 float-left">
                test
              </label>
            )}>
            <DialogContent sx={{ width: 512 }} className="text-left">
              <ReservationByPostKeyInfo post_key={room.key} />
            </DialogContent>
          </DialogForm>
        </div>

        <div name="deleteDialog">
          <DialogForm
            openState={deletelDialogShow}
            handleClose={onChange}
            name="deletelDialogShow"
            render={() => (
              <label
                htmlFor="test"
                className="block mb-2 text-sm font-medium text-gray-900 float-left">
                test
              </label>
            )}>
            <DialogContent className="font-black text-center">
              <p className="text-lg font-extrabold ">
                게시글을 삭제하시겠습니까?
              </p>
              <p className="text-sm font-thin mt-1 float-left">
                삭제를 하실 경우 과거 예약정보까지 전부 사라짐을 동의합니다.
              </p>
            </DialogContent>
            <DialogActions>
              <div>
                <form>
                  <s.DeleteButton onClick={deleteHandle}>
                    삭제하기
                  </s.DeleteButton>
                </form>
              </div>
            </DialogActions>
          </DialogForm>
        </div>

        <div name="requestDialog">
          <DialogForm
            openState={requestDialogShow}
            handleClose={onChange}
            name="requestDialogShow"
            render={() => (
              <label
                htmlFor="test"
                className="block mb-2 text-sm font-medium text-gray-900 float-left">
                test
              </label>
            )}>
            <DialogContent sx={{ width: 512 }} className="text-left">
              {requestInfo !== false && (
                <PostRequest requestList={requestInfo} />
              )}
            </DialogContent>
          </DialogForm>
        </div>

        <div name="editRoomDialog">
          <DialogForm
            openState={editRoomDialogShow}
            handleClose={onChange}
            name="editRoomDialogShow"
            render={() => (
              <label
                htmlFor="test"
                className="block mb-2 text-sm font-medium text-gray-900 float-left">
                test
              </label>
            )}>
            <PostEditDialog post={room} />
          </DialogForm>
        </div>
      </div>
    </div>
  );
}

export { ReservationSummaryBlock, PostSummaryBlock, RequsetSummaryBlock };
