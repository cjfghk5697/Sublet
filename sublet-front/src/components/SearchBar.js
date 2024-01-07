import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material'
import * as makeTest from '../testdata/testdata.js'
import DaypickerComponent from './DaypickerComponent.js';
import PriceRangeFilter from './PriceRangeFilter.js';

const recommendWordTempData = makeTest.makeTestRecommendSearch(); // This is a temporary data for testing

export default function SearchBar() {
  const styles = {
    container: {
      display: 'flex',
      margin: '1em 3em 1em 3em',
      flexDirection: 'column',
    },
    searchBoxContainer: {
      display: 'flex',
      flexDirection: 'row',
      margin: '0 0 0.5em 0',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: '1px solid #000000',
      borderRadius: '5px',
      padding: '1em',
      fontSize: '1.3em',
    },
    searchByLocation: {
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 1)',
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
    searchIcon: {
      color: 'rgba(0, 0, 0, 1)',
    },
    recommendSearchKeywordContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    recommendSearchKeyword: {
      border: '0.3px solid #000000',
      borderRadius: '1em',
      padding: '0.5em 0.7em 0.5em 0.7em',
      fontSize: '0.8em',
      whiteSpace: 'nowrap',
      margin: '0em 0.5em 0 0.5em',
      color: 'rgba(0, 0, 0, 1)',
    },
  }
  
  let recommendWords = recommendWordTempData.map((word) => {
    return (
      <IconButton style={styles.recommendSearchKeyword}>
        {word.recommendWord}
      </IconButton>
    )
  });

  return ( // 위치 기반 검색 기능은 지환이 형 코드 완성되면 참고해서 추가
    <div style={styles.container}>
      <div style={styles.searchBoxContainer}>
        <IconButton style={styles.searchByLocation}>
          위치
          <LocationOnIcon />
        </IconButton>
        <IconButton>
          <DaypickerComponent />
        </IconButton>
        <IconButton style={styles.serachByPrice}>
          <PriceRangeFilter />
        </IconButton>
        <div style={styles.serachByKeyword}>
          <input style={styles.searchKeywordInput} type="text" placeholder="필요한 숙소를 입력하세요" />
          <div style={styles.searchKeyworddescription}>
            원하는 것을 키워드로 검색
          </div>
        </div>
        <IconButton>
          <SearchIcon style={styles.searchIcon} />
        </IconButton>
      </div>
      <div style={styles.recommendSearchKeywordContainer}>
        {recommendWords}
      </div>
    </div>
  )
}
