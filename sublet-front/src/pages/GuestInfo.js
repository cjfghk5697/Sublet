import { useEffect, useState } from "react";
import { ReservationInfo } from "../components/guestInfoComponents/Reservation";
import { ImageDialog, EmailDialog, PhoneDialog, VerifyEmailDialog } from "../components/Popup.js";
import { guestInfoPopUpStore } from "../components/store/guestInfoStore.js";
import { useTitle } from "../components/hook/HookCollect.js"
import * as w from "../components/styles/Wrapper.style"
import * as s from "../components/styles/SummaryBlock.styles.js"
import { PostInfo } from "../components/guestInfoComponents/PostBlock.js";
import { FetchGetRequest } from "../components/FetchList.js";
import { DateFormat, StyleComponent, priceToString } from "../components/StaticComponents.js";
import { RequsetSummaryBlock } from "../components/SummaryBlock.js";
import Header from "../components/Header.js";


function RequestListComponent() {
  const request = FetchGetRequest()


  return (
    <div className="mb-4 mt-8">
      <w.SecondHead className="inline">요청서 현황</w.SecondHead>
      <s.black_upload_button>요청서 올리기</s.black_upload_button>
      <w.Horizon />
      {request.length > 0 ?
        (request.map((res) => {
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
            />)
        })) : (<p className="text-base font-extrabold">올린 요청서가 아직 없습니다.</p>)
      }
    </div>
  )
}

function User({ user }) {
  useTitle("프로필 | ItHome")

  const image_link = `${process.env.REACT_APP_BACKEND_URL}/public_user/${user.image_id}.jpg`

  const { setImagePopUpState, setEmailPopUpState, setPhonePopUpState, setVerifyEmailPopUpState } = guestInfoPopUpStore((state) => ({
    setImagePopUpState: state.setImagePopUpState,
    setEmailPopUpState: state.setEmailPopUpState,
    setPhonePopUpState: state.setPhonePopUpState,
    setVerifyEmailPopUpState: state.setVerifyEmailPopUpState
  }))

  const onVerifyEmailHandle = () => {
    setVerifyEmailPopUpState(true)
  }

  const userPrivateComponent = (
    <div>
      <w.SecondHead>사용자 정보</w.SecondHead>

      <w.Horizon />
      <div className="ml-4 mt-4">
        <div className="w-2/6">
          <s.label>이메일</s.label>
          <div>
            <div className="inline-block">
              <p className="text-lg font-medium justify-start">{user.email}</p>
            </div>
            <s.change_button onClick={setEmailPopUpState} className="justify-end">
              <StyleComponent
                content="FixInfo"
              />
            </s.change_button>
          </div>
          <w.Horizon />
          <EmailDialog
            originalEmail={user.email}
          />

        </div>

        {user.verify_email ?
          (
            <div>
              <p>인증 완료✅</p>
            </div>
          ) :
          (
            <div>
              <s.black_upload_button onClick={onVerifyEmailHandle}>
                인증하기
              </s.black_upload_button>
            </div>
          )
        }
        <VerifyEmailDialog
          email={user.email}
        />
        <div className="mt-4 w-2/6">
          <s.label>전화번호</s.label>
          <div>
            <div className="inline-block">
              <p className="text-lg font-medium inline-flex">{user.phone}</p>
            </div>
            <s.change_button onClick={setPhonePopUpState}>
              <StyleComponent
                content="FixInfo"
              />
            </s.change_button>
          </div>
          <w.Horizon />

          <PhoneDialog
            originalPhone={user.phone}
          />
        </div>
      </div>
    </div>
  )

  const userBaseComponent = (
    <div>
      <s.image_upload_button onClick={setImagePopUpState} className="object-cover w-46 h-26">
        <img src={image_link} className="hover:opacity-60 object-scale-down rounded-lg rounded-lg" alt="my profile" />
      </s.image_upload_button>
      <ImageDialog
      />

      <w.SecondHead className="mt-3">{user.username}</w.SecondHead>
      <p className="text-base font-extrabold underline text-gray-400/200">{user.school}</p>
      <p className="text-base">신분증 {user.id_card ? '인증 완료✅' : '인증 안됨'}</p>
    </div>
  )

  return (
    <div>
      <Header />

      <div style={{ fontFamily: "Pretendard" }} className="flex grid grid-cols-7">
        <div className="ml-3 mt-5">
          {userBaseComponent}
        </div>

        <div className="mb-2 ml-7 col-span-6 mt-5 w-5/6">
          <ReservationInfo />
          {userPrivateComponent}
          <PostInfo />
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
        'Content-Type': 'application/json'
      },
    };

    const json = await (
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/profile`, requestOptions
      )
    ).json();
    setLoading(true)
    setUserInfo(json)
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <w.Wrapper>
      {loading &&
        <User user={userInfo} />
      };
    </w.Wrapper>
  );
}

export default GuestInfo;