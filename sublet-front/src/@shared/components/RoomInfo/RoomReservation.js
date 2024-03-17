import * as RS from '@shared/components/styles/RoomInfo.styles.js';
import * as s from '@shared/styles/styles.js';
import SearchDate from '@core/Header/Desktop/components/SearchDate.js';
<<<<<<< HEAD:sublet-front/src/@shared/components/RoomInfo/RoomReservation.jsx
import { getDateDiff } from '@components/StaticComponents';
=======
import { getDateDiff } from '@shared/components/StaticComponents/StaticComponents.js';
>>>>>>> 11da444f69e79a7ed625dac81d78e694d86537fa:sublet-front/src/@shared/components/RoomInfo/RoomReservation.js

export function RoomReservation({ nowRoomPost, moveToBooking }) {
  return (
    <RS.RoomInfoSection>
      <div className="text-xl font-bold">예약하기</div>
      <SearchDate />
      <div className="mt-4 mb-2 text-2xl font-bold">
        {`${(getDateDiff(searchDate[0], searchDate[1]) * nowRoomPost.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}{' '}
        원
        <span className="text-sm font-normal">
          {' '}
          / {getDateDiff(searchDate[0], searchDate[1])} 일
        </span>
      </div>
      <s.NormalButton onClick={moveToBooking}>예약하기</s.NormalButton>
      <div className="mt-2 mb-2 text-sm text-gray-600">
        예약 확정 전에 환불 규정을 확인 하셨나요?
      </div>
    </RS.RoomInfoSection>
  );
}
