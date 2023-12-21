import * as React from "react";
import Header from '../components/Header';

export default function SaveSubletInfo(props) {
  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto p-5">

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="flex flex-col space-y-4">
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
                    <p className="text-sm">오전7시 하산 완료됨</p>
                    <p className="text-sm">8월 30일 부터, 최소 1개월</p>
                    <p className="text-lg font-bold text-[#bd1e59]">₩730,000/1개월</p>
                  </div>
                </div>
              </div>
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
                    <h2 className="text-lg font-semibold">저렴하게 지내실 수 있는 제주도 집</h2>
                    <p className="text-sm">오전7시 하산 완료됨</p>
                    <p className="text-sm">8월 30일 부터, 최소 1개월</p>
                    <p className="text-lg font-bold text-[#bd1e59]">₩330,000/1개월</p>
                  </div>
                </div>
              </div>
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
                    <h2 className="text-lg font-semibold">저렴하게 지내실 수 있는 제주도 집</h2>
                    <p className="text-sm">오전7시 하산 완료됨</p>
                    <p className="text-sm">8월 30일 부터, 최소 1개월</p>
                    <p className="text-lg font-bold text-[#bd1e59]">₩330,000/1개월</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="sticky top-5">
              <img
                alt="Map"
                className="h-[400px] w-full rounded-lg"
                height="400"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "300/400",
                  objectFit: "cover",
                }}
                width="300"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

