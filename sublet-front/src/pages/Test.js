import { useState } from 'react'
import { Dialog, Popover } from '@headlessui/react'
import { IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import DaypickerComponent from '../components/DaypickerComponent.js';
import PriceRangeFilter from '../components/PriceRangeFilter.js';
import { Favorite } from '@mui/icons-material'
import PersonIcon from '@mui/icons-material/Person';

export default function Test() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const loginedTest = true;

  const styles = {
    container: {
      borderBottom: '1px solid gray',
      marginBottom: '0.5em',
    },
    headerContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    logoIcon: {
      width: '6em',
      height: '100%',
      color: 'rgba(0, 0, 0, 1)',
      justifyContent: 'right',
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
      border: '0px',
      fontWeight: 'bold',
    },
    searchKeyworddescription: {
      fontSize: '0.6em',
      textAlign: 'left',
    },
    searchIcon: {
      color: 'rgba(0, 0, 0, 1)',
    },
    rightNavigation: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'right',
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

  return (
    <header className="bg-white" style={styles.container}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global" style={styles.headerContainer}>
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-8" src="logo.png" style={styles.logoIcon} alt="logo" />
          </a>
        </div>
        <Popover.Group style={styles.searchBoxContainer} className="hidden lg:flex lg:gap-x-12"> {/* 검색창 */}
          <IconButton style={styles.searchByLocation} className="font-semibold leading-6 text-gray-900">
            위치
            <LocationOnIcon />
          </IconButton>
          <IconButton className="font-semibold leading-6 text-gray-900">
            <DaypickerComponent />
          </IconButton>
          <IconButton style={styles.serachByPrice} className="font-semibold leading-6 text-gray-900">
            <PriceRangeFilter />
          </IconButton>
          <div style={styles.serachByKeyword} className="font-semibold leading-6 text-gray-900">
            <input style={styles.searchKeywordInput} type="text" placeholder="필요한 숙소를 입력하세요" />
            <div style={styles.searchKeyworddescription}>
              원하는 것을 키워드로 검색
            </div>
          </div>
          <IconButton>
            <SearchIcon style={styles.searchIcon} />
          </IconButton>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {loginedTest ?
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
            :
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Log in
              <span aria-hidden="true">&rarr;</span></a>}

        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only" style={styles.logoIcon}>Your Company</span>
              <img className="h-8" src="logo.png" alt="logo" />
            </a>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"> Features </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}


/*
        모바일 용으로 쓸 만 할 듯.
        <div className="flex lg:hidden">
          <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(true)}>
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
*/

/* 추천 검색어 (보류)
import * as makeTest from '../testdata/testdata.js'
const recommendWordTempData = makeTest.makeTestRecommendSearch(); // This is a temporary data for testing

let recommendWords = recommendWordTempData.map((word) => {
  return (
    <IconButton style={styles.recommendSearchKeyword}>
      {word.recommendWord}
    </IconButton>
  )
});

<div style={styles.recommendSearchKeywordContainer}>
  {recommendWords}
</div>
*/