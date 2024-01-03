import { IsoTwoTone } from "@mui/icons-material";
import React, { useEffect } from "react";

export default function Map(props) {
  useEffect(() => {
    const mapDiv = document.getElementById("map");
    const map = new window.naver.maps.Map(mapDiv);
    
  })

  return (
    <div className="sticky top-5">
      <div id="map" className="h-[400px] w-full rounded-lg" />
    </div>
  )
}