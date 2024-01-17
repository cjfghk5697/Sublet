import React, { useState } from 'react';
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const RoomProfile = ({ room, toggleFavorite, likes }) => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      margin: "1em",
    },
    roomTitleAndLike: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    roomTitle: {
      fontSize: "1.2em",
      fontWeight: "bold",
    },
    price: {
      fontSize: "1.2em",
    },
  };

  if (!room) return <div></div>;
  return (
    <div style={styles.container}>
      <img
        src={
          process.env.REACT_APP_BACKEND_URL +
          "/public/" +
          room.image_id[0] +
          ".jpg"
        }
        alt="Room image"
      />
      <div style={styles.roomTitleAndLike}>
        <span style={styles.roomTitle}>
          {room.city} {room.gu} {room.dong}
        </span>
        <IconButton onClick={toggleFavorite(room)}>
          {(likes[room.key] !== undefined) ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </div>
      <div style={styles.price}>
        ₩{room.price * 30}/1개월
      </div>
    </div>
  );
}

export default RoomProfile;
