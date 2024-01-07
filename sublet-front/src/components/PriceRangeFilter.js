import React, { useState, useRef } from 'react';
import BarChartIcon from '@mui/icons-material/BarChart';
import { BarChart } from '@mui/x-charts';
import { Slider } from '@mui/material';

const PriceRangeFilter = () => {
  const [price, setPrice] = useState([20, 37]);
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

  function valuetext(value) {
    return `${value}`;
  }

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };


  const handleSubmit = () => {
    // Implement the logic to filter the search results based on the price range
    console.log(`Filtering search results`);
  };

  const valueFormatter = (value) => `${value}mm`;

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
            xAxis={[{ scaleType: 'band', data: ['A', 'B', 'C', 'D', 'E'] }]}
            height={300}
            width={300}
            leftAxis={null}
          />
          <Slider
            getAriaLabel={() => 'price range'}
            value={price}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
          />
          <button onClick={handleSubmit}>Apply Filter</button>
        </div>
      )}
    </div>


  );
};

export default PriceRangeFilter;


