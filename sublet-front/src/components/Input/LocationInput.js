import React from "react";
import Map from '../Map.js';
import * as inputStyle from "../styles/Input.styles.js";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export const LocationInput = ({ pos, currentPos, setPos }) => {
  const styles = {
    searchByMap: {
      display: "relative",
    },
    mapMarker: {
      position: "absolute",
      zIndex: 100,
      top: "50%",
      left: "50%",
      color: "red",
      // fontSize: "2em",
      transform: "translate(-50%, -50%)", 
    },
  };

  return (
    <>
      <inputStyle.displayFilteringValueWhenModifyingFilter>
        <span>posx: {pos[0]}</span>
        <span>,</span>
        <span>posy: {pos[1]}</span>
      </inputStyle.displayFilteringValueWhenModifyingFilter>
      <div style={styles.searchByMap}>
        <LocationOnIcon style={styles.mapMarker} />
        <Map
          type="searchByMarker"
          currentPos={currentPos}
          setPos={setPos}
        />
      </div>
    </>
  );
};
