import * as RS from '@shared/components/styles/RoomInfo.styles.js';
import {
  PersonIcon,
  SingleBedIcon,
  HomeIcon,
  BathtubIcon,
} from '@mui/icons-material';

export function RoomDetail({ nowRoomPost }) {
  return (
    <RS.RoomInfoSection>
      <div className="text-xl font-bold">방 정보</div>
      <div className="flex w-80 mx-10 flex-wrap content-center flex-row justify-around">
        <div>
          <PersonIcon />
          최대 {nowRoomPost.limit_people} 인
        </div>
        <div>
          <SingleBedIcon />방 {nowRoomPost.number_room} 개
        </div>
        <div>
          <HomeIcon />
          침실 {nowRoomPost.number_bedroom} 개
        </div>
        <div>
          <BathtubIcon />
          화장실 {nowRoomPost.number_bathroom} 개
        </div>
      </div>

      <div className="text-sm font-bold">
        <p>{nowRoomPost.content}</p>
        <p>{nowRoomPost.description}</p>
      </div>
    </RS.RoomInfoSection>
  );
}