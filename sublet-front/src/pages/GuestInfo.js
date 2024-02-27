import { useEffect, useState } from "react";
import { ReservationInfo } from "../components/Reservation";
import { ImageDialog, EmailDialog, PhoneDialog, PostUploadDialog } from "../components/Popup.js";
import { guestInfoPopUpStore } from "../components/store/guestInfoStore.js";
import { useTitle } from "../components/hook/HookCollect.js"
import * as w from "../components/styles/Wrapper.style"
import * as s from "../components/styles/SummaryBlock.styles.js"
import { PostInfo } from "../components/PostBlock.js";
import { FetchGetRequest } from "../components/FetchList.js";
import { DateFormat, priceToString } from "../components/StaticComponents.js";
import { RequsetSummaryBlock } from "../components/SummaryBlock.js";

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
  useTitle("프로필 - Sublet")

  const image_link = `${process.env.REACT_APP_BACKEND_URL}/public_user/${user.image_id}.jpg`

  const { setImagePopUpState, setEmailPopUpState, setPhonePopUpState } = guestInfoPopUpStore((state) => ({
    setImagePopUpState: state.setImagePopUpState,
    setEmailPopUpState: state.setEmailPopUpState,
    setPhonePopUpState: state.setPhonePopUpState,
  }))

  const userPrivateComponent = (
    <div>
      <h2 className="text-2xl font-extrabold">사용자 정보</h2>

      <w.Horizon />
      <div className="ml-4 mt-4">
        <div className="w-2/6">
          <label className="block mb-0.5 text-sm font-semibold text-gray-900">이메일</label>
          <div>
            <div className="inline-block">
              <p className="text-lg font-medium justify-start">{user.email}</p>
            </div>
            <s.change_button onClick={setEmailPopUpState} className="justify-end">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z" /></svg>
            </s.change_button>
          </div>
          <w.Horizon />
          <EmailDialog
            originalEmail={user.email}
          />

        </div>
        <div className="mt-4 w-2/6">
          <label className="block mb-0.5 text-sm font-semibold text-gray-900">전화번호</label>
          <div>
            <div className="inline-block">
              <p className="text-lg font-medium inline-flex">{user.phone}</p>
            </div>
            <s.change_button onClick={setPhonePopUpState}>
              <svg xmlns="http://www.w3.org/2000/svg" className="fill-gray-700" width="24" height="24" viewBox="0 0 24 24">
                <path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z" />
              </svg>
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

      <p className="text-2xl font-extrabold mt-3">{user.username}</p>
      <p className="text-base font-extrabold underline text-gray-400/200">{user.school}</p>
      <p className="text-base">신분증 {user.id_card ? '인증 완료✅' : '인증 안됨'}</p>
    </div>
  )

  return (
    <div style={{ fontFamily: "Pretendard" }} className="flex grid grid-cols-7">
      <div className="ml-3 mt-5">
        {userBaseComponent}
      </div>

      <div className="mb-2 ml-7 col-span-6 mt-5 w-5/6">
        <ReservationInfo />
        {userPrivateComponent}
        <PostInfo />
        <PostUploadDialog />
        <RequestListComponent />
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