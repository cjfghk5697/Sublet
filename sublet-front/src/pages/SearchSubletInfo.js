import React from "react";
import Header from '../components/Header';
import Map from '../components/Map';

function SubletInfo(props) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex space-x-4">
        <img
          alt="Room"
          className="h-20 w-20 rounded-lg"
          height="80"
          src="/placeholder.svg"
          style={{
            aspectRatio: "80/80",
            objectFit: "cover",
          }}
          width="80"
        />
        <div className="flex flex-col justify-between">
          <h2 className="text-lg font-semibold">강남에 직장이 있는 분을 위한 맞춤형 숙소</h2>
          <p className="text-sm">경기도 하남시 위례동</p>
          <p className="text-sm">8월 30일 부터, 최소 1개월</p>
          <p className="text-lg font-bold text-[#bd1e59] text-right">₩730,000/1개월</p>
        </div>
      </div>
    </div>
  )
}

export default function SearchSubletInfo(props) {
  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto p-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <div className="flex flex-col space-y-4">
              <SubletInfo />
              <SubletInfo />
              <SubletInfo />
            </div>
          </div>
          <div className="col-span-1">
            <Map location="광진구" />
          </div>
        </div>
      </div>
    </>
  );
}

