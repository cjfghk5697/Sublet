import React, { useState, useRef } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useSearchLocationStore } from "../../store/HeaderStore/searchLocationStore.js";
import * as s from "../styles/Header.styles.js";
import Map from '../Map.js';

const SearchLocation = (props) => {
  const { searchLocation, setSearchLocation } = useSearchLocationStore();
  const [tempPos, setTempPos] = useState(searchLocation); // 그래프 표현을 위한 이중화. 실제 값은 priceRange에 저장
  const [isListVisible, setIsListVisible] = useState(false);
  const buttonRef = useRef(null);

  const styles = {
    priceRangeStyle: {
      backgroundColor: "white",
      border: "1px solid black",
      position: "absolute",
      width: "20em",
      top: `${
        buttonRef.current
          ? buttonRef.current.offsetTop + buttonRef.current.offsetHeight
          : 0
      }px`,
      left: `${buttonRef.current ? buttonRef.current.offsetLeft : 0}px`,
      padding: "0 1em 0 1em",
      zIndex: 101,
      justifyContent: "center",
    },
    searchByMap: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    mapMarker: {
        position: "absolute",
        zIndex: 100,
        top: "50%",
        left: "50%",
        color: "red",
        // fontSize: "2em",
    },
  };

  const togglePosFilter = () => {
    setIsListVisible(!isListVisible);
  };

  const handleSubmit = () => {
    // setSearchLocation(tempPos[0], tempPos[1]);
    setSearchLocation(tempPos[0], tempPos[1]);
    setIsListVisible(false);
  };

  const handleCancel = () => {
    setTempPos(searchLocation);
    setIsListVisible(false);
  };

  return (
    <div>
      <button ref={buttonRef} onClick={togglePosFilter}>
        <s.blackBoldFont>
          위치
          <LocationOnIcon />
        </s.blackBoldFont>
      </button>
      {isListVisible && (
        <div style={styles.priceRangeStyle}>
          <s.displayFilteringValueWhenModifyingFilter>
            <span>posx: {tempPos[0]}</span>
            <span>,</span>
            <span>posy: {tempPos[1]}</span>
          </s.displayFilteringValueWhenModifyingFilter>
          <div style={styles.searchByMap}>
            <LocationOnIcon style={styles.mapMarker} />
            <Map type="searchByMarker" setPos={setTempPos}/>
          </div>
          <s.acceptOrCancleButton>
            <button onClick={handleSubmit}>적용</button>
            <button onClick={handleCancel}>취소</button>
          </s.acceptOrCancleButton>
        </div>
      )}
    </div>
  );
};

export default SearchLocation;
