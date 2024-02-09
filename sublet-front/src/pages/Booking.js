import { getDateDiff, priceToString } from "../components/StaticComponents";
import { bookingPopUpStore } from "../components/store/booking";
import * as w from "../components/styles/Wrapper.style";
import * as b from "../components/styles/Booking.styles"
import * as s from "../components/styles/SummaryBlock.styles";
import { FetchReservationPost } from "../components/FetchList";

export default function Booking(user_id) {
  const { temp_start_day, temp_end_day, day_pay, total_pay, post_key } = bookingPopUpStore((state) => ({
    temp_start_day: state.temp_start_day,
    temp_end_day: state.temp_end_day,
    day_pay: state.day_pay,
    total_pay: state.total_pay,
    post_key: state.post_key,
  }))
  const handlePostReservation = () => {
    const start_day = new Date(temp_start_day).toISOString()
    const end_day = new Date(temp_end_day).toISOString()
    FetchReservationPost(user_id, post_key, start_day, end_day, day_pay)
  }
  const total_day = getDateDiff(temp_start_day, temp_end_day)
  const month_pay = day_pay * 28
  return (
    <div className="ml-4 w-4/5">
      <div>
        <w.SecondHead>기간 / 금액</w.SecondHead>
        <w.Horizon />
        <p className="text-2xl font-bold">{temp_start_day} ~ {temp_end_day} ({total_day}일)</p>
        <div>
          {total_day >= 28 && (
            <div className="ml-2 mt-2">
              <b.justifyBlock className="font-semibold flex justify-between">
                <p className="text-l">매월 결제 금액</p>
                <p className="text-l mr-4">{priceToString(month_pay)} 원</p>
              </b.justifyBlock>

              <p className="ml-2 text-sm">* 28일이 넘는 경우에는 월마다 결제합니다.</p>
              <w.Horizon />

              <b.justifyBlock className="font-bold flex justify-between">
                <p className="text-xl mt-1">총 결제 금액 </p>
                <p className="text-xl text-[#2478F6]">{priceToString(total_pay)} 원</p>
              </b.justifyBlock>
            </div>
          )}
        </div>
      </div>
      <div>
        <w.SecondHead>결제 수단</w.SecondHead>
        <w.Horizon />
      </div>
      <div>
        <w.SecondHead>규칙 / 정책</w.SecondHead>
        <w.Horizon />
      </div>

      {/* 
결제수단 연결하기
*/}
      <s.black_upload_button onClick={handlePostReservation}>예약하기</s.black_upload_button>
      {post_key}
    </div >
  )
}