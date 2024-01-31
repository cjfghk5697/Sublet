import { useEffect, useState } from "react";
import { ReservationInfo } from "../components/Reservation";
import { ImageDialog, EmailDialog, PhoneDialog } from "../components/Popup.js";
import { guestInfoPopUpStore } from "../components/store/guestInfoStore.js";
import * as w from "../components/styles/Wrapper.style"
import * as s from "../components/styles/SummaryBlock.styles.js"

function User({ user }) {
  const { setImagePopUpState, setEmailPopUpState, setPhonePopUpState, imagePopUpState, emailPopUpState, phonePopUpState } = guestInfoPopUpStore((state) => ({
    setImagePopUpState: state.setImagePopUpState,
    setEmailPopUpState: state.setEmailPopUpState,
    setPhonePopUpState: state.setPhonePopUpState,
    imagePopUpState: state.imagePopUpState,
    emailPopUpState: state.emailPopUpState,
    phonePopUpState: state.phonePopUpState,
  }))

  const userPrivateComponent = (
    <div>
      <h2 className="text-2xl font-extrabold">사용자 정보</h2>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <div className="ml-4 mt-4">
        <div className="w-2/6">
          <label className="block mb-0.5 text-sm font-semibold text-gray-900">이메일</label>
          <p className="text-lg font-medium inline-flex">{user.email}</p>
          <s.change_button onClick={setEmailPopUpState}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z" /></svg>
          </s.change_button>

          {emailPopUpState &&
            (<EmailDialog
              originalEmail={user.email}
            />)}

          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
        </div>
        <div className="mt-4 w-2/6">
          <label className="block mb-0.5 text-sm font-semibold text-gray-900">전화번호</label>
          <p className="text-lg font-medium inline-flex">{user.phone}</p>
          <s.change_button onClick={setPhonePopUpState}>
            <svg xmlns="http://www.w3.org/2000/svg" className="fill-gray-700" width="24" height="24" viewBox="0 0 24 24">
              <path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z" />
            </svg>
          </s.change_button>
          {phonePopUpState &&
            (<PhoneDialog
              originalPhone={user.phone}
            />)}
          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
        </div>
      </div>
    </div>)
  const image_link = `${process.env.REACT_APP_BACKEND_URL}/public_user/${user.image_id}.jpg`

  const userBaseComponent = (
    <div>
      <s.image_upload_button onClick={setImagePopUpState}>
        <img src={image_link} className="hover:opacity-60 object-scale-down rounded-lg rounded-lg" alt="my profile" />
      </s.image_upload_button>
      {imagePopUpState &&
        (<ImageDialog
        />)}

      <p className="text-2xl font-extrabold mt-3">{user.username}</p>
      <p className="text-base font-extrabold underline text-gray-400/200">{user.school}</p>
      <p className="text-base">신분증 {user.id_card ? '인증 완료✅' : '인증 안됨'}</p>
      {/* 신분증 인증 버튼 */}
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
      </div>
    </div>
  );
}

function GuestInfo() {
  //Login("evan1", "5s34S2349!#")

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