import { useEffect, useState } from 'react';
<<<<<<< HEAD:sublet-front/src/components/loginComponents/Naver.js
import { FetchLogin } from '../FetchList';
import { useUserInfoStore } from '@core/store/UserInfoStore';
=======
import { FetchLogin } from '../FetchList/FetchList';
import { useUserInfoStore } from '../../store/UserInfoStore.js';
>>>>>>> 11da444f69e79a7ed625dac81d78e694d86537fa:sublet-front/src/@shared/components/loginComponents/Naver.js
// https://2mojurmoyang.tistory.com/193

export default function NaverLogin() {
  const { naver } = window;
  const [user, setUser] = useState(null);
  const { setUserInfo } = useUserInfoStore();

  const naverLogin = new naver.LoginWithNaverId({
    clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
    callbackUrl: process.env.REACT_APP_NAVER_REDIRECT_URI,
    isPopup: true,
    loginButton: {
      color: 'green',
      type: 3,
    },
  });

  const getUser = async () => {
    await naverLogin.getLoginStatus(status => {
      if (status) {
        console.log('user', { ...naverLogin.user }, naverLogin.user.email);
        setUser({ ...naverLogin.user });
        FetchLogin({
          id: naverLogin.user.email,
          password: 'naverLogin!2#1',
          setUserInfo,
        });
        // if (GetOneUser(naverLogin.user.email)) {
        //   FetchLogin(naverLogin.user.email, 'naverLogin!2#1')
        // } else {
        //   /*
        //     정보 가져올 부분
        //     user_id: email, name: name, username: nickname, gender: M, email: email, verifyemail: true, password
        //     추가 입력되어야함
        //     school, student_id, phone, birth
        //   */
        //   console.log('회원가입으로 넘어가기 구현안됨')
        // }
        window.close();
      }
    });
  };

  useEffect(() => {
    naverLogin.init();
    getUser();
  }, []);
  return (
    <div>
      {user ? (
        <div>
          <h2>네이버 로그인 성공!</h2>
          <h3>사용자 이름</h3>
          <div>{user.name}</div>
          <h3>사용자 이메일</h3>
          <div>{user.email}</div>
        </div>
      ) : (
        // 네이버 로그인 버튼
        <div>
          <div id="naverIdLogin"></div>
        </div>
      )}
    </div>
  );
}
