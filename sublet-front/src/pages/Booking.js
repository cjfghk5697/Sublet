import { getDateDiff, priceToString } from "../components/StaticComponents";
import { bookingPopUpStore } from "../components/store/booking";
import * as w from "../components/styles/Wrapper.style";
import * as s from "../components/styles/Booking.styles"
export default function Booking() {

  const { temp_start_day, temp_end_day, day_pay, total_pay, post_key } = bookingPopUpStore((state) => ({
    temp_start_day: state.temp_start_day,
    temp_end_day: state.temp_end_day,
    day_pay: state.day_pay,
    total_pay: state.total_pay,
    post_key: state.post_key,
  }))

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
              <s.justifyBlock className="font-semibold flex justify-between">
                <p className="text-l">매월 결제 금액</p>
                <p className="text-l mr-4">{priceToString(month_pay)} 원</p>
              </s.justifyBlock>

              <p className="ml-2 text-sm">* 28일이 넘는 경우에는 월마다 결제합니다.</p>
              <w.Horizon />

              <s.justifyBlock className="font-bold flex justify-between">
                <p className="text-xl mt-1">총 결제 금액 </p>
                <p className="text-xl text-[#2478F6]">{priceToString(total_pay)} 원</p>
              </s.justifyBlock>
            </div>
          )}
        </div>
      </div>
      <div>
        <w.SecondHead>결제 수단</w.SecondHead>
        <w.Horizon />
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="29" viewBox="0 0 25 29" fill="none">
        <path d="M5.625 13.125H8.375V15.875H5.625V13.125ZM24.875 6.25V25.5C24.875 27.0125 23.6375 28.25 22.125 28.25H2.875C1.34875 28.25 0.125 27.0125 0.125 25.5L0.13875 6.25C0.13875 4.7375 1.34875 3.5 2.875 3.5H4.25V0.75H7V3.5H18V0.75H20.75V3.5H22.125C23.6375 3.5 24.875 4.7375 24.875 6.25ZM2.875 9H22.125V6.25H2.875V9ZM22.125 25.5V11.75H2.875V25.5H22.125ZM16.625 15.875H19.375V13.125H16.625V15.875ZM11.125 15.875H13.875V13.125H11.125V15.875Z" fill="#616161" />
      </svg>
      <div>
        <w.SecondHead>규칙 / 정책</w.SecondHead>
        <w.Horizon />
      </div>
      {post_key}
    </div >
  )
}