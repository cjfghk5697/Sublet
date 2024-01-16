import React, { useState, useRef } from 'react';
import BarChartIcon from '@mui/icons-material/BarChart';
import { BarChart } from '@mui/x-charts';
import { Slider } from '@mui/material';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


const PriceRangeFilter = () => {
  const [price, setPrice] = useState([10000, 50000]);
  const [isListVisible, setIsListVisible] = useState(false);
  const buttonRef = useRef(null);
  const [itemNb, setItemNb] = React.useState(5);
  const [skipAnimation, setSkipAnimation] = React.useState(false);

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
          <Box sx={{ width: '100%' }}>
            <BarChart
              height={300}
              series={series
                .map((s) => ({ ...s, data: s.data.slice(price[0], price[1]) }))
              }
              skipAnimation={skipAnimation}
            />
            <FormControlLabel
              checked={skipAnimation}
              control={
                <Checkbox onChange={(event) => setSkipAnimation(event.target.checked)} />
              }
              label="skipAnimation"
              labelPlacement="end"
            />
            <Typography id="input-item-number" gutterBottom>
              Number of items
            </Typography>
            <Slider
              getAriaLabel={() => 'price range'}
              value={price}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              min={5000} // 검색 가능 최소 가격
              max={90000} // 검색 가능 최대 가격
            />
          </Box>
        </div>
      )}
    </div>
  );
};

const highlightScope = {
  highlighted: 'series',
  faded: 'global',
};

const series = [{ data: [1, 2, 3, 2, 1] }];

export default PriceRangeFilter;


/*
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

*/