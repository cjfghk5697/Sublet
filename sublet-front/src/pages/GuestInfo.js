import { useEffect, useState } from "react";
import User from "../components/GuestInfo";

function GuestInfo() {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState([]);

  const login = async () => {
    const requestOptions = {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      path: '/',
      body: JSON.stringify({
        id: "evan1",
        password: "5s34S2349!#"
      })
    };

    fetch(`${env.FRONTEND_URL}/auth/login`, requestOptions)
      .then(res => res.json())
      .then(response => {
        console.log('result login', response)
      })
      .catch((e) => {
        console.log('[error] login', e)
      })
  };
  useEffect(() => {
    login()
  }, []);


  const getUserInfo = async () => {
    const json = await (
      await fetch(
        `${env.FRONTEND_URL}/user/evan1`
      )
    ).json();

    setLoading(false)
    setUserInfo(json)
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      {loading ? (<div>' '</div>) :
        (
          <div>
            <User user={userInfo} />
          </div>)
      };
    </div>
  );
}

export default GuestInfo;