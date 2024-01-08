import SummaryBlock from "./SummaryBlock";

function User({ user }) {
  let reservation = false
  {/*  if (user.reservation.length > 0) {
    reservation = true
  }
*/}
  return (
    <div style={{ fontFamily: "Pretendard" }} className="flex grid grid-cols-4">
      <div class="ml-3">
        <div>
          {/*<img src="http://localhost:4000/user/evan1"></img>*/}
          <p className="text-2xl font-extrabold">{user.username}</p>
          <p className="text-base font-extrabold underline text-gray-400/200">{user.school}</p>
          {/*<p>{user.id_card ? '인증 완료' : '인증 안됨'}</p>*/}
        </div>
      </div>
      <div class="mb-2 ml-3 col-span-3">
        <h2 className="text-2xl font-extrabold">예약 현황</h2>
        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
        {reservation ? (<SummaryBlock
          title={user.title}
          //host={user.postuser.user_id}
          start_day={user.start_day}
          end_day={user.end_day}
          pay={user.pay}
        //host_image={user.postuser.user_image}
        //room_image={user.post.image_id}
        />
        ) :
          (
            <div>
              <p className="text-base font-extrabold">예약이 아직 없습니다.</p>
            </div>)
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