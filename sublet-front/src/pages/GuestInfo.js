import { useEffect, useState } from "react";
import Login from "../components/Login";
import ReservationInfo from "../components/Reservation";

function User({ user }) {
  const userPrivateComponent = (
    <div>
      <h2 className="text-2xl font-extrabold">사용자 정보</h2>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <div className="ml-4">
        <p className="text-lg font-medium">이메일: {user.email}</p>
        <p className="text-lg font-medium">전화번호: {user.phone}</p>
      </div>
    </div>)

  const userBaseComponent = (
    <div>
      <img className="object-scale-down rounded-lg" src="https://i.stack.imgur.com/l60Hf.png"></img>
      {/*<img src="http://localhost:4000/user/evan1"></img>*/}
      <p className="text-2xl font-extrabold">{user.username}</p>
      <p className="text-base font-extrabold underline text-gray-400/200">{user.school}</p>
      <p className="text-base">신분증 {user.id_card ? '인증 완료✅' : '인증 안됨'}</p>
    </div>
  )
  return (
    <div style={{ fontFamily: "Pretendard" }} className="flex grid grid-cols-7">
      <div className="ml-3 mt-5">
        {userBaseComponent}
      </div>

      <div className="mb-2 ml-7 col-span-6 mt-5">
        <ReservationInfo />
        {userPrivateComponent}
      </div>
    </div>
  );
}

function GuestInfo() {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState([]);


  const getUserInfo = async () => {
    const json = await (
      await fetch(
        `${process.env.REACT_APP_FRONTEND_URL}/user/evan1`
      )
    ).json();

    setLoading(false)
    setUserInfo(json)
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  Login("evan1", "5s34S2349!#")

  return (
    <div>
      {loading ? (<div>' '</div>) :
        (
          <div>
            <User user={userInfo} />
          </div>)
      };
    </div>
  );
}

export default GuestInfo;