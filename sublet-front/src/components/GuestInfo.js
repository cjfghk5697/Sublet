import SummaryBlock from "./SummaryBlock";
import { useEffect, useState } from "react";

function User({ user }) {
  const [loading, setLoading] = useState(true);
  const [reservationInfo, setReservationInfo] = useState([]);

  const getReservationInfo = async () => {
    const requestOptions = {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    };

    const json = await (
      await fetch(
        `https://localhost:4000/reservation`
        , requestOptions)
    ).json();

    setLoading(false)
    setReservationInfo(json)
  };

  useEffect(() => {
    getReservationInfo();
  }, []);

  const reservation = Array.from(reservationInfo)
  const reservationComponent = (<div className="mb-4">
    <h2 className="text-2xl font-extrabold">예약 현황</h2>
    <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
    {loading ? ((
      <div>
        <p className="text-base font-extrabold">예약이 아직 없습니다.</p>
      </div>)
    ) : (reservation.map((res) =>
      <SummaryBlock
        title={res.Post.title}
        host={res.Post.postuser.user_id}
        start_day={res.r_start_day}
        end_day={res.r_end_day}
        pay={res.Post.price}
        // host_image={res.postuser.user_image}
        room_image={res.Post.image_id[0]}
      />

    ))
    }
  </div>
  )
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
      <p>{user.id_card ? '인증 완료✅' : '인증 안됨❌'}</p>
    </div>
  )
  return (
    <div style={{ fontFamily: "Pretendard" }} className="flex grid grid-cols-7">
      <div className="ml-3 mt-5">
        {userBaseComponent}
      </div>

      <div className="mb-2 ml-3 col-span-6 mt-5">
        {reservationComponent}


        <div>
          {userPrivateComponent}
        </div>
      </div>
    </div>
  );
}

export default User;