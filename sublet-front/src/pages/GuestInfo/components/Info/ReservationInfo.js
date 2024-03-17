import { FetchReservation } from '@components/FetchList';
import { useState } from 'react';
import { ReservationSummaryBlock } from '../Blocks/SummaryBlock';
import { NormalText, SecondHead } from '@components/styles/Public.styles';

export function ReservationInfo() {
  const [reservationInfo, setReservationInfo] = useState([]);
  FetchReservation(setReservationInfo);
  return (
    <div className="mb-4">
      <SecondHead>예약 현황</SecondHead>
      {reservationInfo.length > 0 ? (
        reservationInfo.map(res => <ReservationSummaryBlock room={res} />)
      ) : (
        <NormalText>예약이 아직 없습니다.</NormalText>
      )}
    </div>
  );
}
