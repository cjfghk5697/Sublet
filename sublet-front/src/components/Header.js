import BedroomChildIcon from '@mui/icons-material/BedroomChild'; // 로고 임시 대체
import { Favorite } from '@mui/icons-material'
import PersonIcon from '@mui/icons-material/Person';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '1px solid gray',
    marginBottom: '2em',
    width: '100%',
  },
  logo: {
    flex: 1,
    width: '2em',
    height: '2em',
    marginRight: '1em',
  },
  searchbar: {
    flex: 3,
    width: 'auto',
    textAlign: 'center',
  },
  profile: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  favorite: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}

export default function Header() {
  return (
    <div style={styles.container}>
      <BedroomChildIcon style={styles.logo}/>
      <div style={styles.searchbar}>
        <h1>검색창</h1>
        추천 검색어
      </div>
      <div style={styles.profile}>
        <span style={styles.favorite}>
          <Favorite />
          {33+1}
        </span>
        <PersonIcon />
      </div>
    </div>
  );
}
