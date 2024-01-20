import RoomProfile from '../components/RoomProfile';
import Header from '../components/Header';
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function Home() {
  const [roomsData, setRoomsData] = useState([]);
  const [preRoomsData, setPreRoomsData] = useState([]);
  const [likes, setLikes] = useState({}); // 백엔드 연결 필요.
  const [listRoomAmount, setListRoomAmount] = useState(6);
  const [listPageAmount, setListPageAmount] = useState(1);


  const fetchRooms = (listRoomAmount, listPageAmount) => { // 6개 저 보여주기 필요할 수도..?
    fetch(process.env.REACT_APP_BACKEND_URL + "/post" + `?maxPost=${listRoomAmount}&page=${listPageAmount}`)
      .then((ele) => ele.json())
      .then((ele) => setPreRoomsData(ele));
    if (preRoomsData.length !== 0)
      setRoomsData([...roomsData, ...preRoomsData]);
  }

  useEffect(() => {
    // fetchLikes();
    fetchRooms(listRoomAmount, listPageAmount);
  }, []);

  const toggleLikes = (item) => () => {
    console.log(likes)
    if (item.key in likes) { // likes.filter(likesItem => likesItem.key !== item.key)
      let newLikes = {}
      // console.log(likes)
      Object.keys(likes).map(newItem => {
        // console.log(item.key+"  "+newItem.toString())
        if (likes[newItem].key !== item.key) {
          newLikes = { ...newLikes, [newItem]: likes[newItem] }
        }
      })
      setLikes(newLikes)
      /*
      fetch(`http://REACT_APP_BACKEND_URL:8098/likes/${item.key}`, {
        method: 'DELETE',
      })
      */
    }
    else
      setLikes({ ...likes, [item.key]: item })
    /*
    let result = fetch(`http://localhost:8098/likes`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
    */
  }

  const test = () => {
    setListPageAmount(listPageAmount + 1);
    fetchRooms(listRoomAmount, listPageAmount);
  }

  const styles = {
    container: {
      marginBottom: "1rem",
    },
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
      margin: '1rem 0 1rem 0rem',
    },
    requirementSubmitButton: {
      marginRight: '0.7em',
    },
  };

  let rooms = roomsData?.map((room) => (
    <RoomProfile room={room} toggleLikes={toggleLikes} likes={likes} />
  ));

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
    <div style={styles.container}>
      <Header />
      <div style={styles.mainContainer}>
        <RequirementSubmitAndCommunityFind />
        <div style={styles.roomContainer}>
          {rooms}
        </div>
        {
          preRoomsData.length !== 0
            ?
            <Button variant="contained" style={styles.requirementSubmitButton} onClick={test}>
              방 더보기
            </Button>
            :
            <div>더 불러올 방이 없습니다..</div>
        }
      </div>
    </div>
  );
}
