import { Favorite } from '@mui/icons-material'
import PersonIcon from '@mui/icons-material/Person';
import SearchBar from '../components/SearchBar';
import { IconButton } from '@mui/material';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '1px solid gray',
    marginBottom: '0.5em',
    width: '100%',
  },
  logo: {
    flex: 1,
  },
  logoIcon: {
    width: '4em',
    height: '4em',
    color: 'rgba(0, 0, 0, 1)',
  },
  searchBar: {
    flex: 3,
    width: 'auto',
    textAlign: 'center',
    fontSize: '1em',
  },
  rightNavigation: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  favorite: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: '1em',
    color: 'rgba(0, 0, 0, 1)',
  },
  favoriteCount: {
    fontSize: '0.8em',
  },
  profile: {
    color: 'rgba(0, 0, 0, 1)',
  },
}

export default function Header() {
  return (
    <div style={styles.container}>
      <IconButton style={styles.logo}>
        <img src="logo.png" style={styles.logoIcon} /> {/* 로고 임시 대체 */}
      </IconButton>
      <div style={styles.searchBar}>
        <SearchBar />
      </div>
      <div style={styles.rightNavigation}>
        <span>
          <IconButton style={styles.favorite}>
            <Favorite />
            <div style={styles.favoriteCount}>
              {33 + 1}
            </div>
          </IconButton>
        </span>
        <IconButton style={styles.profile}>
          <PersonIcon />
        </IconButton>
      </div>
    </div>
  );
}
