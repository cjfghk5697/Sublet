import {
  NormalText,
  SecondHead,
  Span,
} from '@components/styles/Public.styles.js';
import { priceToString } from '../../../components/StaticComponents.js';
import { useNavigate } from 'react-router-dom';

export const RoomSpan = ({ room }) => {
  const navigate = useNavigate();
  const moveToRoomInfo = ({ room }) => {
    // 일단 방 정보 넘김과 동시에 방 정보 페이지로 이동.
    navigate(`/roominfo/${room.key}`, {
      room: room,
    });
  };

  return (
    <Span onClick={() => moveToRoomInfo({ room })}>
      <SecondHead>
        {room.city} {room.gu} {room.dong}
      </SecondHead>
      <NormalText>₩{priceToString(room.price * 30)}/1개월</NormalText>
    </Span>
  );
};
