<<<<<<< HEAD
import {GoogleLogin} from '@react-oauth/google';
import {FetchLogin} from '../FetchList';
=======
import { GoogleLogin } from '@react-oauth/google';
import { FetchLogin } from '../FetchList';
import { useUserInfoStore } from "../../store/UserInfoStore.js";
>>>>>>> 85a8b5b0b66c08bd667200124e1ff887cf1efb94

function decodeJwtResponse(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
export function GoogleButton() {
<<<<<<< HEAD
=======
  const { setUserInfo } = useUserInfoStore();

>>>>>>> 85a8b5b0b66c08bd667200124e1ff887cf1efb94
  return (
    <>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse.credential);
          const decodeding = decodeJwtResponse(credentialResponse.credential);
<<<<<<< HEAD
          const email = decodeding.email;
          FetchLogin({id: email, password: 'googleLogin!2#1'});
=======
          const email = decodeding.email
          FetchLogin({ id: email, password: 'googleLogin!2#1', setUserInfo })
>>>>>>> 85a8b5b0b66c08bd667200124e1ff887cf1efb94
          // if (GetOneUser(email)) {
          //   FetchLogin({ id: email, password: 'googleLogin!2#1' })
          // } else {
          //   /*
          //   구글 정보 가져올 부분
          //   username=name, email=email, userId=email, verifyemail=true, passworrd: googlelogin
          //   추가 입력되어야함
          //   school, student_id, phone, gender, birth
          //   */
          //   console.log('회원가입으로 넘어가기 구현안됨')
          // }
        }}
        onError={() => {
          console.log('Login Failed');
        }}
        useOneTap
      />
    </>

  );
}

