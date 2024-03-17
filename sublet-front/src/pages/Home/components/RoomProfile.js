import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { toggleLikes } from '../../../components/FetchList.js';
import * as s from '../../../components/styles/Public.styles.js';
import { RoomSpan } from './RoomSpan.js';

export const RoomProfile = ({ room, likes, setLikes }) => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      margin: '1em',
    },
    roomTitleAndLike: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  };

  if (!room) return <div></div>;
  return (
    <>
      <IconButton onClick={() => moveToRoomInfo({ room })}>
        <s.Image
          src={`${process.env.REACT_APP_BACKEND_URL}/public/${room.image_id[0]}.jpg`}
          alt="Room image"
        />
      </IconButton>
      <div style={styles.roomTitleAndLike}>
        <RoomSpan room={room} />
        <IconButton onClick={toggleLikes(room, likes, setLikes)}>
          {likes[room.key] !== undefined ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </div>
    </>
  );
};
