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
import SearchDate from '../components/HeaderComponents/SearchDate.js';
import * as s from '../components/styles/SummaryBlock.styles.js'
import { Dialog, DialogContent } from '@mui/material';
import { ShareDialog } from '../components/Popup.js';
import { StyleComponent } from '../components/StaticComponents.js';


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
  const [sharePopUpState, setSharePopUpState] = useState(false)
  const { post, postExist, postAll } = SubletPostStore((state) => ({ post: state.post, postExist: state.postExist, postAll: state.postAll }));
  const { page, asyncGetPost, asyncGetPostAll } = SubletPostStore((state) => ({ page: state.page, asyncGetPost: state.asyncGetPost, asyncGetPostAll: state.asyncGetPostAll }));

  useEffect(() => {
    if (!postExist) {
      asyncGetPostAll();
    }
    setNowRoomPost({ ...postAll.find((post) => post.key == nowRoomNum) });
  }, [postExist]);

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
      {postExist && nowRoomPost &&
        <>
          <div>
            <s.black_upload_button onClick={() => { setSharePopUpState(true) }}>공유하기</s.black_upload_button>
            <Dialog open={sharePopUpState} className="border border-gray-300 shadow-xl rounded-lg">
              <DialogContent sx={{ height: 224 }} className='text-left'>
                <form className="flot-right">
                  <s.change_button type="button" name="sharePopUpState" onClick={() => { setSharePopUpState(false) }}>
                    <StyleComponent
                      content="CloseButton" />
                  </s.change_button>
                </form>

                <ShareDialog description={nowRoomPost.description} title={nowRoomPost.title} image_id={nowRoomPost.image_id} className="clear-both" />
              </DialogContent >
            </Dialog>
          </div>
          {console.log(nowRoomPost)}

          <section className="text-3xl font-bold mx-3 mt-1 mb-6">{nowRoomPost.title} {`(숙소번호 : ${nowRoomNum})`}</section>

          <section className="bg-white p-4 rounded-lg shadow-md mx-3 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-lg font-bold">30박</div>
                <div className="text-3xl font-bold mt-1">{(nowRoomPost.price * 30).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원~</div>
                <div className="text-sm font-bold mt-2">1박 당 {(nowRoomPost.price * 1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>
                <div className="flex flex-col text-sm text-gray-500 mt-3">{new Date(nowRoomPost.start_day).getMonth() + 1}월 {new Date(nowRoomPost.start_day).getDate()}일 부터, 최소 {nowRoomPost.min_duration}개월</div>
              </div>
            </div>
          </section>

          <section className='mx-3 mb-6'>
            <div className="text-xl font-bold">방 정보</div>
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

            <div className="text-sm font-bold">
              <p>{nowRoomPost.content}</p>
              <p>{nowRoomPost.description}</p>
            </div>
          </section>

          <section className='mx-3 mb-6'>
            <div className="text-xl font-bold">지도</div>
            <div className='h-1/6 overflow-hidden'>
              {postExist && <Map />}
            </div>
          </section>

          <section className="bg-white p-4 rounded-lg shadow-md mx-3 mb-6">
            <div className="text-xl font-bold">예약하기</div>
            <SearchDate />
            <div className="mt-4 mb-2 text-2xl font-bold">
              {`받아온 날짜 수 * 일간 가격`/* .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")*/} 원
              <span className="text-sm font-normal">/{`SearchDate에서 선택된 날짜 받아오기..`} 일</span>
            </div>
            <button className="w-full rounded-lg bg-gray-300 text-black p-1">예약하기</button>
            <div className="mt-2 mb-2 text-sm text-gray-600">예약 확정 전에 환불 규정을 확인 하셨나요?</div>
          </section>

          <section className="bg-white p-4 rounded-lg shadow-md mx-3 mb-6">
            <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md">
              <div className="flex-shrink-0">
                <img
                  alt="Profile"
                  className="h-32 w-32 rounded-full"
                  height="64"
                  src="/logo.png"
                  style={{
                    aspectRatio: "64/64",
                    objectFit: "cover",
                  }}
                  width="64"
                />
              </div>

              <section className="flex flex-col">
                <div className="bg-[#ffa500] text-white text-center rounded-md px-4 py-1 text-sm">호스트</div>
                <div className="bg-[#007bff] text-white text-center rounded-md px-4 py-1 text-sm">아주대</div>
                <div className="bg-[#6f42c1] text-white text-center rounded-md px-4 py-1 text-sm">삼성전자</div>
              </section>

              <div>
                <div className="text-2xl font-bold">호스트 이름</div>
                <div className="text-sm">호스트 소개</div>
                <div className="flex space-x-4 mt-1">
                  <span className="text-sm text-gray-700">후기 1,220개</span>
                  <span className="text-sm text-gray-700">경력 7년</span>
                </div>
              </div>
            </div>

            <button className="w-full rounded-lg bg-gray-300 text-black p-1">메세지 보내기</button>
          </section>


        </>
      }
    </div >
  );
}

