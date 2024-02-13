import Header from '../components/Header';
import * as makeTest from '../testdata/testdata.js'
import PersonIcon from '@mui/icons-material/Person';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import HomeIcon from '@mui/icons-material/Home';
import BathtubIcon from '@mui/icons-material/Bathtub';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { SubletPostStore } from "../store/SubletPostStore";


// 새 창에서 열린다면 props를 못 받아와서, zustand의 전역 저장소를 사용한다.
export default function RoomInfo() {
  const styles = {
    RomeInfo_ImgContainer: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      height: '500px',
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
      flexDirection: 'column',
      alignContent: 'center',
    },
  };

  const params = useParams();
  const nowRomeNum = params.roomKey;

  const { post, postExist, postAll } = SubletPostStore((state) => ({ post: state.post, postExist: state.postExist, postAll: state.postAll }));
  const { page, asyncGetPost, asyncGetPostAll } = SubletPostStore((state) => ({ page: state.page, asyncGetPost: state.asyncGetPost, asyncGetPostAll: state.asyncGetPostAll }));


  useEffect(() => {
    if (!postExist) {
      asyncGetPostAll();
    }
  }, []);

  const findPost_image_id = (id) => { return postAll.find((post) => post.key == nowRomeNum).image_id[id] }

  return (
    <div>
      <Header />
      <div id="RomeInfo-ImgContainer" style={styles.RomeInfo_ImgContainer}>
        {postExist && (
          <>
            <img src={`${process.env.REACT_APP_BACKEND_URL}/public/${findPost_image_id(0)}.jpg`} alt="" style={styles.RomeInfo_ImgContainer_img} />
            <div id="RomeInfo-ImgContainer2" style={styles.RomeInfo_ImgContainer2}>
              <div id="RomeInfo-MiniImgContainer" style={styles.RomeInfo_MiniImgContainer}>
                <img src={`${process.env.REACT_APP_BACKEND_URL}/public/${findPost_image_id(1)}.jpg`} alt="" style={styles.RomeInfo_MiniImgContainer_img} />
                <img src={`${process.env.REACT_APP_BACKEND_URL}/public/${findPost_image_id(2)}.jpg`} alt="" style={styles.RomeInfo_MiniImgContainer_img} />
              </div>
              <div id="RomeInfo-MiniImgContainer" style={styles.RomeInfo_MiniImgContainer}>
                <img src={`${process.env.REACT_APP_BACKEND_URL}/public/${findPost_image_id(3)}.jpg`} alt="" style={styles.RomeInfo_MiniImgContainer_img} />
                <img src={`${process.env.REACT_APP_BACKEND_URL}/public/${findPost_image_id(4)}.jpg`} alt="" style={styles.RomeInfo_MiniImgContainer_img} />
              </div>
            </div>
          </>
        )}
      </div>
      <div id="RomeInfo-detail" style={styles.RomeInfo_detail}>
        <PersonIcon />
        <SingleBedIcon />
        <HomeIcon />
        <BathtubIcon />
      </div>
      <div id="map" style={{ width: "400px", height: "400px" }} />
    </div >
  );
}

