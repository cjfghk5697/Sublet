import { useEffect, useState } from 'react'
// https://2mojurmoyang.tistory.com/193

export default function NaverLogin() {
  const { naver } = window;
  const [user, setUser] = useState(null);

  const naverLogin = new naver.LoginWithNaverId({
    clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
    callbackUrl: process.env.REACT_APP_NAVER_REDIRECT_URI,
    isPopup: true,
    loginButton: {
      color: "green",
      type: 3,
    },
  });

  const getUser = async () => {
    await naverLogin.getLoginStatus((status) => {
      console.log(`로그인?: ${status}`);
      if (status) {
        console.log('user', { ...naverLogin.user })
        setUser({ ...naverLogin.user });
        window.close();
      }
    });
  };

  useEffect(() => {
    naverLogin.init();
    console.log("init!");
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
          <h3>사용자 프로필사진</h3>
        </div>
      ) : (
        // 네이버 로그인 버튼
        <div>
          <div id="naverIdLogin"></div>
        </div>
      )}
    </div>)
}
