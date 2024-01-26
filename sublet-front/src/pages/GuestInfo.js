import { useEffect, useState } from "react";
import { ReservationInfo } from "../components/Reservation";
import * as w from "../components/styles/Wrapper.style"
import * as s from "../components/styles/GuestInfo.style"
function User({ user }) {

  const userPrivateComponent = (
    <div>
      <h2 className="text-2xl font-extrabold">사용자 정보</h2>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <div className="ml-4">
        <div className="w-2/6">
          <p className="text-lg font-medium inline-flex">이메일: {user.email}</p>
          <s.change_button>이메일 수정하기</s.change_button>
        </div>
        <div className="mt-2 w-2/6">
          <p className="text-lg font-medium inline-flex">전화번호: {user.phone}</p>
          <s.change_button>전화번호 수정하기</s.change_button>
        </div>
      </div>
    </div>)
  const image_link = `${process.env.REACT_APP_BACKEND_URL}/public_user/${user.image_id}.jpg`

  const userBaseComponent = (
    <div>
      <s.image_upload_button>
        <img src={image_link} className="hover:opacity-60 object-scale-down rounded-lg rounded-lg" alt="my image" />
      </s.image_upload_button>


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
  console.log("[userInfo]", userInfo)
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