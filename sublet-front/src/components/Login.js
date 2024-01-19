import { useEffect } from "react";
export default function Login(id, password) {

  const login = async () => {
    const requestOptions = {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      path: '/',
      body: JSON.stringify({
        id: id,
        password: password
      })
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, requestOptions)
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
}