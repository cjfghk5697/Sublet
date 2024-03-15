import { DateFormat, priceToString } from '../StaticComponents';
import { ReservationSummaryBlock } from '../SummaryBlock';
import { FetchReservation, FetchReservationByPostKey } from '../FetchList';
import * as s from '../styles/Public.styles';
import { useState } from 'react';

function ReservationByPostKeyInfo({ post_key }) {
  const reservation = FetchReservationByPostKey(post_key);

  return (
    <div className="mb-4">
      <s.SecondHead>예약 현황</s.SecondHead>
      <s.Horizon />
      {reservation.length > 0 ? (
        reservation.map(res => {
          const startStr = DateFormat(res.r_start_day);
          const endStr = DateFormat(res.r_end_day);
          const pay = priceToString(res.pay);

          return (
            <>
              <s.DetailParagraph>게스트: {res.User.username}</s.DetailParagraph>
              <s.DetailParagraph>
                기간: {startStr} ~ {endStr}
              </s.DetailParagraph>
              <s.DetailParagraph>비용: {pay}</s.DetailParagraph>
              <s.Horizon />
            </>
          );
        })
      ) : (
        <s.NormalText>예약이 아직 없습니다.</s.NormalText>
      )}
    </div>
  );
}

function ReservationInfo() {
  const [reservationInfo, setReservationInfo] = useState([]);
  FetchReservation(setReservationInfo);
  return (
    <div className="mb-4">
      <s.SecondHead>예약 현황</s.SecondHead>
      {reservationInfo.length > 0 ? (
        reservationInfo.map(res => (
          <ReservationSummaryBlock
            room={res}
            title={res.Post.title}
            host={res.Post.postuser.user_id}
            start_day={res.r_start_day}
            end_day={res.r_end_day}
            pay={res.pay}
            key_num={res.key}
          />
        ))
      ) : (
        <s.NormalText>예약이 아직 없습니다.</s.NormalText>
      )}
    </div>
  );
}

export { ReservationInfo, ReservationByPostKeyInfo };
