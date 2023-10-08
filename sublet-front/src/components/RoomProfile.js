import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import useStore from './RoomStore.js'

export default function RoomProfile(props) {
  const {likes, setLikes, removeLikes} = useStore();

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      margin: '1em',
    },
    roomImage: {
  
    },
    roomTitleAndLike: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    }
  }
  return (
    <div style={styles.container}>
      <img style={styles.roomImage} src={props.room.images[0]} />
      <div style={styles.roomTitleAndLike}>
          {props.room.title}
          <IconButton onClick={}>
            {(props.room.roomLike !== undefined) ? <Favorite /> : <FavoriteBorder />} {props.room.likeCount}
          </IconButton>
      </div>
      {props.room.position}
    </div>
  );
}
