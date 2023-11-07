import LocationOnIcon from '@mui/icons-material/LocationOn';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material'

export default function SearchBar() {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      margin: '2em',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: '1px solid #000000',
      borderRadius: '5px',
      padding: '1em',
    },
    searchByLocation: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',

    },
    serachByDate: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    serachByPrice: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    searchByKeyword: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  }

  return (
    <div style={styles.container}>
      <div style={styles.searchByLocation}>
        <IconButton>
          위치
          <LocationOnIcon />
        </IconButton>
      </div>
      <div style={styles.serachByDate}>
        <IconButton>
          날짜
          <DateRangeOutlinedIcon />
        </IconButton>
      </div>
      <div style={styles.serachByPrice}>
        <IconButton>
          가격 범위
          <BarChartIcon />
        </IconButton>
      </div>
      <div style={styles.serachByKeyword}>
        <input type="text" placeholder="필요한 숙소를 입력하세요" />
        원하는 것을 키워드로
      </div>
      <IconButton>
        <SearchIcon />
      </IconButton>
    </div >
  )
}
