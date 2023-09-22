import RoomProfile from '../components/RoomProfile';
import Header from '../components/Header';
import React, { useState } from 'react'

///* test data
const roomTempData = [ // This is a temporary data structure for testing purposes
  {
    id: "650728e80ef0723c4dad666c",
    key: 0,
    basic_info: "기본 정보",
    benefit: "혜택",
    description: "상세설명",
    end_day: "2023-09-18T00:00:00.000Z",
    extra_info: "혹시 모를 하고 싶은 말 등등등",
    images: [
            "testImages/room1.png",
            "image2",
            "image3",
            "image4",
            "image5"
    ],
    max_duration: "5M",
    min_duration: "3M",
    position: "숙소위치",
    refund_policy: "환불정책 1, 2, 3 등등등",
    rule: "규칙",
    start_day: "2023-09-18T00:00:00.000Z",
    title: "제목1",
    like: true,
    likeCount: 55
  },
  {
    id: "650728e80ef0723c4dad666c",
    key: 0,
    basic_info: "기본 정보",
    benefit: "혜택",
    description: "상세설명",
    end_day: "2023-09-18T00:00:00.000Z",
    extra_info: "혹시 모를 하고 싶은 말 등등등",
    images: [
            "./testImages/room2.png",
            "image2",
            "image3",
            "image4",
            "image5"
    ],
    max_duration: "5M",
    min_duration: "3M",
    position: "숙소위치",
    refund_policy: "환불정책 1, 2, 3 등등등",
    rule: "규칙",
    start_day: "2023-09-18T00:00:00.000Z",
    title: "제목2",
    like: false,
    likeCount: 55
  },
  {
    id: "650728e80ef0723c4dad666c",
    key: 0,
    basic_info: "기본 정보",
    benefit: "혜택",
    description: "상세설명",
    end_day: "2023-09-18T00:00:00.000Z",
    extra_info: "혹시 모를 하고 싶은 말 등등등",
    images: [
            "./testImages/room3.png",
            "image2",
            "image3",
            "image4",
            "image5"
    ],
    max_duration: "5M",
    min_duration: "3M",
    position: "숙소위치",
    refund_policy: "환불정책 1, 2, 3 등등등",
    rule: "규칙",
    start_day: "2023-09-18T00:00:00.000Z",
    title: "제목3",
    like: false,
    likeCount: 55
  },
  {
    id: "650728e80ef0723c4dad666c",
    key: 0,
    basic_info: "기본 정보",
    benefit: "혜택",
    description: "상세설명",
    end_day: "2023-09-18T00:00:00.000Z",
    extra_info: "혹시 모를 하고 싶은 말 등등등",
    images: [
            "./testImages/room4.png",
            "image2",
            "image3",
            "image4",
            "image5"
    ],
    max_duration: "5M",
    min_duration: "3M",
    position: "숙소위치",
    refund_policy: "환불정책 1, 2, 3 등등등",
    rule: "규칙",
    start_day: "2023-09-18T00:00:00.000Z",
    title: "제목4",
    like: true,
    likeCount: 55
  },
  {
    id: "650728e80ef0723c4dad666c",
    key: 0,
    basic_info: "기본 정보",
    benefit: "혜택",
    description: "상세설명",
    end_day: "2023-09-18T00:00:00.000Z",
    extra_info: "혹시 모를 하고 싶은 말 등등등",
    images: [
            "./testImages/room4.png",
            "image2",
            "image3",
            "image4",
            "image5"
    ],
    max_duration: "5M",
    min_duration: "3M",
    position: "숙소위치",
    refund_policy: "환불정책 1, 2, 3 등등등",
    rule: "규칙",
    start_day: "2023-09-18T00:00:00.000Z",
    title: "제목5",
    like: true,
    likeCount: 55
  },
  {
    id: "650728e80ef0723c4dad666c",
    key: 0,
    basic_info: "기본 정보",
    benefit: "혜택",
    description: "상세설명",
    end_day: "2023-09-18T00:00:00.000Z",
    extra_info: "혹시 모를 하고 싶은 말 등등등",
    images: [
            "./testImages/room1.png",
            "image2",
            "image3",
            "image4",
            "image5"
    ],
    max_duration: "5M",
    min_duration: "3M",
    position: "숙소위치",
    refund_policy: "환불정책 1, 2, 3 등등등",
    rule: "규칙",
    start_day: "2023-09-18T00:00:00.000Z",
    title: "제목6",
    like: true,
    likeCount: 55
  },

]
//*/ test data

export default function Home() {
  const [likes, setLikes] = useState({})

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
    roomContainer: {
      display: "grid",
      gridTemplateRows: "1fr ",
      gridTemplateColumns: "1fr 1fr 1fr",
    },
  };

  /*
  const toggleFavorite = (room) => () => {   
    if(room.id in likes){
        let newLikes = {}
        Object.keys(likes).map(newRoom => {
            if(likes[newRoom].id !== room.id){
                newLikes = {...newLikes, [newRoom] : likes[newRoom]}
            }
        })
        setLikes(newLikes);
    }
    else{
        setLikes({ ...likes, [room.id]: room });
    }
  }
  */

  let rooms = roomTempData.map( (room) => {
    return (
      <RoomProfile
        room={room}
      />
      // toggleFavorite={toggleFavorite}
    )
  });

  return (
    <div style={styles.container}>
        <Header />
      <div style={styles.roomContainer}>
        {rooms}
      </div>
    </div>
  );
}
