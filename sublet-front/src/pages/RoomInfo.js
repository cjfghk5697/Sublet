import Header from '../components/Header';
import * as makeTest from '../testdata/testdata.js'
import PersonIcon from '@mui/icons-material/Person';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import HomeIcon from '@mui/icons-material/Home';
import BathtubIcon from '@mui/icons-material/Bathtub';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { SubletPostStore } from "../store/SubletPostStore";
import { Carousel } from "@material-tailwind/react";
import Map from '../components/Map';


export default function RoomInfo() {
  const styles = {
    RomeInfo_ImgContainer: {
      display: 'inline-flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      height: '300px',
    },
    RomeInfo_MiniImgContainer: {
      display: 'flex',
      width: '50%',
      alignItems: 'center',
    },
    RomeInfo_ImgContainer2: {
      display: 'flex',
      flexDirection: 'column',
    },
    RomeInfo_ImgContainer_img: {
      objectFit: 'cover',
      height: '100%',
      borderRadius: '15px',
    },
    RomeInfo_MiniImgContainer_img: {
      height: '250px',
      borderRadius: '15px',
    },
    RomeInfo_detail: {
      display: 'flex',
      width: '80%',
      marginLeft: '10%',
      flexWrap: 'wrap',
      alignContent: 'center',
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
  };

  // 새 창에서 열린다면 props를 못 받아와서, zustand의 전역 저장소를 사용한다.
  const params = useParams();
  const nowRoomNum = params.roomKey;

  const [nowRoomPost, setNowRoomPost] = useState({});

  const { post, postExist, postAll } = SubletPostStore((state) => ({ post: state.post, postExist: state.postExist, postAll: state.postAll }));
  const { page, asyncGetPost, asyncGetPostAll } = SubletPostStore((state) => ({ page: state.page, asyncGetPost: state.asyncGetPost, asyncGetPostAll: state.asyncGetPostAll }));

  useEffect(() => {
    if (!postExist) {
      asyncGetPostAll();
    }
    setNowRoomPost({ nowRoomPost: postAll.find((post) => post.key == nowRoomNum) });
  }, []);

  return (
    <div>
      <Header />
      <div id="RomeInfo-ImgContainer" style={styles.RomeInfo_ImgContainer}>
        <Carousel className="rounded-xl text-center"
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                    }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}>
          {postExist && postAll.find((post) => post.key == nowRoomNum).image_id.map((image_id, index) => (
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/public/${image_id}.jpg`}
              alt={`image ${index}`}
              className="h-full object-cover m-auto"
            />
          ))}
        </Carousel>
      </div>
      <h3>방 정보</h3>
      <div id="RomeInfo-detail" style={styles.RomeInfo_detail}>
        <div>
          <PersonIcon />
          최대 {nowRoomPost.limit_people} 인
        </div>
        <div>
          <SingleBedIcon />
          방 {nowRoomPost.number_room} 개
        </div>
        <div>
          <HomeIcon />
          침실 {nowRoomPost.number_bedroom} 개
        </div>
        <div>
          <BathtubIcon />
          화장실 {nowRoomPost.number_bathroom} 개
        </div>
      </div>
      <div>
        <h3>지도</h3>
        {postExist && <Map />}
      </div>
    </div >
  );
}

