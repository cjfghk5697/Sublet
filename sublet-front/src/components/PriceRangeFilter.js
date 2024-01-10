import React, { useState, useRef } from 'react';
import BarChartIcon from '@mui/icons-material/BarChart';
import { BarChart } from '@mui/x-charts';
import { Slider } from '@mui/material';

const PriceRangeFilter = () => {
  const [price, setPrice] = useState([10000, 50000]);
  const [isListVisible, setIsListVisible] = useState(false);
  const buttonRef = useRef(null);

  const styles = {
    serachByPrice: {
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 1)',
    },
    pirceRangeStyle: {
      backgroundColor: 'white',
      border: '1px solid black',
      position: 'absolute',
      top: `${buttonRef.current ? buttonRef.current.offsetTop + buttonRef.current.offsetHeight : 0}px`,
      left: `${buttonRef.current ? buttonRef.current.offsetLeft : 0}px`,
      zIndex: 101
    },
  };

  const togglePriceFilter = () => {
    setIsListVisible(!isListVisible);
  };

  const valuetext = (value) => {
    return value >= 10000 ? `${value / 10000}만` : `${value}`;
  }

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };

  const handleSubmit = () => {
    // Implement the logic to filter the search results based on the price range
    console.log(price);
  };

  return (
    <div>
      <button ref={buttonRef} onClick={togglePriceFilter}>
        <div style={styles.serachByPrice}>
          가격 범위
          < BarChartIcon />
        </div>
      </button>
      {isListVisible && (
        <div style={styles.pirceRangeStyle}>
          <BarChart
            series={[{ data: [1, 2, 3, 2, 1] }]}
            xAxis={[{ scaleType: 'band', data: ['₩10,000~25,000', '₩25,000~40,000', '₩40,000~55,000', '₩55,000~70,000', '₩70,000~85,000'] }]}
            height={300}
            width={600}
            leftAxis={null}
          />
          <Slider
            getAriaLabel={() => 'price range'}
            value={price}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            min={5000} // 검색 가능 최소 가격
            max={90000} // 검색 가능 최대 가격
          />
          <button onClick={handleSubmit}>적용</button>
        </div>
      )}
    </div>
  );
};

export default PriceRangeFilter;


