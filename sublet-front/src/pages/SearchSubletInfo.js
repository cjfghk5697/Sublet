import React, { useEffect, useState } from "react";
import Header from '../components/Header';
import Map from '../components/Map';


function SubletPost(props) {
  const [subletPost, setSubletPost] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL + "/post",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }
    ).then((ele) => ele.json())
      .then((ele) => setSubletPost(ele))
  }, []);

  return (subletPost);
}


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
          <h2 className="text-lg font-semibold">{props.title}</h2>
          <p className="text-sm">{
            (props.position !== undefined) ? props.position : props.city + " " + props.gu + " " + props.dong + " " + props.street
          }</p>
          <p className="text-sm">8월 30일 부터, 최소 1개월</p>
          <p className="text-lg font-bold text-[#bd1e59] text-right">₩{props.price}/1개월</p>
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
              {SubletPost().map((ele) => <SubletInfo
                key={ele.key}
                title={ele.title}
                position={ele.position}
                city={ele.city}
                gu={ele.gu}
                dong={ele.dong}
                street={ele.street}
                price={ele.price}
              />)
              }
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

