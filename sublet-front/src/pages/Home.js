import RoomProfile from '../components/RoomProfile';
import Header from '../components/Header';
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

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
    requirementSubmitButtonAndCommunityFindButton: {
      display: 'flex',
      flexDirection: 'row',
      margin: '1rem 0 1rem 9.5rem',
    },
    requirementSubmitButton: {
      marginRight: '0.7em',
    },

  };

  let rooms = roomsData?.map((room) => {
    return <RoomProfile room={room} />;
  });

  const RequirementSubmitAndCommunityFind = () => {
    return (
      <div style={styles.requirementSubmitButtonAndCommunityFindButton}>
        <Link to={"/"} style={styles.requirementSubmitButton}>
          <Button variant="contained">
            요청서 제출하기
          </Button>
        </Link>
        <Link to={"/"} style={styles.communityFindButton}>
          <Button variant="contained">
            같은 커뮤니티 확인하기
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <RequirementSubmitAndCommunityFind />
      <div style={styles.mainContainer}>
        {
          roomsData?.length === 0 ?
            <h1>게시된 방이 없어요</h1>
            :
            <div style={styles.roomContainer}>
              {rooms}
            </div>
        }

      </div>
    </div>
  );
}