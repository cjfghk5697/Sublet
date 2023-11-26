import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "1em",
  },
  roomImage: {},
  roomTitleAndLike: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
};

export default function RoomProfile(props) {
  if (!props.room) return <div></div>;
  return (
    <div style={styles.container}>
      <img
        style={styles.roomImage}
        src={
          process.env.REACT_APP_BACKEND_URL +
          "/public/" +
          props.room.image_id[0] +
          ".jpg"
        }
        alt=""
      />
      <div style={styles.roomTitleAndLike}>
        {props.room.title}
        <IconButton>
          {props.room.roomLike !== undefined ? (
            <Favorite />
          ) : (
            <FavoriteBorder />
          )}{" "}
          {props.room.likeCount}
        </IconButton>
      </div>
      {props.room.description}
    </div>
  );
}

// <IconButton onClick={toggleFavorite(room)}>
