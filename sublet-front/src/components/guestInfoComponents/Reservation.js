import { DateFormat, priceToString } from "../StaticComponents";
import { ReservationSummaryBlock } from "../SummaryBlock";
import { FetchReservation, FetchReservationByPostKey } from "../FetchList";
import * as w from "../styles/Wrapper.style";
import * as s from "../styles/SummaryBlock.styles";

function ReservationByPostKeyInfo({ post_key }) {
  const reservation = FetchReservationByPostKey(post_key)

  return (
    <div className="mb-4">
      <w.SecondHead>예약 현황</w.SecondHead>
      <w.Horizon />
      {reservation.length > 0 ? (reservation.map((res) => {
        const startStr = DateFormat(res.r_start_day)
        const endStr = DateFormat(res.r_end_day)
        const pay = priceToString(res.pay)

        return (
          <>
            <w.DetailParagraph>게스트: {res.User.username}</w.DetailParagraph>
            <w.DetailParagraph>기간: {startStr} ~ {endStr}</w.DetailParagraph>
            <w.DetailParagraph>비용: {pay}</w.DetailParagraph>
            <w.Horizon />
          </>
        )

      }
      )) : (<s.p_normal>예약이 아직 없습니다.</s.p_normal>)
      }
    </div>
  )
};

function ReservationInfo() {
  const reservation = FetchReservation()
  return (
    <div className="mb-4">
      <w.SecondHead>예약 현황</w.SecondHead>
      {reservation.length > 0 ? reservation.map((res) => (
        <ReservationSummaryBlock
          title={res.Post.title}
          host={res.Post.postuser.user_id}
          start_day={res.r_start_day}
          end_day={res.r_end_day}
          pay={res.pay}
          key_num={res.key}
          room_image={res.Post.image_id[0]}
        />
      )
      ) : <s.p_normal>예약이 아직 없습니다.</s.p_normal>
      }
    </div>
  )

};

export { ReservationInfo, ReservationByPostKeyInfo };