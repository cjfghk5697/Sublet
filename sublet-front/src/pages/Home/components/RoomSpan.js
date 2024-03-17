import * as s from '../components/styles/Public.styles.js';
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
    <s.Span onClick={() => moveToRoomInfo({ room })}>
      <s.SecondHead>
        {room.city} {room.gu} {room.dong}
      </s.SecondHead>
      <s.NormalText>₩{priceToString(room.price * 30)}/1개월</s.NormalText>
    </s.Span>
  );
};
