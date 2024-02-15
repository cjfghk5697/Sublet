import React, { useState, useRef } from "react";
import BarChartIcon from "@mui/icons-material/BarChart";
import { BarChart } from "@mui/x-charts";
import { Slider } from "@mui/material";
import { priceToString } from "../StaticComponents.js";
import { useSearchPriceStore } from "../store/priceRangeStore.js";
import * as s from "../styles/Header.styles.js";

const SearchPriceRange = () => {
  const priceRangeMinMax = [0, 5000000]; // tempData
  const { priceRange, setPriceRange } = useSearchPriceStore();
  const [tempPriceRange, setTempPriceRange] = useState(priceRange); // 그래프 표현을 위한 이중화. 실제 값은 priceRange에 저장
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
    priceRangeGraphStyle: {
      position: "relative",
      width: "100%",
    },
    minPriceLineStyle: {
      position: "absolute",
      top: "20px",
      width: `${tempPriceRange[0]}%`,
      height: "9.75em",
      backgroundColor: "rgba(255, 255, 255, 0.75)",
    },
    maxPriceLineStyle: {
      position: "absolute",
      left: `${tempPriceRange[1]}%`,
      width: `${100 - tempPriceRange[1]}%`,
      top: "20px",
      height: "9.75em",
      backgroundColor: "rgba(255, 255, 255, 0.75)",
    },
  };

  const togglePriceFilter = () => {
    setIsListVisible(!isListVisible);
  };

  const valuetext = (value) => {
    return priceToString(value) >= 10000
      ? `${priceToString(value / 10000)}만`
      : `${value}`;
  };

  const handlePriceChange = (event, newValue) => {
    setTempPriceRange(newValue);
  };

  const handleSubmit = () => {
    setPriceRange(tempPriceRange[0], tempPriceRange[1]);
    setIsListVisible(false);
  };

  const handleCancel = () => {
    setTempPriceRange(priceRange);
    setIsListVisible(false);
  };

  const [sliderValue, setSliderValue] = useState(50);

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };

  // 선분의 위치를 계산하기 위한 스타일
  const lineStyle = {
    position: "absolute",
    left: `${sliderValue}%`,
    top: "20px",
    width: "2px",
    height: "50px",
    backgroundColor: "black",
  };

  return (
    <div>
      <button ref={buttonRef} onClick={togglePriceFilter}>
        <s.blackBoldFont>
          가격 범위
          <BarChartIcon />
        </s.blackBoldFont>
      </button>
      {isListVisible && (
        <div style={styles.priceRangeStyle}>
          <div style={styles.priceRangeGraphStyle}>
            <displayFilteringValueWhenModifyingFilter>
              <span>₩{priceToString(tempPriceRange[0])}</span>
              <span>~</span>
              <span>₩{priceToString(tempPriceRange[1])}</span>
            </displayFilteringValueWhenModifyingFilter>
            <Slider
              getAriaLabel={() => "price range"}
              value={tempPriceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              min={priceRangeMinMax[0]} // 검색 가능 최소 가격
              max={priceRangeMinMax[1]} // 검색 가능 최대 가격
            />
            <s.acceptOrCancleButton>
              <button onClick={handleSubmit}>적용</button>
              <button onClick={handleCancel}>취소</button>
            </s.acceptOrCancleButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPriceRange;

/* 가격 범위 그래프
<BarChart
  series={[{ data: [1, 2, 3, 2, 1] }]}
  xAxis={[{ scaleType: 'band', data: ['₩10,000~25,000', '₩25,000~40,000', '₩40,000~55,000', '₩55,000~70,000', '₩70,000~85,000'] }]}
  height={300}
  width={600}
  leftAxis={null}
/>
<div style={styles.lineStyle} />
<div style={styles.minPriceLineStyle} />
<div style={styles.maxPriceLineStyle} />
*/
