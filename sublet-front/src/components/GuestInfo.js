import SummaryBlock from "./SummaryBlock";
import { useEffect, useState } from "react";

function User({ user }) {
  const [loading, setLoading] = useState(true);
  const [reservationInfo, setReservationInfo] = useState([]);

  const getReservationInfo = async () => {
    const json = await (
      await fetch(
        `https://127.0.0.1:4000/reservation`
      )
    ).json();

    setLoading(false)
    setReservationInfo(json)
  };

  useEffect(() => {
    getReservationInfo();
  }, []);

  console.log('GuestInfo reservation Info', reservationInfo)
  return (
    <div style={{ fontFamily: "Pretendard" }} className="flex grid grid-cols-7">
      <div className="ml-3">
        <div>
          <img className="object-scale-down" src="https://i.stack.imgur.com/l60Hf.png"></img>
          {/*<img src="http://localhost:4000/user/evan1"></img>*/}
          <p className="text-2xl font-extrabold">{user.username}</p>
          <p className="text-base font-extrabold underline text-gray-400/200">{user.school}</p>
          {/*<p>{user.id_card ? '인증 완료' : '인증 안됨'}</p>*/}
        </div>
      </div>
      <div className="mb-2 ml-3 col-span-6">
        <h2 className="text-2xl font-extrabold">예약 현황</h2>
        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
        {loading ? ((
          <div>
            <p className="text-base font-extrabold">예약이 아직 없습니다.</p>
          </div>)
        ) : (<SummaryBlock
        // title={reservationInfo["Post"].title}
        //host={user.postuser.user_id}
        // start_day={reservationInfo.r_start_day}
        // end_day={reservationInfo.r_end_day}
        // pay={reservationInfo.Post.price}
        //host_image={user.postuser.user_image}
        // room_image={reservationInfo.post.image_id}
        />
        )
        }

        <div /*class="border-2 rounded-lg shadow-md"*/>
          <h2 className="text-2xl font-extrabold">사용자 정보</h2>
          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <p className="text-lg font-medium">이메일: {user.email}</p>
          <p className="text-lg font-medium">전화번호: {user.phone}</p>
        </div>
      </div>
    </div>
  );
}

export default User;