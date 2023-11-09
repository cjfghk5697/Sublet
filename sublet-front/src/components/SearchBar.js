import LocationOnIcon from '@mui/icons-material/LocationOn';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material'
import * as makeTest from '../testdata/testdata.js'

const recommendWordTempData = makeTest.makeTestRecommendSearch(); // This is a temporary data for testing

export default function SearchBar() {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
    searchBoxContainer: {
      display: 'flex',
      flexDirection: 'row',
      margin: '2em',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: '1px solid #000000',
      borderRadius: '5px',
      padding: '1em',
      fontSize: '1.3em',
    },
    searchByLocation: {
      fontWeight: 'bold',
    },
    serachByDate: {
      fontWeight: 'bold',
    },
    serachByPrice: {
      fontWeight: 'bold',
    },
    searchByKeyword: {
      fontWeight: 'bold',
    },
    searchKeywordInput: {
      width: '300px',
      height: '30px',
      border: '0px',
      fontSize: '1.2em',
      fontWeight: 'bold',
    },
    searchKeyworddescription: {
      fontSize: '0.6em',
      textAlign: 'left',
    },
    recommendSearchKeywordContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    recommendSearchKeyword: {
      border: '1px solid #000000',
      borderRadius: '5px',
      padding: '1em',
      fontSize: '1em',
    },
  }

  let recommendWords = recommendWordTempData.map((word) => {
    return (
      <div>
        {word.recommendWord}
      </div>
    )
  });

  return (
    <div style={styles.container}>
      <div style={styles.searchBoxContainer}>
        <IconButton style={styles.searchByLocation}>
          위치
          <LocationOnIcon />
        </IconButton>
        <IconButton style={styles.serachByDate}>
          날짜
          <DateRangeOutlinedIcon />
        </IconButton>
        <IconButton style={styles.serachByDate}>
          가격 범위
          <BarChartIcon />
        </IconButton>
        <div style={styles.serachByKeyword}>
          <input style={styles.searchKeywordInput} type="text" placeholder="필요한 숙소를 입력하세요" />
          <div style={styles.searchKeyworddescription}>
            원하는 것을 키워드로
          </div>
        </div>
        <IconButton>
          <SearchIcon />
        </IconButton>
      </div>
      <div style={styles.recommendSearchKeywordContainer}>
        {recommendWords}
      </div>
    </div>
  )
}
