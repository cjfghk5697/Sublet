import RoomProfile from '../components/RoomProfile';
import Header from '../components/Header';
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function Home() {
  const [roomsData, setData] = useState(null);
  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL + "/post")
      .then((ele) => ele.json())
      .then((ele) => setData(ele));
  }, []);

  console.log(roomsData);

  const styles = {
    container: {
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
    <div style={styles.container}>
      {/* 임시 페이지들 링크*/}
      놀라지마세요! 테스트용 페이지들 링크에요.
      <Link to="/RoomInfo">RoomInfo</Link>
      <Link to="/SaveSubletInfo">SaveSubletInfo</Link>
      <Link to="/ReHome">ReHome</Link>
      <Link to="/Booking">Booking</Link>
      {/* 임시 페이지들 링크*/}
      <Header />
      <div style={styles.roomContainer}>
        {rooms}
      </div>
    </div>
  );
}