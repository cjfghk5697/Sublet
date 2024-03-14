import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { priceToString } from './StaticComponents.js';
import * as s from '../components/styles/Public.styles.js';

const RoomProfile = ({ room, toggleLikes, likes, setLikes }) => {
	const navigate = useNavigate();

	const styles = {
		container: {
			display: 'flex',
			flexDirection: 'column',
			margin: '1em',
		}
	};

	const moveToRoomInfo = ({ room }) => {
		// 일단 방 정보 넘김과 동시에 방 정보 페이지로 이동.
		navigate(`/roominfo/${room.key}`, {
			room: room,
		});
	};

	if (!room) return <div></div>;
	return (
    <>
  <IconButton onClick={() => moveToRoomInfo({ room })}>
				<s.Image
					src={
						process.env.REACT_APP_BACKEND_URL +
						'/public/' +
						room.image_id[0] +
						'.jpg'
					}
					alt="Room image"
				/>
			</IconButton>
			<div style={styles.roomTitleAndLike}>
				<s.Span onClick={() => moveToRoomInfo({ room })}>
					<s.SecondHead>
						{room.city} {room.gu} {room.dong}
					</s.SecondHead>
					<s.NormalText>₩{priceToString(room.price * 30)}/1개월</s.NormalText>
				</s.Span>
				<IconButton onClick={toggleLikes(room, likes, setLikes)}>
					{likes[room.key] !== undefined ? <Favorite /> : <FavoriteBorder />}
				</IconButton>
			</div>
      </>
      	);
};

export default RoomProfile;
