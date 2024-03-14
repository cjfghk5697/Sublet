import { useEffect, useState } from 'react';
import { notFoundError, raiseError } from './StaticComponents';

const headerOptions = method => ({
  credentials: 'include',
  method: method,
  headers: {
    'Content-Type': 'application/json',
  },
});
const bodyData = data => ({
  data: JSON.stringify({
    data,
  }),
});

async function FetchChangeEmail(emailState) {
  const UpdateURL = `${process.env.REACT_APP_BACKEND_URL}/user/update`;
  const ChangeVerifyURL = `${process.env.REACT_APP_BACKEND_URL}/user/verifyupdate`;
  return await fetch(UpdateURL, {
    ...headerOptions('PUT'),
    ...bodyData({ email: emailState }),
  }).then(
    await fetch(ChangeVerifyURL, {
      ...headerOptions('PUT'),
      ...bodyData({ verify_email: 'false' }),
    }),
  );
}

async function FetchChangePhone(phoneState) {
  const UpdateURL = `${process.env.REACT_APP_BACKEND_URL}/user/update`;
  const ChangeVerifyURL = `${process.env.REACT_APP_BACKEND_URL}/user/verifyupdate`;
  return await fetch(UpdateURL, {
    ...headerOptions('PUT'),
    ...bodyData({ phone: phoneState }),
  }).then(
    await fetch(ChangeVerifyURL, {
      ...headerOptions('PUT'),
      ...bodyData({ verify_phone: 'false' }),
    }),
  );
}

async function FetchGetPost(userId) {
  const [postInfo, setPostInfo] = useState([]);
  const URL = `${process.env.REACT_APP_BACKEND_URL}/user/post/${userId}`;

  const getPostInfo = async () => {
    const json = await fetch(URL, headerOptions('GET'))
      .then(notFoundError)
      .catch(raiseError('FetchGetPost'));
    setPostInfo(json);
  };

  useEffect(() => {
    getPostInfo();
  }, []);

  const post = Array.from(postInfo);
  return post;
}

async function FetchUploadPost(formData) {
  const URL = `${process.env.REACT_APP_BACKEND_URL}/post`;
  await fetch(URL, {
    ...headerOptions('POST'),
    ...formData,
  })
    .then(notFoundError)
    .catch(raiseError('FetchUploadPost'));
}

async function FetchEditPost(postKey, formData) {
  const URL = `${process.env.REACT_APP_BACKEND_URL}/post/${postKey}`;
  await fetch(URL, {
    ...headerOptions('PUT'),
    ...formData,
  })
    .then(notFoundError)
    .catch(raiseError('FetchEditPost'));
}

async function FetchReservation() {
  const [reservationInfo, setReservationInfo] = useState([]);
  const getReservationInfo = async () => {
    const json = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/reservation`,
      headerOptions('GET'),
    )
      .then(notFoundError)
      .catch(raiseError('FetchReservation'));

    setReservationInfo(json);
  };

  useEffect(() => {
    getReservationInfo();
  }, []);

  const reservation = Array.from(reservationInfo);
  return reservation;
}

async function FetchReservationByPostKey(post_key) {
  const [reservationInfo, setReservationInfo] = useState([]);
  const URL =
    `${process.env.REACT_APP_BACKEND_URL}/reservation/post?key=` + post_key;

  const getPostInfo = async () => {
    const json = await fetch(URL, headerOptions('GET'))
      .then(notFoundError)
      .catch(raiseError('FetchReservationByPostKey'));
    setReservationInfo(json);
  };

  useEffect(() => {
    getPostInfo();
  }, []);

  const reservation = Array.from(reservationInfo);
  return reservation;
}

async function FetchDeleteReservation(keyNum) {
  fetch(`${process.env.REACT_APP_BACKEND_URL}/reservation`, {
    ...headerOptions('DELETE'),
    ...bodyData({ key: keyNum }),
  })
    .then(notFoundError)
    .catch(raiseError('FetchDeleteReservation'));
}

async function FetchReservationPost(userID, postKey, startDay, endDay, pay) {
  fetch(`${process.env.REACT_APP_BACKEND_URL}/reservation`, {
    ...headerOptions('POST'),
    ...bodyData({
      user_id: userID,
      post_key: postKey,
      r_start_day: startDay,
      r_end_day: endDay,
      pay: pay,
    }),
  })
    .then(notFoundError)
    .catch(raiseError('FetchReservationPost'));
}

async function FetchDeletePost(key) {
  const link = `${process.env.REACT_APP_BACKEND_URL}/post/${key}`;
  fetch(link, headerOptions('DELETE'))
    .then(notFoundError)
    .catch(raiseError('FetchDeletePost'));
}

async function FetchLogin({ id, password, setUserInfo }) {
  console.log(
    bodyData({
      id: id,
      password: password,
    }),
  );
  fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
    ...headerOptions('POST'),
    ...bodyData({
      id: id,
      password: password,
    }),
  })
    .then(notFoundError)
    .catch(raiseError('FetchLogin'));
}

async function FetchLogout() {
  await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/auth/logout`,
    headerOptions('POST'),
  )
    .then(notFoundError)
    .catch(raiseError('FetchLogout'));
}

async function FetchImage(formData) {
  return await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/image`, {
    ...headerOptions('PUT'),
    ...body(formData),
  });
}

async function FetchGetMyUser() {
  const [userInfo, setUserInfo] = useState();
  const URL = `${process.env.REACT_APP_BACKEND_URL}/user/profile`;

  const getUserInfo = async () => {
    const json = await fetch(URL, headerOptions('GET'))
      .then(notFoundError)
      .catch(raiseError('FetchGetMyUser'));
    setUserInfo(json);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return userInfo;
}

async function FetchGetOneUser(userId) {
  const [userInfo, setUserInfo] = useState();
  const URL = `${process.env.REACT_APP_BACKEND_URL}/user/${userId}`;

  const getUserInfo = async () => {
    const json = await fetch(URL, headerOptions('GET'))
      .then(notFoundError)
      .catch(raiseError('FetchGetOneUser'));
    setUserInfo(json);
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  return userInfo;
}

async function FetchGetRequest() {
  const [requestInfo, setRequestInfo] = useState([]);
  const URL = `${process.env.REACT_APP_BACKEND_URL}/request/`;

  const getRequestInfo = async () => {
    const json = await fetch(URL, headerOptions('GET'))
      .then(notFoundError)
      .catch(raiseError('FetchGetRequest'));
    setRequestInfo(json);
  };

  useEffect(() => {
    getRequestInfo();
  }, []);

  const request = Array.from(requestInfo);
  return request;
}

function FetchSignUp({
  userId,
  password,
  username,
  email,
  phone,
  school,
  gender,
  birth,
  studentId,
}) {
  const requestOptions = {
    ...headerOptions('POST'),
    ...bodyData({
      user_id: userId,
      password: password,
      username: username,
      email: email,
      phone: phone,
      school: school,
      gender: gender,
      birth: birth,
      student_id: studentId,
    }),
    path: '/',
  };

  fetch(`${process.env.REACT_APP_BACKEND_URL}/user/`, requestOptions)
    .then(notFoundError)
    .catch(raiseError('FetchSignUp'));
}

async function FetchGetRequestByRequestId(idList) {
  const [requestInfo, setRequestInfo] = useState([]);
  const URL = `${process.env.REACT_APP_BACKEND_URL}/request/requestId`;

  const getRequestInfo = async () => {
    const requestOptions = {
      ...headerOptions('POST'),
      ...bodyData({
        id: idList,
      }),
    };
    const json = await fetch(URL, requestOptions)
      .then(notFoundError)
      .catch(raiseError('FetchGetRequestByRequestId'));

    setRequestInfo(json);
  };

  useEffect(() => {
    getRequestInfo();
  }, []);

  const request = Array.from(requestInfo);
  return request;
}
async function FetchVerifyEmail(email) {
  const link = `${process.env.REACT_APP_BACKEND_URL}/user/email`;
  return await fetch(link, {
    ...headerOptions('POST'),
    ...bodyData({
      email: email,
    }),
  })
    .then(notFoundError)
    .catch(raiseError('VerifyEmail'));
}

async function FetchVerifyUser({ method, tokenKey, verifyToken }) {
  // 학교 인증은 우리가 확인(김과외처럼)
  const URL = `${process.env.REACT_APP_BACKEND_URL}/user/verifyUser`;
  const requestOptions = {
    ...headerOptions('POST'),
    ...bodyData({
      verify_email: method === 'email' ? 'true' : 'false',
      verify_phone: method === 'phone' ? 'true' : 'false',
      tokenKey: tokenKey,
      verifyToken: verifyToken,
    }),
  };

  return await fetch(URL, requestOptions);
}

async function FetchResetPassword(userId, tokenKey, verifyToken) {
  // 학교 인증은 우리가 확인(김과외처럼)
  const link = `${process.env.REACT_APP_BACKEND_URL}/user/resetpassword`;

  const requestOptions = {
    // sendEmail 라우터로 보내버리기
    ...headerOptions('POST'),
    ...bodyData({
      user_id: userId,
      tokenKey: tokenKey,
      verifyToken: verifyToken,
    }),
  };

  return await fetch(link, requestOptions);
}

async function FetchChangePassword(userId, newPassword) {
  // 학교 인증은 우리가 확인(김과외처럼)
  const link = `${process.env.REACT_APP_BACKEND_URL}/user/changepassword`;

  const requestOptions = {
    // sendEmail 라우터로 보내버리기
    ...headerOptions('PUT'),
    ...bodyData({
      id: userId,
      password: newPassword,
    }),
  };

  return await fetch(link, requestOptions);
}

async function FetchDeleteRequest(keyNum) {
  fetch(`${process.env.REACT_APP_BACKEND_URL}/request`, {
    ...headerOptions('DELETE'),
    ...bodyData({
      key: keyNum,
    }),
  });
}

function FetchConnectRequestPost(requestKey, postKey) {
  const URL = `${process.env.REACT_APP_BACKEND_URL}/request/post/${postKey}`;

  fetch(URL, {
    ...headerOptions('POST'),
    ...bodyData({
      key: requestKey,
    }),
  })
    .then(notFoundError)
    .catch(raiseError('ConnectRequestPost'));
}

async function FetchConverURLtoFile(id) {
  const URL = process.env.REACT_APP_BACKEND_URL + '/public/' + id + '.jpg';
  const response = await fetch(URL, headerOptions('GET'));
  const data = await response.blob();
  const ext = URL.split('.').pop(); // url 구조에 맞게 수정할 것
  const metadata = { type: `image/${ext}` };
  return new File([data], id + '.jpg', metadata);
}

const toggleLikes = (item, likes, setLikes) => () => {
  if (!(item.key in likes)) {
    setLikes({ ...likes, [item.key]: item });
    fetch(process.env.REACT_APP_BACKEND_URL + '/post/like', {
      ...headerOptions('POST'),
      ...bodyData({ post_key: item.key }),
    }); // .then(response => response.json()).then(data => console.log(data));
  } else {
    let newLikes = {};
    Object.keys(likes).map(newItem => {
      if (likes[newItem].key !== item.key) {
        newLikes[newItem] = likes[newItem];
      }
    });
    setLikes(newLikes);
    fetch(process.env.REACT_APP_BACKEND_URL + '/post/like', {
      ...headerOptions('DELETE'),
      ...bodyData({ post_key: item.key }),
    }); // .then(response => response.json()).then(data => console.log(data));
  }
};

export {
  FetchVerifyUser,
  FetchResetPassword,
  FetchChangePassword,
  FetchSignUp,
  FetchVerifyEmail,
  FetchGetMyUser,
  FetchGetOneUser,
  FetchLogin,
  FetchDeleteRequest,
  FetchGetRequest,
  FetchLogout,
  FetchDeleteReservation,
  FetchGetRequestByRequestId,
  FetchReservation,
  FetchGetPost,
  FetchReservationByPostKey,
  FetchDeletePost,
  FetchImage,
  FetchReservationPost,
  FetchConnectRequestPost,
  FetchChangeEmail,
  FetchChangePhone,
  FetchUploadPost,
  FetchEditPost,
  FetchConverURLtoFile,
  toggleLikes,
};
