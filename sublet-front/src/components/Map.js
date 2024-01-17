import { IsoTwoTone } from "@mui/icons-material";
import React, { useEffect } from "react";
import { SubletPostStore } from "../store/SubletPostStore";

function searchAddressToCoordinate(address, map) {
  var infoWindow = new window.naver.maps.InfoWindow({
    anchorSkew: true
  });

  window.naver.maps.Service.geocode({
    query: address
  }, function (status, response) {
    if (status === window.naver.maps.Service.Status.ERROR) {
      return alert('Something Wrong!');
    }
    console.log(response.v2);
    if (response.v2.meta.totalCount === 0) {
      return alert('totalCount' + response.v2.meta.totalCount + '\n검색정보 없음');
    }

    var htmlAddresses = [],
      item = response.v2.addresses[0],
      point = new window.naver.maps.Point(item.x, item.y);



    if (item.roadAddress) {
      htmlAddresses.push('[도로명 주소] ' + item.roadAddress);
    }

    // if (item.jibunAddress) {
    //   htmlAddresses.push('[지번 주소] ' + item.jibunAddress);
    // }

    // if (item.englishAddress) {
    //   htmlAddresses.push('[영문명 주소] ' + item.englishAddress);
    // }

    infoWindow.setContent([
      '<div style="padding:10px;width:300px;line-height:150%;">',
      '<h4 style="margin-top:5px;">검색 주소 : ' + address + '</h4><br />',
      htmlAddresses.join('<br />'),
      '</div>'
    ].join('\n'));

    map.setCenter(point);
    infoWindow.open(map, point);
  });
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
  useEffect(() => {
    const mapDiv = document.getElementById("map");
    const map = new window.naver.maps.Map(mapDiv);
    map.setCursor("pointer");
    console.log(props.location);
    searchAddressToCoordinate(props.location, map);

  }, []);


  return (
    <div className="sticky top-5">
      <div id="map" className="h-[600px] w-full rounded-lg" />
    </div>
  )
}