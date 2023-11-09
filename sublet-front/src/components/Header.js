import BedroomChildIcon from '@mui/icons-material/BedroomChild'; // 로고 임시 대체
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
    marginBottom: '2em',
    width: '100%',
  },
  logo: {
    flex: 1,
  },
  logoIcon: {
    width: '2.5em',
    height: '2.5em',
  },
  searchBar: {
    flex: 3,
    width: 'auto',
    textAlign: 'center',
    fontSize: '1em',
  },
  profile: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  favorite: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: '1em',
  },
}

export default function Header() {
  return (
    <div style={styles.container}>
      <IconButton style={styles.logo}>
        <BedroomChildIcon style={styles.logoIcon} />
      </IconButton>
      <div style={styles.searchBar}>
        <SearchBar />
      </div>
      <div style={styles.profile}>
        <span>
          <IconButton style={styles.favorite}>
            <Favorite />
            {33 + 1}
          </IconButton>
        </span>
        <IconButton>
          <PersonIcon />
        </IconButton>
      </div>
    </div>
  );
}
