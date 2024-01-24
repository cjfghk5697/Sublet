import { IsoTwoTone } from "@mui/icons-material";
import React, { useEffect, useRef } from "react";
import { SubletPostStore } from "../store/SubletPostStore";

function searchAddressToCoordinate(address, map) {
  let infoWindow = new window.naver.maps.InfoWindow({
    anchorSkew: true
  });

  let coordinate_item = undefined;

  window.naver.maps.Service.geocode({
    query: address
  }, function (status, response) {
    if (status === window.naver.maps.Service.Status.ERROR) {
      return console.log('status ERROR');
    }
    //console.log(response.v2);
    if (response.v2.meta.totalCount === 0) {
      return console.log('검색정보 없음');
    }

    let htmlAddresses = [],
      item = response.v2.addresses[0],
      point = new window.naver.maps.Point(item.x, item.y);

    coordinate_item = item;
    console.log(coordinate_item);

    if (item.roadAddress) {
      htmlAddresses.push('[도로명 주소] ' + item.roadAddress);
    }

    if (item.jibunAddress) {
      htmlAddresses.push('[지번 주소] ' + item.jibunAddress);
    }

    if (item.englishAddress) {
      htmlAddresses.push('[영문명 주소] ' + item.englishAddress);
    }

    infoWindow.setContent([
      '<div style="padding:10px;width:300px;line-height:150%;">',
      '<h4 style="margin-top:5px;">검색 주소 : ' + address + '</h4><br />',
      htmlAddresses[0],
      '</div>'
    ].join('\n'));

    map.setCenter(point);
    //infoWindow.open(map, point);
  });

  // 검색정보 있으면 좌표 반환
  return coordinate_item;
}

export default function Map(props) {
  const posts = SubletPostStore((state) => {
    if (state.postExist) {
      return state.post;
    } else {
      return [];
    }
  });
  console.log("from map, posts=", posts);


  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    mapRef.current = new window.naver.maps.Map(document.getElementById("map"));
    mapRef.current.setCursor("pointer");
    //console.log(props.location);
    //searchAddressToCoordinate(props.location, map);

  }, []);

  posts?.map((post) => {
    // let coordinate = searchAddressToCoordinate(post.position, mapRef.current);
    // if (coordinate === undefined)
    //   coordinate = searchAddressToCoordinate(post.city + " " + post.gu + " " + post.dong + " " + post.street, mapRef.current);
    // else if (coordinate === undefined)
    //   console.log("error: no coordinate");


    markerRef.current = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(post.y_coordinate, post.x_coordinate),
      map: mapRef.current
    })
  });


  useEffect(() => {
    function createMarker() {

    }
  }, []);

  return (
    // <div className="sticky top-5">
    <div id="map" className="h-full w-full rounded-lg" />
    // </div>
  )
}