import './App.css';
import Home from './pages/Home';
import RoomInfo from './pages/RoomInfo';
import SearchSubletInfo from './pages/SearchSubletInfo';
import ReHome from './pages/ReHome';
import Booking from './pages/Booking';
import GuestInfo from './pages/GuestInfo.js';
import TestChat from './pages/test_chat/TestChat.js';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import CreateSubletInfo from './pages/Host/CreateSubletInfo.js';
import TestChatRoom from './pages/test_chat/TestChatRoom.js';
import TestDB from './pages/test_chat/TestDB.js';
import TestDBDetail from './pages/test_chat/TestDBDetail.js';
import GuestRequest from './pages/GuestRequest.js';
import HostInfo from './pages/HostInfo.js';
import SaveSublet from './pages/SaveSublet.js';
import ResetPassword from './pages/ResetPassword.js';
import Header from './components/Header.js';
import { MobileHeader } from './components/MobileHeader.js';
import { Desktop, Mobile } from './components/Responsive.js';

function App() {
  return (
    <BrowserRouter>
      <Desktop children={<Header />} />
      <Mobile children={<MobileHeader />} />
      <Routes>
        {/* 기본 페이지 */}
        <Route path="/" element={<Home />} />
        <Route path="/roominfo/:roomKey" element={<RoomInfo />} />
        <Route path="/SearchSubletInfo" element={<SearchSubletInfo />} />
        <Route path="/ReHome" element={<ReHome />} />
        <Route path="/Booking" element={<Booking />} />
        <Route path="/Profile/me" element={<GuestInfo />} />
        <Route path="/profile/:userId" element={<HostInfo />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/test/chat" element={<TestChat />} />
        <Route path="/test/chat/:chatId" element={<TestChatRoom />} />
        <Route path="/test/db/" element={<TestDB />} />
        <Route path="/test/db/:name" element={<TestDBDetail />} />
        <Route path="/SaveSublet" element={<SaveSublet />} />

        {/* <Route path='/Oauth/kakao' element={<KakaoConfirm />} /> */}

        <Route path="/Request" element={<GuestRequest />} />
        {/* test host page */}
        <Route path="/CreateSubletInfo" element={<CreateSubletInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
