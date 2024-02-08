import { useEffect, useState } from "react";

function FetchPost() {
  const [loading, setLoading] = useState(true);
  const [postInfo, setPostInfo] = useState([]);
  const getPostInfo = async () => {
    const requestOptions = {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    };

    const json = await (
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/post`
        , requestOptions)
    ).json();

    setLoading(false)
    setPostInfo(json)
  };

  useEffect(() => {
    getPostInfo();
  }, []);

  const post = Array.from(postInfo)

  return [post, loading]
}

function FetchReservation() {
  const [loading, setLoading] = useState(true);
  const [reservationInfo, setReservationInfo] = useState([]);
  const getReservationInfo = async () => {
    const requestOptions = {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    };

    const json = await (
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/reservation`
        , requestOptions)
    ).json();

    setLoading(false)
    setReservationInfo(json)
  };

  useEffect(() => {
    getReservationInfo();
  }, []);

  const reservation = Array.from(reservationInfo)

  return [reservation, loading]
}

function FetchReservationByPostKey(post_key) {
  const [loading, setLoading] = useState(true);
  const [reservationInfo, setReservationInfo] = useState([]);
  const URL = `${process.env.REACT_APP_BACKEND_URL}/reservation/post?key=` + post_key

  const getPostInfo = async () => {
    const requestOptions = {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    const json = await (
      await fetch(
        URL, requestOptions)
    ).json();

    setLoading(false)
    setReservationInfo(json)
  };

  useEffect(() => {
    getPostInfo();
  }, []);

  const reservation = Array.from(reservationInfo)

  return [reservation, loading]
}

async function FetchDeleteReservation(key_num) {

  const requestOptions = {
    credentials: 'include',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      key: key_num
    })
  };

  await (
    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/reservation`
      , requestOptions)
  ).json();
};

function DeletePost(key) {
  const link = `${process.env.REACT_APP_BACKEND_URL}/post/${key}`
  const DeletePost = async () => {
    const requestOptions = {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      path: '/'
    };

    fetch(link, requestOptions)
      .then(res => res.json())
      .then(response => {
        console.log('result DeletePost', response)
      })
      .catch((e) => {
        console.log('[error] DeletePost', e)
      })
  };
  DeletePost()
}

function Login({ id, password }) {
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
  login()
}

function Logout() {
  const logout = async () => {
    const requestOptions = {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      path: '/',
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, requestOptions)
      .then(res => res.json())
      .then(response => {
        console.log('result logout', response)
      })
      .catch((e) => {
        console.log('[error] logout', e)
      })
  };
  logout()
}
async function FetchImage(formData) {
  const requestOptions = {
    credentials: 'include',
    method: 'PUT',
    body: formData
  };

  await (
    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/user/image`
      , requestOptions)
  ).json();
}


export { Login, Logout, FetchDeleteReservation, FetchReservation, FetchPost, FetchReservationByPostKey, DeletePost, FetchImage };