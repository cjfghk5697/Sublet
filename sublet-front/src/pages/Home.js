import RoomProfile from '../components/RoomProfile';
import Header from '../components/Header';
import React, { useEffect, useState } from "react";
import * as makeTest from '../testdata/testdata.js'
import { Link } from 'react-router-dom';

// import * as makeTest from "../testdata/testdata.js";

// const roomTempData = makeTest.makeTestData(); // This is a temporary data for testing

export default function Home() {
  const [roomTempData, setData] = useState(null);
  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL + "/post")
      .then((ele) => ele.json())
      .then((ele) => setData(ele));
  }, []);

  console.log(roomTempData);

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

  let rooms = roomTempData?.map((room) => {
    return <RoomProfile room={room} />;
  });

  return (
    <div style={styles.container}>
      {/* 임시 페이지들 링크*/}
      놀라지마세요! 임시 페이지들 링크에요.
      <Link to="/RoomInfo">RoomInfo</Link>
      <Link to="/SaveSubletInfo">SaveSubletInfo</Link>
      <Link to="/ReHome">ReHome</Link>
      <Link to="/Booking">Booking</Link>
      <Header />
      <div style={styles.roomContainer}>
        {rooms}
      </div>
    </div>
  );
}
