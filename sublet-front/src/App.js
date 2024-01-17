import './App.css';
import Home from './pages/Home';
import RoomInfo from './pages/RoomInfo';
import SaveSubletInfo from './pages/SaveSubletInfo';
import ReHome from './pages/ReHome';
import Booking from './pages/Booking';
import GuestInfo from './pages/GuestInfo.js'
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import * as makeTest from './testdata/testdata.js'
import Login from './components/Login.js';

function App() {
  const roomTempData = makeTest.makeTestData(); // This is a temporary data for testing

  return (
    <BrowserRouter>
      <Routes>
        {/* 기본 페이지 */}
        <Route path="/" element={<Home />} />
        <Route path="/roominfo" element={<RoomInfo />} />
        <Route path="/SaveSubletInfo" element={<SaveSubletInfo room={roomTempData[0]} />} />
        <Route path="/ReHome" element={<ReHome />} />
        <Route path="/Booking" element={<Booking />} />
        <Route path='/GuestInfo' element={<GuestInfo />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
