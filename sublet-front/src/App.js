import './App.css';
import Home from './pages/Home/Home.js';
import RoomInfo from './pages/RoomInfo';
import SearchSubletInfo from './pages/SearchSubletInfo';
<<<<<<< HEAD
=======
import Booking from './pages/Booking';
import GuestInfo from './pages/GuestInfo/GuestInfo.js';
>>>>>>> 11da444f69e79a7ed625dac81d78e694d86537fa
import TestChat from './pages/test_chat/TestChat.js';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import CreateSubletInfo from './pages/Host/CreateSubletInfo.js';
import TestChatRoom from './pages/test_chat/TestChatRoom.js';
import TestDB from './pages/test_chat/TestDB.js';
import TestDBDetail from './pages/test_chat/TestDBDetail.js';
import SaveSublet from './pages/SaveSublet/SaveSublet.js';
import Header from './@core/Header/Desktop/Header.js';
import { MobileHeader } from './@core/Header/Mobile/MobileHeader.js';
import { Desktop, Mobile } from './@core/Header/Responsive.js';
import ResetPassword from '@pages/ResetPassword/ResetPassword';
import HostInfo from '@pages/ExternalProfile/ExternalProfile';
import GuestRequest from '@pages/GuestRequest/GuestRequest';
import GuestInfo from '@pages/GuestInfo/GuestInfo';
import Booking from '@pages/Booking/Booking';

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
