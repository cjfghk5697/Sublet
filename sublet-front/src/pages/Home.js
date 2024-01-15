import RoomProfile from '../components/RoomProfile';
import Header from '../components/Header';
import React, { useEffect, useState } from "react";

export default function Home() {
  const [roomsData, setData] = useState(null);
  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL + "/post")
      .then((ele) => ele.json())
      .then((ele) => setData(ele));
  }, []);

  console.log(roomsData);

  const styles = {
    mainContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "auto",
    },
    roomContainer: {
      display: "grid",
      gridTemplateRows: "1fr ",
      gridTemplateColumns: "1fr 1fr 1fr",
      fontSize: '1em',
    },
  };

  let rooms = roomsData?.map((room) => {
    return <RoomProfile room={room} />;
  });

  return (
    <div>
      <Header />
      <div style={styles.mainContainer}>
        <div style={styles.roomContainer}>
          {rooms}
        </div>
      </div>
    </div>
  );
}