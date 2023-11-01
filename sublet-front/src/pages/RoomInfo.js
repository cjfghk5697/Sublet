import Header from '../components/Header';
import * as makeTest from '../testdata/testdata.js'
import PersonIcon from '@mui/icons-material/Person';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import HomeIcon from '@mui/icons-material/Home';
import BathtubIcon from '@mui/icons-material/Bathtub';
import React, { useState, useEffect } from 'react';

const roomTempData = makeTest.makeTestData(); // This is a temporary data for testing

export default function RoomInfo() {
  const nowRomeNum = 0; //추후 prop으로 받아오면 될듯
  //const API_KEY = process.env.REACT_APP_NAVERMAP_API_KEY;

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

  const [mapPoint, setMapPoint] = useState({ x: null, y: null });
  const [location, setLocation] = useState("");

  useEffect(() => {
    const mapDiv = document.getElementById("map");
    const map = new window.naver.maps.Map(mapDiv);

    //지도에서 위치 클릭하면 도로명 주소로 받아오는 것 test
    window.naver.maps.Event.addDOMListener(mapDiv, "click", () => {
      const coordinate = { x: map.data.map.center.x, y: map.data.map.center.y };
      setMapPoint({ x: coordinate.x, y: coordinate.y });
      window.naver.maps.Service.reverseGeocode(
        {
          coords: new window.naver.maps.LatLng(coordinate.y, coordinate.x),
          orders: [
            window.naver.maps.Service.OrderType.ADDR,
            window.naver.maps.Service.OrderType.ROAD_ADDR,
          ].join(","),
        },
        (status, response) => {
          if (status !== window.naver.maps.Service.Status.OK) {
            return alert("Something wrong!");
          }
          const result = response.v2;
          setLocation(result.address.jibunAddress);
          console.log(result);
        }
      );
    });
  }, []);


  return (
    <div>
      <Header />
      <div id="RomeInfo-ImgContainer" style={styles.RomeInfo_ImgContainer}>
        <img src={roomTempData[nowRomeNum].images[0]} alt="" style={styles.RomeInfo_ImgContainer_img} />
        <div id="RomeInfo-ImgContainer2" style={styles.RomeInfo_ImgContainer2}>
          <div id="RomeInfo-MiniImgContainer" style={styles.RomeInfo_MiniImgContainer}>
            <img src={roomTempData[nowRomeNum].images[1]} alt="" style={styles.RomeInfo_MiniImgContainer_img} />
            <img src={roomTempData[nowRomeNum].images[2]} alt="" style={styles.RomeInfo_MiniImgContainer_img} />
          </div>
          <div id="RomeInfo-MiniImgContainer" style={styles.RomeInfo_MiniImgContainer}>
            <img src={roomTempData[nowRomeNum].images[3]} alt="" style={styles.RomeInfo_MiniImgContainer_img} />
            <img src={roomTempData[nowRomeNum].images[4]} alt="" style={styles.RomeInfo_MiniImgContainer_img} />
          </div>
        </div>
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