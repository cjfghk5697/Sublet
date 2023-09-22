import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { IconButton } from '@mui/material'

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

export default function RoomProfile(props) {
  console.log(props.room);
  return (
    <div style={styles.container}>
      <img style={styles.roomImage} src={props.room.images[0]} />
      <div style={styles.roomTitleAndLike}>
          {props.room.title}
          <IconButton>
            {(props.room.roomLike !== undefined) ? <Favorite /> : <FavoriteBorder />} {props.room.likeCount}
          </IconButton>
      </div>
      {props.room.position}
    </div>
  );
}

// <IconButton onClick={toggleFavorite(room)}>