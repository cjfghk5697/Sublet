import React, { useEffect } from "react";


export default function Temp_Login(props) {

  useEffect(() => {
    fetch('http://turtle-hwan.iptime.org:4000/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: "evan1",
        password: "5s34S2349!#"
      }),
      credentials: 'include',
    })

    // POST request using fetch inside useEffect React hook
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: "evan1",
        password: "5s34S2349!#"
      }),
      credentials: 'include',
    };
    fetch('http://turtle-hwan.iptime.org:4000/auth/login', requestOptions)
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  const getData = async () => {
    const response = await fetch('http://turtle-hwan.iptime.org:4000/post', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  }
  console.log(getData);

  return (
    <></>
  )
}