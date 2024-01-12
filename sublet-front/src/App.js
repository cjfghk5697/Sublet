import './App.css';
import Home from './pages/Home';
import RoomInfo from './pages/RoomInfo';
import SaveSubletInfo from './pages/SearchSubletInfo';
import ReHome from './pages/ReHome';
import Booking from './pages/Booking';
import Temp_Login from './pages/Temp_Login';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import * as makeTest from './testdata/testdata.js'

function App() {
  const roomTempData = makeTest.makeTestData(); // This is a temporary data for testing

  return (
    <BrowserRouter>
      <Routes>
        {/* 기본 페이지 */}
        <Route path="/" element={<Home />} />
        <Route path="/roominfo" element={<RoomInfo />} />
        <Route path="/SearchSubletInfo" element={<SaveSubletInfo room={roomTempData[0]} />} />
        <Route path="/ReHome" element={<ReHome />} />
        <Route path="/Booking" element={<Booking />} />
        <Route path="/Temp_Login" element={<Temp_Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
