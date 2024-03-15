import { useEffect, useState } from 'react';
import { ReservationInfo } from '../components/guestInfoComponents/Reservation';
import {
  ImageDialog,
  EmailDialog,
  PhoneDialog,
  VerifyEmailDialog,
  PostUploadDialog,
} from '../components/Popup.js';
import { guestInfoPopUpStore } from '../components/store/guestInfoStore.js';
import { useTitle } from '../components/hook/HookCollect.js';
import * as s from '../components/styles/Public.styles.js';
import { PostInfo } from '../components/guestInfoComponents/PostBlock.js';
import { FetchGetRequest } from '../components/FetchList.js';
import {
  Alert,
  DateFormat,
  StyleComponent,
  FailAlert,
  priceToString,
} from '../components/StaticComponents.js';
import { RequsetSummaryBlock } from '../components/SummaryBlock.js';
import Header from '../components/Header.js';

function RequestListComponent() {
  const request = FetchGetRequest();

  return (
    <div className="mb-4 mt-8">
      <s.SecondHead className="inline">요청서 현황</s.SecondHead>
      <s.NormalButton>요청서 올리기</s.NormalButton>
      {request.length > 0 ? (
        request.map(res => {
          const start_date = DateFormat(res.start_day);
          const end_date = DateFormat(res.end_day);
          const price = priceToString(res.price);

          return (
            <RequsetSummaryBlock
              city={res.city}
              gu={res.gu}
              dong={res.dong}
              request_key={res.key}
              accomodation_type={res.accomodation_type}
              start_date={start_date}
              end_date={end_date}
              pay={price}
              contract={res.contract}
              complete={res.complete}
              Post={res.Post}
              request_text={res.request_text}
            />
          );
        })
      ) : (
        <s.NormalText>올린 요청서가 아직 없습니다.</s.NormalText>
      )}
    </div>
  );
}

function User({ user }) {
  useTitle('프로필 | ItHome');

  const image_link = `${process.env.REACT_APP_BACKEND_URL}/public_user/${user.image_id}.jpg`;

  const {
    setImagePopUpState,
    setEmailPopUpState,
    setPhonePopUpState,
    setVerifyEmailPopUpState,
  } = guestInfoPopUpStore(state => ({
    setImagePopUpState: state.setImagePopUpState,
    setEmailPopUpState: state.setEmailPopUpState,
    setPhonePopUpState: state.setPhonePopUpState,
    setVerifyEmailPopUpState: state.setVerifyEmailPopUpState,
  }));

  const onVerifyEmailHandle = () => {
    setVerifyEmailPopUpState(true);
  };

  const userPrivateComponent = (
    <div>
      <s.SecondHead>사용자 정보</s.SecondHead>

      <div className="ml-4 mt-4">
        <div className="w-2/6">
          <s.Label>이메일</s.Label>
          <div>
            <div className="inline-block">
              <p className="text-lg font-medium justify-start">{user.email}</p>
            </div>
            <s.SvgHoverButton
              onClick={setEmailPopUpState}
              className="justify-end">
              <StyleComponent content="FixInfo" />
            </s.SvgHoverButton>
            {!user.verify_email && (
              <div>
                <s.NormalButton
                  className="float-left"
                  onClick={onVerifyEmailHandle}>
                  인증하기
                </s.NormalButton>
              </div>
            )}
          </div>
          <hr className="h-px bg-gray-600 border-0 clear-both" />
          <EmailDialog originalEmail={user.email} />
        </div>

        <VerifyEmailDialog email={user.email} />
        <div className="mt-4 w-2/6">
          <s.Label>전화번호</s.Label>
          <div>
            <div className="inline-block">
              <p className="text-lg font-medium inline-flex">{user.phone}</p>
            </div>
            <s.SvgHoverButton onClick={setPhonePopUpState}>
              <StyleComponent content="FixInfo" />
            </s.SvgHoverButton>
          </div>
          <hr className="h-px bg-gray-600 border-0 clear-both" />

          <PhoneDialog originalPhone={user.phone} />
        </div>
      </div>
    </div>
  );

  const userBaseComponent = (
    <div>
      <s.ImageUploadButton
        onClick={setImagePopUpState}
        className="object-cover w-46 h-26">
        <img
          src={image_link}
          className="hover:opacity-60 object-scale-down rounded-lg rounded-lg"
          alt="my profile"
        />
      </s.ImageUploadButton>
      <ImageDialog />

      <s.SecondHead className="mt-3">{user.username}</s.SecondHead>
      <s.NormalText className="underline">{user.school}</s.NormalText>

      <s.NormalText>
        신분증 {user.id_card ? '인증 완료✅' : '인증 안됨❌'}
      </s.NormalText>

      <s.NormalText>
        학교 이메일 {user.verify_email ? '인증 완료✅' : '인증 안됨❌'}
      </s.NormalText>

      <s.NormalText>
        전화번호 {user.verify_phone ? '인증 완료✅' : '인증 안됨❌'}
      </s.NormalText>

      <s.NormalText>
        재학증 {user.verify_school ? '인증 완료✅' : '인증 안됨❌'}
      </s.NormalText>
    </div>
  );

  return (
    <div>
      <div
        style={{ fontFamily: 'Pretendard' }}
        className="flex grid grid-cols-7">
        <div className="ml-3 mt-5">{userBaseComponent}</div>

        <div className="mb-2 ml-7 col-span-6 mt-5 w-5/6">
          <ReservationInfo />
          <s.Horizon className="my-y" />

          {userPrivateComponent}
          <s.Horizon className="mt-4 md-2" />

          <PostInfo user_id={user.user_id} />
          <PostUploadDialog />
          <s.Horizon className="my-2" />

          <RequestListComponent />
        </div>
      </div>
    </div>
  );
}

function GuestInfo() {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState([]);

  const getUserInfo = async () => {
    const requestOptions = {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const json = await (
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/profile`,
        requestOptions,
      )
    ).json();
    setLoading(true);
    setUserInfo(json);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return <s.Wrapper>{loading && <User user={userInfo} />};</s.Wrapper>;
}

export default GuestInfo;
