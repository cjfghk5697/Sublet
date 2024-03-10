import RoomProfile from '../components/RoomProfile';
import Header from '../components/Header';
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useTitle } from '../components/hook/HookCollect';
import { toggleLikes } from '../components/FetchList.js';

export default function Home() {

  const [roomsData, setRoomsData] = useState([]);
  const [preRoomsData, setPreRoomsData] = useState([]);
  const [likes, setLikes] = useState({});
  const [listRoomAmount, setListRoomAmount] = useState(6);
  const [listPageAmount, setListPageAmount] = useState(1);

  const fetchRoomsDefault = () => { // 6개 저 보여주기 필요할 수도..?
    fetch(process.env.REACT_APP_BACKEND_URL + "/post" + `?maxPost=${listRoomAmount}&page=${listPageAmount}`)
      .then((ele) => ele.json())
      .then((ele) => setPreRoomsData(ele));
    if (preRoomsData.length !== 0)
      setRoomsData([...roomsData, ...preRoomsData]);
    setListPageAmount(listPageAmount + 1);
  }
  useTitle("ItHome | 딱 맞는 숙소를 찾아봐요.")

  useEffect(() => {
    async function fetchData() {
      let res = await fetch(process.env.REACT_APP_BACKEND_URL + "/post" + `?maxPost=${listRoomAmount}&page=${listPageAmount}`);
      let data = await res.json();
      setRoomsData([...roomsData, ...data]);
      res = await fetch(process.env.REACT_APP_BACKEND_URL + "/post" + `?maxPost=${listRoomAmount}&page=${listPageAmount + 1}`);
      data = await res.json();
      setPreRoomsData(data);
      setListPageAmount(listPageAmount + 2);
    }
    fetchData();
  }, []);



  const styles = {
    container: {
      marginBottom: "10rem",
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
    topButtonsContainer: {
      display: 'flex',
      flexDirection: 'row',
      margin: '1rem 0 1rem 0rem',
      gap: '0.5rem',
    },
    topButtons: {
      backgroundColor: 'black',
      color: 'white',
    },
    requirementSubmitButton: {
      marginRight: '0.7em',
    },
    moreRoomDescription: {
      marginTop: '3rem',
    },
  };

  let rooms = roomsData?.map((room) => (
    <RoomProfile room={room} toggleLikes={toggleLikes} likes={likes} setLikes={setLikes} />
  ));

  const RequirementSubmitAndCommunityFind = () => {
    return (
      <div style={styles.topButtonsContainer}>
        <Button component={Link} to="/Request" style={styles.topButtons}>
          요청서 제출하기
        </Button>
        <Button component={Link} to="/" style={styles.topButtons}>
          같은 커뮤니티 확인하기
        </Button>
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
            <Button variant="contained" style={styles.requirementSubmitButton} onClick={fetchRoomsDefault}>
              방 더보기
            </Button>
            :
            <div style={styles.moreRoomDescription}>더 불러올 방이 없습니다.</div>
        }
      </div>
    </div>
  );
}
